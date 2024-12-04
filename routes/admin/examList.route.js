const express = require('express')
const router = express.Router()

const controller = require("../../controllers/admin/examList.controller.js")

router.get('/', controller.index)

//Tạo mới 1 bệnh nhân
// router.get('/create', controller.create)

// router.post('/create', controller.createPost)

module.exports = router