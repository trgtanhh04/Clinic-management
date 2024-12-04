// File này điểm kiểm tra xem kết nối database được không
const mongoose = require('mongoose')
module.exports.connect = async () =>{
    try {
        mongoose.connect(process.env.MONGO_URL)
        console.log("Connect success")
    } catch (error) {
        console.log("Connect error")
    }
}
