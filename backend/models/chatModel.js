const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
       chatName : { type : String, require : true},
       isGroupChat : { type : Boolean, require : true },
       users : [{type: mongoose.Schema.Types.ObjectId , ref : 'User' }],
       latestmessage : { type: mongoose.Schema.Types.ObjectId , ref : 'Message' },
       isGroupAdmin : { type: mongoose.Schema.Types.ObjectId , ref : 'User' } 
})

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
