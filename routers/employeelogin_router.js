var express=require('express');
var router=express.Router();


var employeeloginControler=require("../Controller/employeelogin_controller");
const employeelogin_module=require("../Models/employee_login");

router.use(function(req,res,next){
    next();
})
router.post('/login',employeeloginControler.login);
router.get('/empfulldata',employeeloginControler.showempfulldata)
router.put('/logout',employeeloginControler.logout)
router.get('/unwind',employeeloginControler.unwindtask)
module.exports=router;