const sequelize = require("../util/database");
const Sequelize = require('sequelize')
const AttendanceModel = require('../models/studentModel')
const DateModel = require('../models/dateModel')

exports.addDate = (req, res, next) => {
    console.log('in adddate controller')
    const dateStr = req.body.date1
   const date2 = new Date(dateStr)
  // const jsonDate = date2.toJSON()
    console.log(date2+'issue')
    DateModel.create({
        date: date2
    })
        .then((result) => console.log('date created'))
        .catch(err => console.log(err))
}


exports.getAttendance = (req, res, next) => {
    const date1 = req.params.date1;
    const date = new Date(date1)
    DateModel.findOne({
        where: {
            date: date
        }
    })
        .then(dateModel => {
            if (dateModel) {
                const dateId = dateModel.id;
                AttendanceModel.findAll({
                    where: {
                        dateId: dateId
                    }
                })
                    .then(result => {
                        console.log('In get controller');
                        res.json(result);
                    })
                    .catch(err => console.log(err));
            } else {
                console.log('Date not found');
                res.json();
            }
        })
        .catch(err => {
          console.log(err)
          res.json()
        })
}

// exports.postAttendance = (req, res, next) => {
//   console.log('in post controller');
//     const name = req.body.name;
//     const status = req.body.status;
//     const date1 = req.body.date1;
    
//     const date= new Date(date1)
    
//     DateModel.findOne(date)
//     .then(date => {
//       if(date && typeof date.createAttendanceModel === 'function') {
//       return date.createAttendanceModel({
//         name:name,
//         status:status
//       })
//     }
//     else{
//       throw new Error('createAttendanceModel method not found on date object');
//     }
//   })
//     .then(result=>{
//       console.log('created attendance')
//       res.json(result)
//     })
//     .catch(err=>console.log(err))
//   }
  
exports.postAttendance = (req, res, next) => {
  console.log('in post controller');
  const name = req.body.name;
  const status = req.body.status;
  const date1 = req.body.date1;
  
  const date = new Date(date1);

  // Step 1: Find or create a record in DateModel for the specified date
  DateModel.findOrCreate({
    where: { date: date },
    defaults: { date: date } // This ensures it's created if it doesn't exist
  })
  .then(([dateModel, created]) => {
    // Step 2: Get the dateId from the DateModel record
    const dateId = dateModel.id;

    // Step 3: Create a new record in AttendanceModel
    return AttendanceModel.create({
      name: name,
      status: status,
      dateId: dateId
    });
  })
  .then(result => {
    console.log('Created attendance');
    res.json(result);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ error: 'Server error' });
  });
}
