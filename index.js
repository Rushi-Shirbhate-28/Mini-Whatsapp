const express = require("express");
const mongoose = require('mongoose');
const app = express();
const Chat = require("./models/chat.js");
const path = require("path");
const methodOverride = require('method-override');

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride('_method'));

main()
.then(()=>{
    console.log("Connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/WhatsappV3');
}

//Index route
app.get("/chats",async (req,res)=>{
    let chats = await Chat.find();
    console.log(chats);
    res.render("index.ejs",{chats});
});

//New route
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
});

//Create route
app.post("/chats",(req,res)=>{
    let { from ,to , msg} = req.body;

    let newChat = new Chat({
        from : from,
        msg : msg,
        to : to,
        created_at : new Date()
    });

    newChat.save()
    .then((res)=>{
        console.log("Chat was saved");
    })
    .catch((err)=>{
        console.log(res);
    });

    res.redirect("/chats");
});

//Edit route
app.get("/chats/:id/edit",async(req,res)=>{
    let { id } =req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs",{ chat });
});

//Update route
app.put("/chats/:id",async(req,res)=>{
    let { msg : newMsg } = req.body;
    let { id } = req.params;

    let updatedChat = await Chat.findByIdAndUpdate(
        id, 
        {msg : newMsg},
        {runValidators : true , new : true}
    );

    console.log(updatedChat);
    res.redirect("/chats");
});

//Destroy route
app.delete("/chats/:id",async(req,res)=>{
    let { id } = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
});

app.listen(8080,()=>{
    console.log("App is listening on port 8080");
});

