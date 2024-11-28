const mongoose = require('mongoose');
const Chat = require("./models/chat.js");

main()
.then(()=>{
    console.log("Connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/WhatsappV3');
};

let allChats = [{
    from : "Neha",
    to : "Priya",
    msg : "Send me your exam sheets",
    created_at : new Date()
},
{
    from : "Ganesh",
    to : "Ramesh",
    msg : "Hello Bhai, Kaisa hai tu?",
    created_at : new Date()
},
{
    from : "Ram",
    to : "Sita",
    msg : "I'll there in a moment",
    created_at : new Date()
},
{
    from : "Rita",
    to : "farah",
    msg : "I'll call you later",
    created_at : new Date()
},
{
    from : "Suresh",
    to : "Gita",
    msg : "Let's crack it today",
    created_at : new Date()
},
{
    from : "Kiran",
    to : "Ashish",
    msg : "Where are you bro?",
    created_at : new Date()
},
{
    from : "Pawan",
    to : "Harish",
    msg : "Plz come to my home",
    created_at : new Date()
},
{
    from : "aditya",
    to : "atharv",
    msg : "hello, Aditya this side",
    created_at : new Date()
},
{
    from : "Disha",
    to : "Rushi",
    msg : "Plz help me to do assignment",
    created_at : new Date()
},
{
    from : "Ojas",
    to : "Yamini",
    msg : "Plz bring laptop today",
    created_at : new Date()
},
{
    from : "Harsh",
    to : "Aayush",
    msg : "tell me your seat number",
    created_at : new Date()
}

];

Chat.insertMany(allChats);