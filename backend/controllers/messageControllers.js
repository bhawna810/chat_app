const Message = require("../models/messageModel");

const storeMessage = async(res, req) => {
   const {senderId , receiverId, message} = res.body ;

   const meesageInMongo = await new Message({
             sender : senderId,
             content : message,
             chatid : '',
             readBy : receiverId
         })
        .save()
}

module.exports = {storeMessage}