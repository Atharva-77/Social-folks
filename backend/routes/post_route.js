const exp=require('express');
const { protect } = require('../middleware/authmiddleware');
const router=exp.Router()

let PostDb=require('../schema_model/post_schema');

router.post('/add',protect,(req,res)=>
{
    try
    {
        const content=req.body.content
        const postUser=new PostDb({content})
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
        res.status(401).json("Invalid Details",err)
    }
})

module.exports=router;