const sequelize = require("../util/database");
const Sequelize = require('sequelize')
const AttendanceModel = require('../models/model')

exports.postAttendance = (req, res, next) => {
    console.log('in post controller')
    const date= req.body.date
    const name = req.body.name
    const status = req.body.status

    AttendanceModel.create({
        date:date,
        name:name,
        status:status
    })
    .then(result=>{
        console.log('done creating a model')
        res.json(result)
    })
    .catch(err=>console.log(err))
} 
