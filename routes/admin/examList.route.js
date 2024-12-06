const express = require('express')
const router = express.Router()

const controller = require("../../controllers/admin/examList.controller.js")

router.get('/', controller.index)

//Tạo mới 1 bệnh nhân
router.get('/create', controller.create)

router.post('/create', controller.createPost)

//Xóa 1 bệnh nhân
router.delete('/delete/:id', controller.deletePatient) 

//Chỉnh sửa thông tin của 1 bệnh nhân
router.get('/edit/:id', controller.edit)
router.patch('/edit/:id',controller.editPatch)


module.exports = router