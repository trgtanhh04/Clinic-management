const express = require('express')
const router = express.Router()

const controller = require("../../controllers/admin/regulationUpdate.controller.js")

//1. Các quy định chung
router.get('/general-regulation', controller.getRegulation)
router.post('/general-regulation', controller.regulation)

//2. Quy định thuốc
router.get('/medicine', controller.medicine)

//Tạo thuốc
router.get('/medicine/create', controller.createMedicine)

router.post('/medicine/create', controller.createMedicinePost)

//Xóa thuốc
router.delete('/medicine/delete/:id', controller.deleteMedicine)

//2. Quy định về loại bệnh
router.get('/disease', controller.disease)

//Tạo bệnh
router.get('/disease/create', controller.createDisease)

router.post('/disease/create', controller.createDiseasePost)

//Xóa bệnh
router.delete('/disease/delete/:id', controller.deleteDisease)


module.exports = router