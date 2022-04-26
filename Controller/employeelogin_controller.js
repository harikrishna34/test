const { response } = require("express");
const employeedata_module = require("../Models/employee_data");
var employeelogin_module = require("../Models/employee_login");

exports.login = (req, res) => {
    var empid = req.body.empid;
    if (empid == "" || empid.trim() == "") {
        res.status(404).json({
            type: false,
            message: "please enter the id",
        });
        return;
    } else {
        employeelogin_module.create({ empid: empid }, (error, response) => {
            if (error) {
                res.status(404).json({
                    type: false,
                    message: "Login failed",
                    data: error,
                });
                return;
            } else {
                res.status(200).json({
                    type: true,
                    message: "Succesfully loged in",
                    data: response,
                });
                return;
            }
        });
    }
};

exports.showempfulldata = (req, res) => {
    var empid = req.body.empid;
    if (empid == undefined) {
        res.status(404).json({
            "type": false,
            "message": "without empid data not fetch"
        })
    }
    else {
        employeedata_module.findOne(({ empid: empid }), (error, response) => {

            if (response == null) {
                res.status(404).json({
                    "type": false,
                    "message": "incorrect id",
                    "data": error
                })
                return;
            }
            else {
                employeedata_module.aggregate(([
                    { $match: { empid: empid } },
                    {
                        $lookup: {
                            from: "employeelogin_modules",
                            localField: "empid",
                            foreignField: "empid",
                            as: "login",
                        },
                    },
                    // {$unwind: "login"}
                ]), (error, response) => {
                    if (error) {
                        res.status(404).json({
                            "type": false,
                            "message": "Something went wrong",
                            "data": error
                        })
                        return;
                    }
                    else {
                        res.status(200).json({
                            "type": true,
                            "message": "data fetch successfully",
                            "data": response
                        })
                        return;
                    }
                    return;
                })
            }
        })
    }
};

exports.logout = (req, res) => {

    var empid = req.body.empid;
    var date = new Date();

    if (empid == undefined) {
        res.status(404).json({
            "type": false,
            "message": "without empid logout not possible",

        })
        return;
    }
    else {
        employeelogin_module.findOne(({ empid: empid }), (error, response) => {
            if (response == null) {
                res.status(404).json({
                    "type": false,
                    "message": "Please enter a valid empid",
                    "data": error
                })
                return;
            }
            else {

                employeelogin_module.updateOne({ empid: empid }, { "login_status": "InActive", "logout_TimeandDate": date }, (error, response) => {
                    if (error) {
                        res.status(404).json({
                            "type": false,
                            "message": "some thing went wrong",
                            "data": error
                        })
                        return;
                    }
                    else {
                        res.status(200).json({
                            "type": true,
                            "message": "successfully log out",
                            "data": response
                        })
                    }
                })
            }
        })
    }

};

exports.unwindtask = (req, res) => {
    var empid = req.body.empid;
    if (empid == undefined) {
        res.status(404).json({
            "type": false,
            "message": "without empid data not fetch"
        })
    }
    else {
        employeedata_module.findOne(({ empid: empid }), (error, response) => {

            if (response == null) {
                res.status(404).json({
                    "type": false,
                    "message": "incorrect id",
                    "data": error
                })
                return;
            }
            else {
                employeedata_module.aggregate(([

                    { $match: { empid: empid } },
                    {
                        $lookup: {
                            from: "employeelogin_modules",
                            localField: "empid",
                            foreignField: "empid",
                            as: "login",
                        }
                    }, {
                        $unwind: {
                            path: "$login",
                            preserveNullAndEmptyArrays: true
                        }
                    }

                ]), (error, response) => {
                    if (error) {
                        res.status(404).json({
                            "type": false,
                            "message": "Something went wrong",
                            "data": error
                        })
                        return;
                    }
                    else {

                        res.status(200).json({
                            "type": true,
                            "message": "data fetch successfully",
                            "data": response
                        })
                        return;
                    }
                })
            }
        })
  }
};