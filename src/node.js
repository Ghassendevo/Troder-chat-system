var express = require("express");
var mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.get('/tasks',(req,res)=>{
    res.send("ghassen abdellaoui")
})
app.listen(3001,(err,)=>{
    console.log("connected !");
})