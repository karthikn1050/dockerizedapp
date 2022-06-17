const express = require('express');
const app = express();
const mongoose = require('mongoose');
const socket = require("socket.io");
const messageRoutes = require('./routes/msgRoutes')
const ip = require('ip')
const Messages = require("./models/MessageModel");
const { Kafka, logLevel, CompressionTypes, Partitioners } = require('kafkajs')
const cors = require("cors");
const methodOverride = require('method-override') 
app.use(express.json());
const host = process.env.HOST_IP || ip.address()
app.use(cors());
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
mongoose.connect('mongodb://localhost:27017/', {
    dbName: 'twitter',
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => err ? console.log(err) : 
    console.log('Connected to Mongo database'));

// Schema for users of app
const UserSchema = new mongoose.Schema({
    displayName: String,
    username:String,
    text: String,
    image:String,
    like:String,
    video:String  
});
const User = mongoose.model('users', UserSchema);
User.createIndexes();

app.get("/", (req, resp) => {

    resp.send("App is Working");
 
});
app.use("/api/messages", messageRoutes);
const kafka = new Kafka({
    logLevel: logLevel.INFO,
    brokers: [`${process.env.KAFKA}`],
    clientId: 'example-consumer',
  })
  
  const topic = 'topic-test'
const consumer = kafka.consumer({ groupId: 'test-group' })
const run = async () => {
    await consumer.connect()
    await consumer.subscribe({ topic, fromBeginning: true })
    await consumer.run({
      // eachBatch: async ({ batch }) => {
      //   console.log(batch)
      // },
      eachMessage: async ({ topic, partition, message}) => {
        //const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
       const arr =await JSON.parse(message.value)
       console.log(arr.displayName)
  
   
    
    const stud = await new User({
    
      displayName:arr.displayName,
      username:arr.username,
      text: arr.text,
      image:arr.image,
      like:0,
      video:arr.video
  } 
  
  );
       await stud.save().then(() => {console.log("One entry added")
       console.log("One entry added")
    })
    
        console.log(`${message.value}`,JSON.parse(message.value))
      //console.dir(message)
      },
    })
  }
  
  run().catch(e => console.error(`[example/consumer] ${e.message}`, e))
  
  const errorTypes = ['unhandledRejection', 'uncaughtException']
  const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2']
  
  errorTypes.forEach(type => {
    process.on(type, async e => {
      try {
        console.log(`process.on ${type}`)
        console.error(e)
        await consumer.disconnect()
        process.exit(0)
      } catch (_) {
        process.exit(1)
      }
    })
  })
  
  signalTraps.forEach(type => {
    process.once(type, async () => {
      try {
        await consumer.disconnect()
      } finally {
        process.kill(process.pid, type)
      }
    })
  })
  const kafkaP = new Kafka({
      logLevel: logLevel.DEBUG,
      brokers: [`${process.env.KAFKA}`],
      clientId: 'example-producer',
    })
    
   // const topic = 'topic-test'
    const producer = kafkaP.producer({
        maxInFlightRequests:1,
        idempotent: true,
        allowAutoTopicCreation:true
    })
    app.post("/postmessage",(req,res) =>{
        try {
          const sendMessage =  async() => { 
              await producer
                .send({
                  topic,
                  compression: CompressionTypes.GZIP,
                  messages: [
                    { value:JSON.stringify(
                      {displayName: req.body.displayName,
                        username:req.body.username,
                        text: req.body.text,
                        image:req.body.image,
                        like:0,
                        video:req.body.video
                    
                    }),key:"data" }
                  ],
                  acks:-1,
                })
                .then(console.log)
                .catch(e => console.error(`[example/producer] ${e.message}`, e))
              
           
            } 
            const run = async () => {
              await producer.connect()
                 sendMessage()
            }
            run().then(res.send("Message Sent")).catch(e => console.error(`[example/producer] ${e.message}`, e))
        
        } catch (error) {
            console.log(error)
        }
    })
    app.get("/get",(req,res) =>{
        User.find({}, (err, found) => {
            if (!err) {
                res.send(found);
            } else {
                console.log(err);
                res.send("Some error occured!")
            } 
        });
    })
    app.delete('/delete/:id', function(req, res){
    
        User.deleteOne({_id: req.params.id},  function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                console.log("Updated Docs : ", docs);
                res.send("Successfull")
            }
        });
       
     });
     app.put('/update/:id',function(req,res){
       
        let orderId = mongoose.Types.ObjectId(req.params.id)
        let like = req.body.like
        console.log(like,"...like",orderId,"...object")
        User.updateOne({_id:orderId}, 
            {like:like}, function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                console.log("Updated Docs : ", docs);
            }
        });
     })

     const server = app.listen(5000,()=>{
        console.log("Tweets Server Started")
    })
     const io = socket(server, {
        cors: {
          origin: "http://localhost:3000",
          credentials: true,
        },
       });
       const kafkaC = new Kafka({
         logLevel: logLevel.INFO,
         brokers: [`${process.env.KAFKA}`],
         clientId: 'examples-consumer',
       })
       
       const consumers = kafkaC.consumer({ groupId: 'chat-group' })
       
       global.onlineUsers = new Map();
       io.on("connection", (socket) => {
         global.chatSocket = socket;
         socket.on("add-user", (userId) => {
           global.onlineUsers.set(userId, socket.id);
         });
       
         socket.on("send-msg", (data) => {
           console.log("socketdata",data.to)
           const sendUserSocket = global.onlineUsers.get(data.to);
           if (sendUserSocket) {
             socket.to(sendUserSocket).emit("msg-recieve", data.msg);
           }
         });
  
       
       });
       
       
       
       
       let topics =["chat"]
       const runs = async () => {
       
         await consumers.subscribe({ topics, fromBeginning: true })
         await consumers.run({
       
           eachMessage: async ({ topic, partition, message}) => {
             //const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
            const arr =await JSON.parse(message.value)
       
       
             const stud = await new Messages(
             {message: { text: arr.message.text },
             users: [arr.users[0], arr.users[1]],
             sender: arr.sender,
           }
         );
             
            await stud.save().then(() => {console.log("One entry added")
          
         })
           //console.dir
         },
         })
       
       
       
       
       }
       
       runs().catch(e => console.error(`[example/consumer] ${e.message}`, e))

