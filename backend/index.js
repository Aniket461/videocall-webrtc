const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const cors = require('cors')
const User = require('./models/userModel');

app.use(cors());
app.use(express.json());

const uri = process.env.MONGOURL;

const dbConnection = ()=>{
    try {
        // Connect to the MongoDB cluster
        mongoose.connect(uri).then(
            console.log("DataBAse Connected")
        );
      } catch (e) {
        console.log("could not connect");
      }
    
}

dbConnection();

app.get('/',async (req,res)=>{

    const user = new User(
        {
            name:"Aniket",
            email : "surve@gmail.com",
            password: "Aniket@123"
        }
    );
    const a = await user.save();
    console.log(a);
    res.send({"message":a})
})

app.get('/test',(req,res)=>{
    res.send({"message":"Helloo"});
})

app.post('/register',async (req,res)=>{

    const {name,email,password} = req.body;
    const user = new User(
        {
            name:name,
            email : email,
            password: password
        }
    );

    console.log(req.body);
    user.save().then((u)=>{
        res.send({"message":"User Successfull created"});
    }).catch((e)=>{
        res.send({"error":e});
    })
})

app.get('/getusers',async (req,res)=>{
    const users = await User.find({});
    if(users.length > 0){
        
        res.send(users);
    }
    else{
        res.send([]);
    }
})

app.post('/login',async (req,res)=>{
    const {email,password} = req.body;
    
    const user = await User.find({email:email,password:password});
    if(user.length >0){

        res.send(user[0]);
    }
    else{
        res.send({"error":"No user found"});
    }

    // const user = new User({name:'',email:'',password:''});
    // console.log(await user.find({email:email}));

})

const port =  process.env.PORT ||3000 
const server = app.listen( port,()=>{
    console.log(`The backend is running on port ${port}`);
})


server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;