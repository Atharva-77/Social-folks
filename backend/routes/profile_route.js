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

        const updateFollowList=await RegisterDb.findByIdAndUpdate(profileUserId, { [option] : {following : userToFollowid}}, {new:true} ).catch(err=>res.status(401).json("POST ka Error is "+err)) 
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

module.exports=router;