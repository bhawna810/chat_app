const Chat = require("../models/chatModel");
// const Chat = require("../models/chatModel");

const storeChat = async(res, req) => {
   const {senderId , receiverId, message} = res.body ;

   const chatInMongo = await new Chat({
   
       isGroupChat : { type : Boolean, require : true },
       users : [{type: mongoose.Schema.Types.ObjectId , ref : 'User' }],
       latestmessage : { type: mongoose.Schema.Types.ObjectId , ref : 'Message' },
       isGroupAdmin : { type: mongoose.Schema.Types.ObjectId , ref : 'Us'},

             chatname: {},
             isGroupChat : { type : Boolean, require : true },
             users : [{senderId, receiverId}],
             latestmessage : {},
             isGroupAdmin : {}
         })
        .save()
}

module.exports = {storeChat}