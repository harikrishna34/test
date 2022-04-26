const { response } = require("express");
const attendence_Schema = require("../Models/attendence_schema");
var employeedata_module = require("../Models/employee_data");

var dat = new Date();
var onlydate =
  dat.getDate() + "-" + (dat.getMonth() + 1) + "-" + dat.getFullYear();

var moment = require("moment-timezone");
moment.tz.setDefault("Asia/Kolkata");

var date = moment(new Date()).unix();

exports.atten = (req, res) => {
  var empid = req.body.empid;

  if (empid == undefined) {
    res.status(404).json({
      type: false,
      message: "with out emp id can't login",
    });
    return;
  } 
  else 
  {
    employeedata_module.findOne({ empid: empid }, (error, response) => {
      if (response == null) {
        res.status(404).json({
          type: false,
          message: "incorrect id",
          data: error,
        });
        console.log(response)
        return;
      } else {
        var data = [{
          time: date,
          type: "login",
        }];

      
    var data1={
      time:date,
      type:"logout"
    }
    data.push(data1)
    console.log(data)
        var punch_Schema = [];
        var attendence=[];
      
        attendence_Schema.findOne({ empid: empid }, (error, response) => {
           var condition=response.date==onlydate;
           console.log(condition)
            if (!condition) {
              
             
             // console.log(attendence.length)
              
              res.status(200).json({
                type: true,
                message: "login successfully",
                data: response,
              });
            
              return;
            } else {
              punch_Schema.push(data);
              console.log(punch_Schema)
             attendence.push(punch_Schema)
             console.log(attendence)
             attendence_Schema.push(attendence)
             console.log(attendence_Schema)
              attendence_Schema.create(
               
                { empid: empid, punch_Schema: attendence },
                (error, response) => {
                  if (error) {
                    res.status(404).json({
                      type: false,
                      message: "something went wrong",
                      data: error,
                    });
                    return;
                    attendence_Schema.push(attendence)
                    console.log(attendence_Schema)
                  } else {
                    res.status(200).json({
                      type: true,
                      message: "Attendence success",
                      data: response,
                    });
                    return;
                  }
                }
              );
              return;
            }
          }
        );

        return;
      }
    });
  }
};
