const Chat = require("../models/chatModel");
// const Chat = require("../models/chatModel");

const storeChat = async(req, res) => {
   
    const {chatName , isGroupChat , users , isGroupAdmin} = req.body ;

    console.log("inside store chat", chatName , isGroupChat , users , isGroupAdmin);

   if(!users || !users[0]){
       return res.status(401).send('no sender or receiver');
   }

    const chatPresent = await Chat.findOne({
        isGroupChat: false,
        users: { $all: users }  // users is an array of ObjectIds
     });


   if(chatPresent){
     return res.send(chatPresent);
   }

     await new Chat({
             chatName: chatName,
             isGroupChat :isGroupChat,
             users : users,
             isGroupAdmin : isGroupAdmin
         })
        .save()
        .then( async(data) => {
              console.log("data inside storechat then method", data)
             return res.status(200).send(data);
        })
    
}

module.exports = {storeChat}