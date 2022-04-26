var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var moment=require("moment-timezone");
moment.tz.setDefault('Asia/Kolkata');
var date=new Date();

   var employee_loginSchema=new mongoose.Schema({
    "empid":{type:Schema.Types.String},
    "login_TimeandDate":{type:Schema.Types.String,default:date},
    "logout_TimeandDate":{type:Schema.Types.String},
    "login_status":{type:Schema.Types.String,default:"Active"}

})

var employeelogin_module=mongoose.model('employeelogin_module',employee_loginSchema);
module.exports=employeelogin_module;