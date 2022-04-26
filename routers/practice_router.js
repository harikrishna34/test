var express=require('express');
var router=express.Router();

var practiceControler=require("../Controller/practice_controller");
var practice_module=require('../Models/practice');

router.use(function(req,res,next){
    next();
})

router.post('/check',practiceControler.check)
router.post('/dummy',practiceControler.dummy)
router.put('/logoutd',practiceControler.logoutdummy)
module.exports=router;