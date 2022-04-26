var express=require('express');
var router=express.Router();

var employeedatacontroler=require("../Controller/emploeedata_controller");
const employeedata_module = require('../Models/employee_data');

router.use(function (req, res, next) {
   // console.log("Request Arrived to employee  Services Router");
    next();
});

router.post('/createdata',employeedatacontroler.createdata)
router.get('/getdata',employeedatacontroler.getdata)
// router.post('/adddata',employeedatacontroler.adddata);
router.put('/updatedata',employeedatacontroler.updatedata);
router.get('/showdata',employeedatacontroler.showdata);
router.put('/deletedata',employeedatacontroler.deletedata);
router.post('/adddata',employeedatacontroler.adddata);
router.get('/findbyname',employeedatacontroler.findbyname)

module.exports=router;


// (req,res)=>{
//     res.send({
//         name:"hareesh",
//         type:"full-stack",
//         client:"new relic",
//         active:true
//     })
// }


