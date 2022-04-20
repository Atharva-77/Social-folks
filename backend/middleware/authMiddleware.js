const jwt=require('jsonwebtoken')
let RegisterDb=require('../schema_model/register_schema')

const protect = async(req,res,next)=> {

    //.authorization is key. U can have any key like abc. So it will be req.headers.abc.
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        console.log("Auth-Middleware",req.headers.authorization); // Bearer and full token printed
        try
        {
            let token = req.headers.authorization.split(" ")[1];
            const decode=jwt.verify(token,process.env.JWT_SECRET_TOKEN)

            console.log("DECODE",decode);

            //instead of req.userAuth, we can use any variable too. await RegisterDb command gives output as object.
            //See below, hi is given as var name
            req.userAuth=await RegisterDb.findById(decode.id).select('-password')

            hi=await RegisterDb.findById(decode.id)

            console.log("Auth REQ.USER HI ",req.userAuth,hi);
        }

        catch(err)
        {
            console.log("AuthMiddleware ERR ");
            res.status(401).send("Fail. No token")
        }
    }
        
    else
    {
        res.status(401).send("Fail.NOt auth")
        // throw new Error("NOt auth re baba")
        // console.log("Not found");
    }

    next();
}

module.exports={protect}