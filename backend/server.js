const express = require('express');
const dotenv = require("dotenv");
const connectDB = require('./config/db');
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const cors = require("cors");
const Message = require('./models/messageModel');
const Chat = require('./models/chatModel');

dotenv.config({ path: '../.env' });
const app = express();

app.use(cors()); 
app.use(express.json());
app.use(express.text());

// ✅ Handle Preflight Requests
app.options('*', cors()); 

app.get("/", (req, res) => {
    res.send("API is running...");
}); 

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes)

console.log('process.env.MongoDB_Url', process.env.MongoDB_Url);

connectDB();

const server = app.listen(5001 , console.log("  app is lisiting at port 5001 "));

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});

const usersMap = new Map();

io.on('connection', (socket)=> {
  
  console.log("User connected:", socket.id);

  socket.on('setUp', (userId) => {
       console.log(" inside setup", )
       usersMap.set(userId, socket.id);
       console.log("usersMap as array:", Array.from(usersMap.entries()));
  });

  socket.on('sendMessage', async ({senderId , receiverId, message}) => {
       console.log('senderId , ReceiverId, message', senderId , receiverId, message);
        console.log("usersMap as array:", Array.from(usersMap.entries()));
       const receiverSocket = usersMap.get(receiverId);
       if (receiverSocket) {
          console.log(" inside if receiverSocket", receiverSocket);
          io.to(receiverSocket).emit("receive_message", message);
       }
  })




  // socket.on('receivedMessage', () => {
      
  // });

  socket.off("setup", () => {
      console.log("USER DISCONNECTED");
      socket.leave(userData._id);
  });
})


