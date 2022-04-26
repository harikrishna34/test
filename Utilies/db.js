var mongoose=require('mongoose')

mongoose.connect("mongodb://localhost:27017/employee",{

}).then(()=>{
    console.log("mongoose connectedd")
}).catch((e)=>{
    console.log("mongoose not connected")
})