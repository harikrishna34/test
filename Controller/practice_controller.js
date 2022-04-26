const {response}=require('express');
const employeedata_module = require('../Models/employee_data');
var practice_module=require("../Models/practice");
var moment=require("moment-timezone");
moment.tz.setDefault('Asia/Delhi');
var date=new Date();




exports.dummy=(req,res)=>{
 var name=req.body.name;
 var empid=req.body.empid;

 if(empid==undefined){
     res.status(404).json({
         "type":false,
         "message":"with out emp id can't login",
      
     })
     return;
 }
 else{
    employeedata_module.findOne({empid:empid},(error,response)=>{
        if(response==null)
        {
            res.status(404).json({
                "type":false,
                "message":"please enter a valid empid",
                "data":error
            })
            return;
        }
        else{
            practice_module.create({name:name,empid:empid,date:moment()},(error,response)=>{
                if(error)
                {
                    res.staus(404).json({
                        "type":false,
                        "message":"something went wrong",
                        "data":error
                    })

                    return;
                }
                else{
                    res.status(200).json({
                        "type":true,
                        "message":"Log in successfully",
                        "data":response
                    })
                    return;
                }
            })
            return;
        }
    })

     
 }

};

exports.logoutdummy=(req,res)=>{
    var name=req.body.name;
    var empid=req.body.empid;
   
    if(empid==undefined){
        res.status(404).json({
            "type":false,
            "message":"with out emp id can't login",
         
        })
        return;
    }
    else{
       employeedata_module.findOne({empid:empid},(error,response)=>{
           if(response==null)
           {
               res.status(404).json({
                   "type":false,
                   "message":"please enter a valid empid",
                   "data":error
               })
               return;
           }
           else{
               practice_module.updateOne({logout_time:moment()},(error,response)=>{
                   if(error)
                   {
                       res.staus(404).json({
                           "type":false,
                           "message":"something went wrong",
                           "data":error
                       })
   
                       return;
                   }
                   else{
                       res.status(200).json({
                           "type":true,
                           "message":"Log in successfully",
                           "data":response
                       })
                       return;
                   }
               })
               return;
           }
       })
   
        
    }
   
   }

exports.check=(req,res)=>{
    var name=req.body.name;
    var empid=req.body.empid;
    var village=req.body.village;
    var mandal=req.body.mandal;
    var dist=req.body.dist;
 var cond=name==undefined||empid==undefined||village==undefined||mandal==undefined||dist==undefined||
         name.trim()==null||empid.trim()==null||village.trim()==null||mandal.trim()==null||dist.trim()==null;

         if(cond){
             res.status(404).json({
                 type:false,
                 message:"condition must and should follow"
                })
                return;
         }
         else{
             practice_module.create({name:name,empid:empid,address:{village:village,mandal:mandal,dist:dist}},{$unwind: {
                path: "$address",
                preserveNullAndEmptyArrays: true
            }},(error,response)=>{
                 if(error)
                 {
                     res.status(404).json({
                         type:false,
                         message:"something went wrong",
                         data:error
                     })
                     return;
                 }
                 else{
                     res.status(200).json({
                         type:true,
                         message:"data added successfully",
                         data:response
                     })
                     return;
                 }
             })
         }
}


