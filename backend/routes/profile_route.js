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


module.exports=router;