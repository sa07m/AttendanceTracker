const express = require('express')
const sequelize = require('./util/database')
const cors = require('cors')
const bodyParser = require('body-parser')
const Student = require('./models/studentModel')
const DateModel = require('./models/dateModel')
const app = express()
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors())
const routeAttendance = require('./routes/route')
app.use(routeAttendance)

Student.belongsTo(DateModel, { constraints: true, onDelete: 'CASCADE' });
DateModel.hasMany(Student);
sequelize
//.sync({ force: true })
.sync()
.then(()=>{
    app.listen(7000)
    console.log('listening to port 7000')
})
.catch(err=>console.log(err))