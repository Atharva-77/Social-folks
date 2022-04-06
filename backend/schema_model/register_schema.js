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
},
    {
        timestamps:true
    }
)

module.exports=mongoose.model('Register',RegisterSchema);
