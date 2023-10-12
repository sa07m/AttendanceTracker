const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const AttendanceModel = sequelize.define('attendance',{
    date:{
        type:Sequelize.DATE,
        allowNull:false
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false

    },
    status:{
        type:Sequelize.STRING,
        allowNull:false
    }

})

module.exports = AttendanceModel