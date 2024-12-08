const express = require('express')
const router = express.Router()

const controller = require("../../controllers/admin/account.controller.js")

//Giao diện ban đầu
router.get('/', controller.index)

//Tạo tài khoản
// router.get('/create', controller.create)
router.post('/create', controller.createPost)

//Sửa tài khoản
router.get('/edit/:id', controller.edit)
router.patch('/edit/:id', controller.editPatch)


// //Xóa tài khoản
router.delete('/delete/:id', controller.delete)


module.exports = router