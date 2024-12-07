const express = require('express')
const router = express.Router()

const controller = require("../../controllers/admin/monthlyReport.controller.js")

//1. Hiển thị dánh scah bệnh nhân
router.get('/', controller.index)

//2. Tạo háo đơn cho mỗi bệnh nhân
router.get('/revenue', controller.revenue)

router.get('/medicine', controller.medicine)

module.exports = router