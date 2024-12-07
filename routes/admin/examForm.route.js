const express = require('express')
const router = express.Router()

const controller = require("../../controllers/admin/examForm.controller.js")

//Giao diện ban đầu
router.get('/', controller.index)

//Tạo phiếu khám bệnh
router.get('/create/:id', controller.createForm)

router.post('/create/:id', controller.createFormPost)

module.exports = router