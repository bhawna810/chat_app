const Message = require("../models/messageModel");
const Chat = require("../models/chatModel");

const storeMessage = async(req, res) => {
   const {senderId , receiverId,chatId , message} = req.body ;

   console.log("senderId , receiverId,chatId , message", senderId , receiverId,chatId , message);

   if(!senderId || !receiverId || !message){
       return res.status(404).send('input missing');
   }

   const meesageInMongo = await new Message({
             sender : senderId,
             content : message,
             chat : chatId,
             readBy : receiverId
         })
        .save()
        // .then(data => data.JSON())
        .then(async (data) => {
            
            console.log(data);

            await Chat.findOneAndUpdate(
              { _id: chatId }, // or req.user.email if you're using auth
              { latestmessage : data._id}
            );

            return res.status(200).send(data);
        })

}

module.exports = {storeMessage}