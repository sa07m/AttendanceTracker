const express = require('express')
const controlAttendance = require('../controllers/controller')
const router = express.Router()

router.post('/mark-attendance', controlAttendance.postAttendance)

module.exports = router