const mongoose=require('mongoose')

const PostSchema=new mongoose.Schema({

    content:
    {
        type:String
    },

    postedBy:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Register'
    },

    Replies:
    {
        type:Array
    },
    pinned:
    {
        type:Boolean
    }


 },
    {
        timestamps:true
    }
)

module.exports=mongoose.model('Post',PostSchema);