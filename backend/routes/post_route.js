const exp=require('express');
const { protect } = require('../middleware/authmiddleware');
const router=exp.Router()

let PostDb=require('../schema_model/post_schema');
let RegisterDb=require('../schema_model/register_schema')

router.post('/add',protect,async(req,res)=>
{
    try
    {    console.log("Poste mai",req.userAuth);
         console.log("POST replyTo",req.body.replyTo);

        var content=req.body.content
        const postedBy=req.userAuth
        var replyDataId;
        
        if(req.body.replyTo)
        {
            console.log("hi");
            replyDataId=req.body.replyTo;
            console.log("ReplyData",replyDataId);
        }
        // const postUser=new PostDb({content:"haha", replyDataId:"yoo"})
        const postUser=await PostDb.create({content, postedBy ,replyDataId});
        console.log("Yo1",postUser);  
       
        try{
            res.status(201).json(postUser)
        }
       
        catch(err)
        {
            res.status(401).json("All err "+err)
        } 
        // postUser.save()
        // .then(res.status(201).json("send success"))
        // .catch(err=>res.status(401).json("POST ka Error is "+err)) 

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
        const data=await PostDb.find({}).populate('postedBy','Name username email').populate('originalPostedBy','Name username email').populate('retweetDataId').populate('replyDataId').sort({"createdAt":-1})
        // console.log("DATA",data);
        // const data
        const data1=await RegisterDb.populate(data,{path:'retweetDataId.postedBy'})
        // console.log("\n\nALLPOST\n\n",data1);
        const data2=await RegisterDb.populate(data1,{path:'replyDataId.postedBy'})
        try{
            res.status(200).json(data2)
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


//GET post via user id...postedBy
router.get("/postedBy/:id",async(req,res)=>
{

    try 
    {
        var username=req.params.id ;// Tihs is sctually username
        console.log("USERNAME", username);
        
        const getUser= await RegisterDb.findOne({username:username})
        console.log("GETUser",getUser,getUser._id);

        //After getting username's Id, we search by that Id in POst db..
        const postDetail=await PostDb.find({postedBy:getUser._id}).populate('postedBy','Name username email').populate('originalPostedBy','Name username email').populate('retweetDataId').populate('replyDataId').sort({"createdAt":-1})
        
        const data1=await RegisterDb.populate(postDetail,{path:'retweetDataId.postedBy'})
        const data2=await RegisterDb.populate(data1,{path:'replyDataId.postedBy'})
       
        try{
            res.status(200).json(data2)
        }
        
        catch(err)
        {
            res.status(401).json("All err "+err)
        } 
    }
    catch(err)
    {
        console.log("Error hai"+err);
        res.status(401).send("Invalid Details");//...as data already send to client
    }

        
})

//Get all posts liked by a user
router.get("/postedBy/likes/:id",async(req,res)=>
{

    try 
    {
        var username=req.params.id ;// Tihs is sctually username
        console.log("USERNAME", username);
        
        const getUser= await RegisterDb.findOne({username:username}).populate('likes')
       
        const data0=await RegisterDb.populate(getUser,{path:'likes.postedBy'})
        console.log("Likes GETUser",data0);

        //After getting username's Id, we search by that Id in POst db..
        // const postDetail=await PostDb.find({postedBy:getUser._id}).populate('postedBy','Name username email').populate('originalPostedBy','Name username email').populate('retweetDataId').populate('replyDataId').sort({"createdAt":-1})
        
        const data1=await RegisterDb.populate(data0.likes,{path:'retweetDataId'})
                console.log("\n\n1.Likes GETUser",data1);

        const data2=await RegisterDb.populate(data1,{path:'replyDataId'})
        console.log("2.Likes GETUser",data2);

        try{
            res.status(200).json(data2)
        }
        
        catch(err)
        {
            res.status(401).json("All err "+err)
        } 
    }
    catch(err)
    {
        console.log("Error hai"+err);
        res.status(401).send("Invalid Details");//...as data already send to client
    }

        
})



//GET post via post id
router.get("/:id",async(req,res)=>
{
    try 
    {
        var postid=req.params.id ;
        console.log("GET",RegisterDb,PostDb);

        // const postDetail1=await PostDb.populate('postedBy','Name username email').populate('retweetDataId')
        // //.populate('retweetDataId')
        // console.log("PD1",(postDetail1));

        // const postDetail=await RegisterDb.populate(postDetail1,{path:'retweetDataId'})
        // console.log("\n RPD",postDetail);

        const postDetail=await PostDb.findById(postid).populate('postedBy','Name username email').populate('originalPostedBy','Name username email').populate('retweetDataId').sort({"createdAt":-1})
        
        // console.log("PD1",postDetail);
        // const full_postDetail=await RegisterDb.populate(postDetail,{path:'retweetDataId'})

        const full_postDetail=await RegisterDb.populate(postDetail,{path:'retweetDataId.postedBy'})
        // console.log("FD2",full_postDetail,"\nPD2",postDetail);
        // const full_postDetail=await PostDb.populate('624fed7e8cd38accdafd0826')        
        try{
            res.status(200).json(full_postDetail)
        }
       
        catch(err)
        {
            res.status(401).json("All err "+err)
        } 
    }
    catch(err)
    {
        console.log("Error hai"+err);
        res.status(401).send("Invalid Details");//...as data already send to client
    }
})





//Get Replies
router.get("/reply/:id",async(req,res)=>
{
    try 
    {
        var postid=req.params.id ;

        const replies=await PostDb.find({replyDataId:postid}).populate('postedBy','Name username email').populate('replyDataId');
        console.log(Object.keys(replies).length);

        // for (const item in replies) {
        //     console.log("HRERE- ",replies[item])
        //   }

        try{
            res.status(200).json(replies)
        }
       
        catch(err)
        {
            res.status(401).json("All err "+err)
        } 
    }
    catch(err)
    {
        console.log("Error hai"+err);
        res.status(401).send("Invalid Details");//...as data already send to client
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



//RETWEET 
router.post("/:id/retweet",protect,async(req,res)=>
{
    console.log("in retweet");
    try 
    {
        var postid=req.params.id || req.body.postid;        
        var userid=req.userAuth._id;//ERR if user not logged in and this route is accessed, err is thrown

        //Delete the post and see. If deleted then retweet existed so unretweet it. If not exist, add the retweet.
        const deletedPost=await PostDb.findOneAndDelete({postedBy:userid, retweetDataId: postid})
        .catch(err=>res.status(401).json("Delete RETWEET ka Error is "+err)) 

        // var isLiked=req.userAuth.likes && req.userAuth.likes.includes(postid);

        var option= deletedPost!=null ? "$pull" : "$addToSet" ;
        console.log("RETWEET -deletedPost",deletedPost);

        //Create a new post. Retweet is the data via PostId
        var repost=deletedPost;
        if(deletedPost==null)
        {
            var data=await PostDb.findById(postid).populate('postedBy','Name username email');
            
            // console.log("RETWEET-CONTENT",data,"\nData POSTEDBY ",data.originalPostedBy,data.originalPostedBy!=undefined);
            
            var finalPostedBy = data.originalPostedBy!=undefined? data.originalPostedBy._id : data.postedBy._id
            
            // console.log("\n\nFINAL-POSTED",finalPostedBy);
            
            repost=await PostDb.create({postedBy: userid, retweetDataId: postid, retweetContent:data.content, originalPostedBy:finalPostedBy})
            // .then(console.log("REPOST",x))
            .catch(err=>res.status(401).json("Retweet Error is "+err))
        }

        console.log("REPOST",deletedPost);
        // res.status(200).send("Retweet"+option+repost);
        // return


        //Insert retweet in Register db
        const updatedUser=await RegisterDb.findByIdAndUpdate(userid,{ [option]:{retweets : repost._id} },{new:true})
        // .then(res.status(201).json("Success put "+ isLiked))
        .catch(err=>res.status(401).json("Retweet UserUpdate Error is "+err)) 

        //Insert retweet in Post db
        

        const updatedPost=await PostDb.findByIdAndUpdate(postid,{ [option]:{ retweetUserList : userid} },{new:true})
        // .then(res.status(201).json("Success put "+ isLiked))
        .catch(err=>res.status(401).json("Retweet Post Update Error is "+err)) 

        // console.log("LIKE ",isLiked , req.userAuth.likes ,req.userAuth.likes.includes(postid), option);
        console.log("Retweet-UpdatedUser",updatedUser);
        console.log("Retweet-UpdatedPost",updatedPost);

        res.status(200).json(updatedPost);
        // else
        // res.status(200).send("Retweet"+option+repost);

    }
    catch(err)
    {
        console.log("Error hai Retweet",err);
        // res.status(401).send("Invalid Details");...as data already send to client
    }
})



module.exports=router;