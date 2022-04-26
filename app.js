var express=require('express');
var bodyParser=require('body-parser')
var app=express();

app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());




var mongoose=require('mongoose');

mongoose.connect("mongodb://3.110.28.19:27017/employee",{

}).then(()=>{
    console.log("mongoose connectedd")
}).catch((e)=>{
    console.log("mongoose not connected")
})


var cookieParser=require('cookie-parser')
var cors=require('cors')
var utf8=require('utf8')

var router=express.Router();

var employeedata_router=require('./routers/employeedata_router');
app.use("/api/employee",employeedata_router);

var employeelogin_router=require('./routers/employeelogin_router');
app.use("/api/employee",employeelogin_router);

var practice_router=require('./routers/practice_router');
app.use("/api/employee",practice_router);


var attendence_router=require("./routers/attendence_router");
app.use("/api/employee",attendence_router);

app.use(cors())
app.use(express.static(__dirname+"/public"))
app.use(cookieParser())




  app.use(express.json());


app.use(router);
app.use(function (req, res, next) {
    
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Headers", "Version");
    next();
});

app.use(function (req, res, next) {
    var err = {};
    err.status = 404;
    res.send("Sorry Resource Not Found----------------------- ");
});

app.use(function (err,req, res, next) {
    if (!err) {
        return next();
    }
    console.error((new Date).toUTCString() + ' error:', err)
    res.status(500);
   // res.send('500: Internal server error');
});
var Port="3334"
app.listen(Port, function(){
    console.log("Server Listening at Port"+" "+Port)
});



