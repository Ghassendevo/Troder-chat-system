var express = require("express");
var mysql = require("mysql");
const fs = require('fs');
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const multer = require("multer");
const { getegid } = require("process");
const formidable = require("formidable");
const { profile } = require("console");
const { EEXIST } = require("constants");
const { json } = require("body-parser");
const { connect } = require("http2");
const http = require("http")
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
let data = [];
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: 'meetup'
});
//web socket io

const { Server } = require("socket.io");
const { join } = require("path");
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
})

io.on("connection", (socket) => {
    socket.join(socket.id)
    socket.on("send_message", (data) => {
            io.emit("recieve_message", data)
        })
        //console.log(`User connected : ${socket.id}`)
        /*socket.on("disconnect", () =>{
            console.log(`User disconnected : ${socket.id}`)
        })*/
})
server.listen(3002, () => {
        //console.log("yes")
    })
    //
app.post('/tasks', (req, res) => {
    firstname = req.body.data.firstname;
    lastname = req.body.data.lastname;
    username = req.body.data.username;
    u_class = req.body.data.u_class;
    password = req.body.data.password;
    var check = "SELECT * FROM users WHERE username=?";
    con.query(check, [username], (err, rese) => {
        if (rese.length === 0) {
            var sql = "INSERT INTO users (firstname, lastname,username,password) VALUES (?,?,?,?)";
            con.query(sql, [firstname, lastname, username, password]);
            res.send('1');
        } else {
            res.send("0");
        }
    })

})
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './Profile_Img/all')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const upload = multer({ storage: storage })
app.post('/uploadimg', upload.single('file'), (req, res) => {
    const data = JSON.parse(req.body.username)
    const filename = req.file.filename

    const dire = "./profile_Img/all/" + req.file.filename
    if (!fs.existsSync('./Profile_Img/' + [data.username])) {
        // if not create directory
        fs.mkdirSync('./Profile_Img/' + [data.username]);
    }
    fs.rename('./profile_Img/all/' + req.file.filename, './profile_Img/' + data.username + '/' + req.file.filename, function(err) {
        if (err) {
            return console.error(err);
        }

        res.json({});
    });
    var update = "UPDATE users SET img=? WHERE username=?"
    con.query(update, [filename, username], (err, res) => {
        if (err) throw err;
    })
})

app.post('/reset', (req, res) => {
    var
        username = req.body.data.username,
        password = req.body.data.password;
    var check = "SELECT * FROM users WHERE username= ?"
    con.query(check, [username], (err, resi) => {
        if (err) throw err;
        if (resi.length > 0) {
            con.query("UPDATE users SET password=? WHERE username=?", [password, username], (err, rese) => {
                res.send({ message: 'Success', type: 'succ' })
            })
        } else {
            res.send({ message: 'Invalid username', type: 'err' })
        }
    })
})
app.post('/login', (req, res) => {
    var
        username = req.body.data.username,
        password = req.body.data.password;
    let check = "SELECT * FROM users WHERE username=? AND password=?"

    con.query(check, [username, password], (err, rese, fields) => {
        if (err) throw err;
        if (rese.length > 0) {
            var id = rese[0].id;
            let isNew = "SELECT * FROM chat WHERE msg_from=? OR msg_to=?"
            con.query(isNew, [id, id], (errr, resee) => {
                if (err) throw err
                var ide = id.toString();
                var userinfo = {
                    id: ide,
                    username: rese[0].username,
                    firstname: rese[0].firstname,
                    lastname: rese[0].lastname,
                    img: rese[0].img,
                }
                if (resee.length > 0) {
                    var userInfo = JSON.stringify(userinfo)
                    res.send({ message: true, userinfo: userInfo, isNew: false })
                } else {
                    var userInfo = JSON.stringify(userinfo)
                    res.send({ message: true, userinfo: userInfo, isNew: true })
                }


            })


        } else {
            res.send({ message: false })
        }
    })
})

app.post('/getMenuMessage', (req, res) => {
    const user_id = req.body.user_id

    const check = "SELECT * FROM chat WHERE msg_from=? OR msg_to=? ORDER BY ID DESC "
    con.query(check, [user_id, user_id], (err, succ) => {
        if (err) throw err
        if (succ.length > 0) {
            let b = []
            succ.forEach(element => {

                b.push(element)

            });
            const uniqUsers = [...b.reduce((map, obj) => map.set(obj.msg_from, obj), new Map()).values()]

            let test = 0
                //console.log(uniqUsers)
            const finalList = []
            uniqUsers.map((item, i) => {

                const getInfo = "SELECT * FROM users WHERE id=?"
                con.query(getInfo, [uniqUsers[i].msg_from], (err, don) => {
                    if (err) throw err;

                    finalList.push(don[0])
                        //console.log(don[0])
                        //console.log(finalList)
                    con.query('SELECT * FROM chat WHERE msg_from=? OR msg_to=? ORDER BY ID ASC', [user_id, user_id], (err, yes) => {
                        if (err) throw err
                        const uniqM = [...yes.reduce((map, obj) => map.set(obj.msg_from, obj), new Map()).values()]

                    })
                })

            })



            setTimeout(() => {

                res.send({ messages: uniqUsers, info: finalList, Allmsg: succ })
            }, 100)
        } else {
            let Nomessages = [{ id: "none" }]
            res.send({ Nomessages })

        }
    })
})



app.post('/usermessage', (req, ress) => {
    const userId = req.body.userId
    const userSession = req.body.userSession
        //get userid informations
    let useridInfo = "SELECT * FROM users WHERE id=?"
    con.query(useridInfo, [userId], (err, res) => {
        //get userid messages
        let useridMess = "SELECT * FROM chat WHERE msg_from=? AND msg_to=? OR msg_from=? AND msg_to=?"
        con.query(useridMess, [userId, userSession, userSession, userId], (err, suc) => {
            ress.send({ useridInfo: res[0], messages: suc })


        })
    })

})

app.post('/sendM', (req, resp) => {
    var
        msg_from = req.body.data.msg_from,
        msg_to = req.body.data.msg_to,
        msg = req.body.data.msg;
    con.query("INSERT INTO chat (msg_from, msg_to, msg) VALUES(? , ?, ?)", [msg_from, msg_to, msg], (err, suc) => {
        if (err) throw err
    })
})

app.listen(3001, (err, ) => {
    // console.log("connected !");
})