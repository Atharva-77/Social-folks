const mongoose=require('mongoose')

const PostSchema=new mongoose.Schema({

    content:
    {
        type:String
    },
    content_BeforeEdit:
    {
        type: String
    },

    postedBy:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Register'
    },
    originalPostedBy:
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
    },
    
    //like a tweet
    likes:
    [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Register'
    }],

    //list of retweet users
    retweetUserList:
    [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Register'
    }],

    retweetDataId:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    },
    retweetContent:
    {
        type:String
    },
    retweetContent_BeforeEdit:
    {
        type: String
    },
    //Parent post Id to whom reply is given
    replyDataId:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
        // ,
        // required:true,
    },
    totalReplies:
    {
        type:String,
    }


 },
    {
        timestamps:true
    }
)

module.exports=mongoose.model('Post',PostSchema);