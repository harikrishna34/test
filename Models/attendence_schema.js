var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var moment=require("moment-timezone");
moment.tz.setDefault("Asia/Kolkata");
var dat=new Date()
var onlydate=dat.getDate()+"-"+(dat.getMonth()+1)+"-"+dat.getFullYear();

var punch_Schema=new mongoose.Schema({
"empid":{type: Schema.Types.String},
"time":{type: Schema.Types.Number},
"type":{type: Schema.Types.String},
})

var attendence_Schema=new mongoose.Schema({
    "empid":{type: Schema.Types.String},
    "date":{type: Schema.Types.String,default:onlydate},
    "type":{type: Schema.Types.String},
    "attancdence":[punch_Schema]
})

var attendence_Schema=mongoose.model('attendence_module',attendence_Schema);
module.exports=attendence_Schema;