const Patient = require("../../models/patientModel.js")
const systemConfig = require("../../config/system.js")
const { StatusCodes } = require('http-status-codes'); 

//1. [GET] /admin/exam-list
module.exports.index = async (req, res)=>{

    let find = {
        deleted: false
    };

    const patients = await Patient.find(find);
    res.status(StatusCodes.OK).json({ success: true, data: patients }); // Trả về danh sách bệnh nhân
}

//2. [GET] /admin/exam-list/create
module.exports.create = async (req, res)=>{

    let find = {
        deleted: false
    };

    const patients = await Patient.find(find);
}
