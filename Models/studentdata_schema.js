var mongoose=require('mongoose');
var Schema=mongoose.Schema;


var studentdata_Schema=new mongoose.Schema({
    "sname":{type:Schema.Types.String},
    "sid":{type:Schema.Types.String},
    "branch":{type:Schema.Types.String},
    "add":{type:Schema.Types.String}
})

var studentdata_module=mongoose.model('studentdata_module',studentdata_Schema);
module.exports=studentdata_module;
