const mongoose=require('mongoose')

const RegisterSchema = new mongoose.Schema({
    Name:
    {
        type:String,
        required:true
    },
    email:
    {
        type:String,
        required:true,
        unique: true
    },
    username:
    {
        type:String,
        // required:true,
        unique: true
    },
    password:
    {
        type: String,
        required: true,
        // minlength: 5
    },
    
    isAdmin:
    {
        type: Boolean,
        default:false
    },

   
    //For profile pg
    likes:
    [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }]
    ,
    retweets:
    [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }]
    ,
    followers:
    [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Register'
    }],
    following:
    [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Register'
    }],

    description:
    {
        type: String,
    },

},
    {
        timestamps:true
    }
)

module.exports=mongoose.model('Register',RegisterSchema);
