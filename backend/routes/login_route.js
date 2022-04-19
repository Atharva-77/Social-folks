const exp=require('express');
const router=exp.Router();

const generateToken=require('../generateToken');
const { protect } = require('../middleware/authmiddleware');

let RegisterDb=require('../schema_model/register_schema')

router.post('/add',async(req,res)=>
{
    try
    {
        const email=req.body.email;
        const password=req.body.password;

        const userDetails=await RegisterDb.find({email:email})
        console.log("Login re",userDetails,userDetails.length,typeof(userDetails),userDetails==undefined);
        // res.send({userDetails})
        
        if(userDetails.length>0)
        {
            // console.log("1ST ",email,userDetails[0].email, "PASS", password,userDetails[0].password,userDetails.length);
            if (email===userDetails[0].email && password==userDetails[0].password)
            {
                res.send
                (
                    {
                        id:userDetails[0]._id,
                        name:userDetails[0].Name,
                        email:email,
                        isAdmin:userDetails[0].isAdmin,
                        token:generateToken(userDetails[0]._id)                      
                    }
                )
            }

            else    
                 res.send("Fail. Email or password not matching")


        }
        else
            res.send("Fail.No user")


    }
    catch(err)
    {
        console.log("ERR",err);
        res.status(400).send("Invalid details")
    }
})


router.get('/profile',protect,(req,res)=>
{
    console.log("Profile mai",req.userAuth,"\nHI",hi);

    res.status(201).json(req.userAuth)
})

module.exports=router;
