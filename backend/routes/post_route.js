const exp=require('express');
const { protect } = require('../middleware/authmiddleware');
const router=exp.Router()

let PostDb=require('../schema_model/post_schema');
let RegisterDb=require('../schema_model/register_schema')

router.post('/add',protect,(req,res)=>
{
    try
    {    console.log("Poste mai",req.userAuth);

        const content=req.body.content
        const postedBy=req.userAuth

        const postUser=new PostDb({content, postedBy})
        console.log(req.body);  
        // res.status(401).json("SUCCESs POST")
        postUser.save()
        .then(res.status(201).json("send success"))
        .catch(err=>res.status(401).json("POST ka Error is "+err)) 

       //OR
       
       //    PostDb.create(postUser)
      //    .then(res.status(20).json(postUser))
      //    .catch(err=>res.status(401).json("POST ka Error is "+err))
    
    }
    catch(err)
    {
        console.log("Error hai",err);
        // res.status(401).json("Invalid Details",err)
    }
})

router.get('/allpost',async(req,res)=>
{
    try
    {   
        // console.log("All Poste mai",req.userAuth);
        const data=await PostDb.find({}).populate('postedBy','Name username email').sort({"createdAt":-1})
        try{
            res.status(200).json(data)
        }
       
        catch(err)
        {
            res.status(401).json("All err "+err)
        } 
    
    }
    catch(err)
    {
        console.log("Error hai");
        // res.status(401).json("Invalid Details",err)
    }
})


router.put("/:id/like",protect,async(req,res)=>
{
    try 
    {
        var postid=req.params.id || req.body.postid;
        console.log("PUT",postid);

        var userid=req.userAuth._id;//ERR if user not logged in and this route is accessed, err is thrown
        
        // console.log("LIKEPost, user ",req.body.postid);

        var isLiked=req.userAuth.likes && req.userAuth.likes.includes(postid);

        var option= isLiked ? "$pull" : "$addToSet" ;
        
        //Insert like in Register db
        const updatedUser=await RegisterDb.findByIdAndUpdate(userid,{ [option]:{likes:postid} },{new:true})
        // .then(res.status(201).json("Success put "+ isLiked))
        .catch(err=>res.status(401).json("POST ka Error is "+err)) 

        //Insert like in Post db
        const updatedPost=await PostDb.findByIdAndUpdate(postid,{ [option]:{likes:userid} },{new:true})
        // .then(res.status(201).json("Success put "+ isLiked))
        .catch(err=>res.status(401).json("POST ka Error is "+err)) 

        console.log("LIKE ",isLiked , req.userAuth.likes ,req.userAuth.likes.includes(postid), option);
        console.log("UpdatedUser",updatedUser);
        console.log("UpdatedPost",updatedPost);

        res.status(200).json(updatedPost);
        // res.status(200).json("SUCCESS");

    }
    catch(err)
    {
        console.log("Error hai");
        // res.status(401).send("Invalid Details");...as data already send to client
    }
})

module.exports=router;