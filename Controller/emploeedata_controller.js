const { response } = require("express");
var employeedata_module=require("../Models/employee_data");


exports.createdata=function(req,res){
  var requiredParams=
  {
    "name":req.body.name,
    "type":req.body.type,
    "client":req.body.client,
  }
  console.log(req.body)
  if(req.body == undefined || req.body==null || Object.keys(req.body).length <1 ){
    res.status(404).json({
      "type":false,
      "Message":"invalid Body",
     
    })  
    return;

  } 

  // for(key in requiredParams){
  //   console.log(":::::::::::::::::::::::::::::::::::::::::::::::::::::",key,req.body[key])
  //   if(req.body[key] == undefined || req.body[key]==null  || req.body[key].length <1){
  //     res.status(404).json({
  //       "type":false,
  //       "Message":"invalid"+" "+key
       
  //     })  
  //     return;
  
  //   }

  // }
  employeedata_module.create(requiredParams,(error,response)=>{
    if(error){
      res.status(404).json({
         type:fasle,
          Message:"There is error",
          data:error
      })
      return;
    }
    else{
      res.status(200).json({
        type:true,
        message:"success",
        data:response
      
      })  
     return;
  }
  })
 
}
// var data=employeedata_module.create({name:"archith"}).exec((error,response)=>{
//   if(error){
//     response.status(404).json({
//       "type":flase,
//       "message":"data not added",
//       "data":data
//     })
//     return;
//   }
//   else{
//     res.status(200).json({
//     "type":true,
//     "message":"data added successfully",
//     "data":response
//   })
//   }
// })
  
// employeedata_module.create({name:"raj",type:"ksdjk",client:"event"})
// employeedata_module.create({name:"ilesh",type:"fulltime",client:"anvayaa"})
// employeedata_module.create({name:"sharath",type:"permsanent",client:"xrg"})

  exports.getdata=function(req,res){
    var data = employeedata_module.aggregate([{$match:{name:req.body.name,type:req.body.type,client:req.body.client}}]).exec((error, response)=>{
      if(error){
        res.status(200).json({
          "type":false,
          "Message":"erro message from get the data",
          "data":data
          
        })
        return;
      }else{
        res.status(200).json({
          "type":true,
          "Message":"message from get the data",
          "data":response
        })
        return;
      } 
    }) 
  }
  // exports.adddata=(req,res)=>{
  //   employeedata_module.create({name:"ilesh",type:"care",client:"xrg"}, (error,response)=>{
  //    // var data = employeedata_module.aggregate([{$match:{name:"praneeth"}}]).exec((error, response)=>{
  //     if(error){
  //       res.status(404).json({
  //         "type":false,
  //         "Message":"erro message from adding the data",
  //        "data":error
  //       })
  //       return;
  //     }else{
  //       res.status(200).json({
  //         "type":true,
  //         "Message":"message from adding the data",
  //         "data":response
         
  //       })
  //       return;
  //     } 
  //   })
  // }

 exports.updatedata=(req,res)=>{
//    console.log("Router came to update");


   var data=employeedata_module.updateOne({_id:req.body.id},{type:req.body.type,client:req.body.client,name:req.body.name,status:req.body.status},(error, response)=>{

  //  })

  // employeedata_module.findOneAndUpdate(({name:"varun"},data),(error,response)=>{
    if(error){
      res.status(404).json({
        "type":false,
        "message":"data not updated",
        "data":error
      })
      return;
    }
    else{
        res.status(200).json({
          "type":true,
          "message":"data updated successfully",
          "data":response

        })
        return;
    }
    
  }
   ) 
  }

exports.showdata=(req,res)=>{

  var empid = req.body.empid;

  employeedata_module.findOne ({empid:empid},(error,response)=>{
    if(error){
      res.status(404).json({
        "type":false,
        "message":"error showing in data",
        "data":error
      })
      return;
    }
    else{
      res.status(200).json({
        "type":true,
        "message":"data shown successfully",
        "data":response
      })
      return;
    }   
  })}


exports.deletedata=(req,res)=>{
  
  var id=req.body.id;
 
  if(id==undefined||id.trim()==""){
    res.status(404).json({
        "type":false,
        "message":"Must and should enter the id value",
      
       })
    return;
  }
  else{
  employeedata_module.updateOne({_id:id},{$set:{status:"Inactive"}},(error,response)=>{
    if(error){
      res.status(404).json({
        "type":false,
        "message":"data not deleted",
    
      })
      return;
    }
    else{
      res.status(200).json({
        "type":true,
        "message":"data deleted succesfully",
        "data":response
      })
      return;
    }
  })
}
}

exports.adddata=(req,res)=>{
  // var requiredParams=
  // {
  //   "name":true,
  //   "age":true,
  //   "type":true,
  //   "client":true,
  // }
  var name=req.body.name;
  var type=req.body.type;
  var client=req.body.client;
  var age=req.body.age;
  var email=req.body.email;
  //var agecondition=!age.match(/^[0-9]{2}$/);

//  console.log(nameRegEx);
var nameValid=name==undefined||name==""||name.trim()==""||!name.match(/^[a-zA-Z]{6,25}$/);

var ageValid=age==undefined||age==null||isNaN(age)||!age.match(/^[0-9]{1,3}$/);

var typeValid=type==undefined||type==""||type.trim()=="";

var clientValid=client==undefined||client==""||client.trim()=="";

var emailValid=email.trim()==""||!email.match(/^[a-zA-z0-9]+@+[a-z]+.com/);


   var condition=nameValid||typeValid||clientValid||ageValid||emailValid;
  if(condition){
    res.status(400).json({
      "type": false,
      "message":"Name, type ,client ,age  should not be empty must be a value  "
    })
    
    return;
  }
    else{
      employeedata_module.create({email:req.body.email,name:req.body.name,type:req.body.type,client:req.body.client,age:req.body.age},(error,response)=>{



    if(error){
      res.status(404).json({
        "type":false,
         "message":"data not added successfully",
         "data":error
        })
    return;
  }
  else{
    res.status(200).json({
      "type":true,
     "message":"data added successfully",
     "data":response
   })
       return;
  }
      }

      
)
}

}

exports.findbyname=(req,res)=>{
  var name=req.body.name
  
  employeedata_module.find({name:name},(error,response)=>{
    if(name==undefined||name.trim()==""){
      res.status(404).json({
        "type":false,
        "message":"Name should not be empty",
        "data":error
      })
      return;
    }
    else{
      res.status(200).json({
        "type":true,
        "message":"Data shown successfully",
        "data":response
      })
      return;
    }
  })
}



  //   var data=employeedata_module.create({name:"eventdata",type:"part time",client:"medchal"}).exec((error,response)=>{

  //   if(error){
  //   res.status(404).json({
  //     "type":false,
  //     "message":"data added successsfully",
  //     "data":error
  //   })
  //   return;
  // } else{
  //   res.status(200).json({
  //     "type":true,
  //     "message":"data added successfully",
  //     "data":response
  //   })
  // }
  // })
    // .exec((error,response)=>{
    //   if(error){
    //     res.status(404).json({
    //     "type":false,
    //     "message":"not added to the database",
    //     "data":data
    //   })
    //   return;
    // }
    // else{
    //   res.[status(200).json({
    //     "type":true,
    //     "message":"data added successfully",
    //     "data":response
    //   })
    //   return;
    // }

    // })
