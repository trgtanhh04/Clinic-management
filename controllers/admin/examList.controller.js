const Patient = require("../../models/patientModel.js")
const systemConfig = require("../../config/system.js")

//1. [GET] /admin/exam-list
module.exports.index = async (req, res)=>{

    let find = {
        deleted: false
    };

    const patients = await Patient.find(find);
    
    res.render("admin/pages/examList/index.pug", {
        pageTitle: "Danh sách bệnh nhân",
        patients: patients
    })
}


//2. [GET] /admin/exam-list/create
module.exports.create = async (req, res)=>{

    let find = {
        deleted: false
    };

    const patients = await Patient.find(find);
    
    res.render("admin/pages/examList/index.pug", {
        pageTitle: "Danh sách bệnh nhân",
        patients: patients
    })
}
