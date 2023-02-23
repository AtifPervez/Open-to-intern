const express=require('express')
const router=express.Router()
const collegeController=require('../controller/collegeController')
const internController=require('../controller/internController')



router.post('/createCollege',collegeController.createCollege)
router.post('/createIntern',internController.createIntern)
router.get('/getCollege/:id',collegeController.getCollegeDetails)
router.get('/getIntern/',internController.getCollegeIntern)
router.get('/getCollegeAllDetails/',internController.getCollegeAllDetails)




module.exports=router