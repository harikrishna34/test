var express=require('express');
var router=express.Router();

var attendenceControler=require("../Controller/attendence_controler");
var attendence_module=require("../Models/attendence_schema");


router.use(function(req,res,next){
    next();
})


router.post("/attendence",attendenceControler.atten)


module.exports=router;