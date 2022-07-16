const exp=require('express');
const { protect } = require('../middleware/authmiddleware');
const router=exp.Router()

let PostDb=require('../schema_model/post_schema');
let RegisterDb=require('../schema_model/register_schema')

router.post('/:username',async(req,res)=>
{
    try
    {    
       

        var username=req.params.username || req.body.username
        
        console.log("PROFILE Route ",username,req.params.username);

        const getUser= await RegisterDb.findOne({username:username})
        // console.log("\n\nPROF DB",getUser);
        
        if(getUser!=null)
            res.status(201).json(getUser)
       
        else
            res.status(201).json("NO SUCH USER")
       
       
    
    }
    catch(err)
    {
        console.log("Error hai",err);
        // res.status(401).json("Invalid Details",err)
    }
})

//Follow / unfollow user. Update followers, following list
router.put('/followRoute/:username',async(req,res)=>
{
    try
    {    
       
        var username=req.params.username || req.body.username
        
        console.log("PROFILE Route ",username,req.params.username);

        const getUser= await RegisterDb.findOne({username:username})
        console.log("\n\nPROF DB",username,getUser._id);

        var profileUserId=getUser._id;
        var userToFollowid=req.body.userFollowId;//sent by frontend

        var isfollow=getUser.following && getUser.following.includes(userToFollowid);
        var option= isfollow ? "$pull" : "$addToSet";

        console.log("\n\nPROF DB",getUser._id, isfollow, option);

        //Update your following list
        const updateFollowList=await RegisterDb.findByIdAndUpdate(profileUserId, { [option] : {following : userToFollowid}}, {new:true} ).catch(err=>res.status(401).json("POST ka Error is "+err)) 
        
        //Update others followers list
        const updateFollowiingList=await RegisterDb.findByIdAndUpdate(userToFollowid, { [option] : {followers : profileUserId}}, {new:true} ).catch(err=>res.status(401).json("POST ka Error is "+err)) 
        
        // console.log("FOLLOW LIST",updateFollowList);
        
        // if(getUser!=null)
            res.status(201).json(updateFollowiingList)
       
        // else
            // res.status(201).json("NO SUCH USER")
       
       
    
    }
    catch(err)
    {
        console.log("Error hai",err);
        // res.status(401).json("Invalid Details",err)
    }
})


// All followers of a user
router.get('/allFollowers/:username',async(req,res)=>
{
    try
    {    
       

        var username=req.params.username || req.body.username
        
        console.log("PROFILE Route ",username,req.params.username);

        const getUser= await RegisterDb.findOne({username:username}).populate('followers','-password -followers -following').populate('following','-password -followers -following').select('-password -likes -retweets')
       
        const allDetails=getUser
       
        if(getUser!=null)
            res.status(201).json(allDetails)
       
        else
            res.status(201).json("NO SUCH USER")
       
       
    
    }
    catch(err)
    {
        console.log("Error hai",err);
        res.status(400).send("Invalid Details"+err)
    }
})



//Edit User. Change description.
router.post('/editUserDescp/:username', protect,async (req, res) => {
    try {


        var username = req.params.username || req.body.username
        var description = req.body.description

        // console.log("PROFILE Route ", username, req.params.username);

        const getUser = await RegisterDb.findOne({ username: username })
       
        getUser.description=description.trim()
       
        const updateUser = await getUser.save();  
        // console.log("\n\nPROF DB",getUser);

        // if (getUser != null)
            res.status(201).json(getUser)

        // else
        //     res.status(201).json("NO SUCH USER")



    }
    catch (err) {
        console.log("Error hai", err);
        // res.status(401).json("Invalid Details",err)
    }
})


module.exports=router;