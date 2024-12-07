const express = require('express')
const router = express.Router()

const controller = require("../../controllers/admin/invoice.controller.js")

//1. Hiển thị dánh scah bệnh nhân
router.get('/', controller.index)

//2. Tạo háo đơn cho mỗi bệnh nhân
router.get('/create/:id', controller.invoice)

router.post('/create/:id', controller.invoicePost)

module.exports = router