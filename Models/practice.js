var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var moment=require("moment-timezone");
moment.tz.setDefault('Asia/Delhi');
var date=new Date();


var address_schema=({
    "village":{type:Schema.Types.String},
    "mandal":{type:Schema.Types.String},
    "dist":{type:Schema.Types.String},
})

var practice_Schema=new mongoose.Schema({
    "name":{type:Schema.Types.String},
    "empid":{type:Schema.Types.String},
    "address":[address_schema]
    // "date":{type:Schema.Types.Number,default:0},
    // "login_time":{type:Schema.Types.String,default:date},
    // "logout_time":{type:Schema.Types.String}
})

var practice_module=mongoose.model('practice',practice_Schema);
module.exports=practice_module
