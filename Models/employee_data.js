var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var moment=require("moment-timezone");
moment.tz.setDefault("Asia/Kolkata");


var employee_dataSchema=new mongoose.Schema({
    "name":{type: Schema.Types.String},
    "empid":{type:Schema.Types.String},
    "type":{type: Schema.Types.String},
    "age":{type: Schema.Types.String},
    "email":{type:Schema.Types.String},
    "client":{type: Schema.Types.String},
    "status":{type: Schema.Types.String,default:"Active"}

})

var employeedata_module=mongoose.model('employeedata_module',employee_dataSchema);
module.exports=employeedata_module;



