const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const crypto = require('crypto');

const mysql = require("mysql2");

const con = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "",
    database: "chat_node"

});

app.use(express.static("chat_system"));

app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/chat_system/index.html");
});

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/chat_system/authentication/login/login.html");
});

app.get("/register", (req, res) => {
    res.sendFile(__dirname + "/chat_system/authentication/register/register.html");
});

app.get("/friendList", (req,res) =>{
    res.sendFile(__dirname + "/chat_system/conversation.html");
});

app.get("/chat", (req,res) =>{
    res.sendFile(__dirname + "/chat_system/chat.html");
});

app.get("/friendList/:id", (req, res) => {
    let id = req.params.id;

    con.query(friendList(), [id], (err, result) => { if (!err) { return res.status(200).json(result); } return res.status(500).json({ message: "Server Error" }); });
});

app.get("/chat/:sender/:reciever", (req, res) => {
    let sender = req.params.sender;
    let reciever = req.params.reciever;

    con.query(message(), [reciever, sender], (err, result) => { if (!err) { return res.status(200).json(result); } return res.status(500).json({ message: "Server Error" }); });
});


app.post("/login", (req, res) => {

    const { username, password } = req.body;

    const sql = "SELECT * FROM users WHERE username = ? AND password = ?";

    con.query(sql, [username, generateMD5Hash(password)], (err, result) => {

        if (!err) {
            if (result.length > 0) {
                return res.status(200).json({ message: 200, codeNumber: 1 });
            }

            return res.status(200).json({ message: "Invalid username or password", codeNumber: 0 });
        }

        return res.status(500).json({ message: "Server Error" });
    });

});

app.post("/register", (req, res) => {

    const { username, password } = req.body;

    const sql = "INSERT INTO users (`friend_code`, `username`, `password`) VALUES (?,?,?)";

    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let regenerates = '';
    let length = 11;
    const charsetLength = charset.length;

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charsetLength);
        regenerates += charset.charAt(randomIndex);
    }

    con.query(sql, [regenerates, username, generateMD5Hash(password)], (err, result) => {

        if (!err) {
            return res.status(200).json({ message: 200 });
        }

        return res.status(500).json({ message: 500 });

    });

});

// io.on("connection", (socket) =>{

//     socket.on("chat", (messageObj) =>{

//         const { user_id, message_text } = messageObj;

//         console.log(messageObj);

//         const sql = "INSERT INTO message(user_id, message_text) VALUES(?, ?)";

//         con.query(sql, [user_id, message_text], (err, result)=>{

//             if(!err){
//                 io.emit("chat", messageObj);
//             }
//             else{
//                 io.emit("chat", {user_id: 0, message_text: "Server Error"});
//             }

//         });


//     });

//     socket.on("disconnect", ()=>{
//         console.log("disconnected");

//     });

// });


server.listen(4000, () => {
    console.log("Server listening on PORT 4000");
});

function generateMD5Hash(data) {
    const hash = crypto.createHash('md5');
    hash.update(data);
    return hash.digest('hex');
}

function friendList(){
    return "SELECT user.user_id, user.friend_code, user.username, user.password, user.created_at, user.updated_at FROM `users` AS user RIGHT JOIN `friends` AS fr ON fr.friends_id = user.user_id WHERE fr.user_id = ?";
}

function message(){
    return "SELECT * FROM `messages` AS m LEFT JOIN `users` AS u ON m.reciever_id = u.user_id WHERE reciever_id = ? AND sender_id = ?";
}