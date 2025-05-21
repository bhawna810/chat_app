const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
       sender :  { type: mongoose.Schema.Types.ObjectId , ref : 'User' },
       content : {type : String, require : true },
       chat : { type: mongoose.Schema.Types.ObjectId , ref : 'Chat' },
       readBy : { type: mongoose.Schema.Types.ObjectId , ref : 'User' }
})

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
