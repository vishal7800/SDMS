const express = require('express');
const router = express.Router();
const admincontroller = require("../controllers/admincontroller")

router.get('/students', admincontroller.getStudentsByGroup);
// Fix spelling in route
router.post('/saveAttendance', admincontroller.saveAttendance);
router.post('/test', (req, res) => {
    res.send('Test route is working!');
  });
  


module.exports = router;
