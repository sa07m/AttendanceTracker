const Sequelize = require('sequelize')
const sequelize = new Sequelize('test','root','36@Chinatown',{
    dialect:'mysql',
    host:'localhost'
})

module.exports = sequelize