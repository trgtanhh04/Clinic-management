const mongoose = require("mongoose");
const Patient = require("../../models/patientModel.js");
const Form = require("../../models/medicalFormModel.js");
const Medicine = require("../../models/medicineModel.js");
const Invoice = require("../../models/invoiceModel.js")
const { StatusCodes } = require("http-status-codes");

const moment = require("moment");


// 1. [GET] admin/monthly-report
module.exports.index = async (req, res) => {
    res.status(StatusCodes.OK).json({
        message: "Đây là trang dao diện cho báo cáo tháng"
    });
};


// 2. [GET] admin/monthly-report/revenue?month=<tháng cần xem>
module.exports.revenue = async (req, res) => {
    try {
        const month = req.query.month;

        if (!month || isNaN(month) || month < 1 || month > 12) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Tháng không hợp lệ. Vui lòng nhập giá trị từ 1 đến 12."
            });
        }

        // Lọc bệnh nhân trong tháng
        const patients = await Patient.find({ deleted: false });
        const patientsByDay = {};

        patients.forEach((patient) => {
            const patientDate = moment(patient.createdAt);
            if (patientDate.month() + 1 == month) { // +1 vì month() trả về 0-11
                const day = patientDate.format("YYYY-MM-DD");
                patientsByDay[day] = (patientsByDay[day] || 0) + 1;
            }
        });

        // Lọc hóa đơn trong tháng
        const invoices = await Invoice.find();
        const revenueByDay = {};

        invoices.forEach((invoice) => {
            const invoiceDate = moment(invoice.createdAt);
            if (invoiceDate.month() + 1 == month) {
                const day = invoiceDate.format("YYYY-MM-DD");
                revenueByDay[day] = (revenueByDay[day] || 0) + invoice.totalFee; // `invoice.total` là doanh thu
            }
        });

        // Tạo dữ liệu tổng hợp
        const reportData = Object.keys(patientsByDay).map((day) => ({
            day,
            patients: patientsByDay[day] || 0,
            revenue: revenueByDay[day] || 0,
        }));

        // Phản hồi
        res.status(StatusCodes.OK).json({
            success: true,
            month,
            report: reportData
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Đã xảy ra lỗi khi tạo báo cáo.",
            error: error.message
        });
    }
};

// 3. [GET] admin/monthly-report/medicine?month=<tháng cần xem>
module.exports.medicine = async (req, res) => {
    try {
      const month = parseInt(req.query.month, 10);
  
      if (!month || month < 1 || month > 12) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Tháng không hợp lệ. Vui lòng nhập giá trị từ 1 đến 12.",
        });
      }
  
      // Lấy danh sách các phiếu khám bệnh
      const forms = await Form.find({ deleted: false });
  
      // Khai báo đối tượng thống kê thuốc
      const medicineUsage = {};
  
      forms.forEach((form) => {
        const formDate = moment(form.createdAt);
  
        // Kiểm tra tháng của phiếu khám
        if (formDate.month() + 1 === month) {
          // Lấy danh sách thuốc trong form
          const countedMedicines = new Set();
  
          form.medicines.forEach((medicine) => {
            const { medicineID, quantity, description } = medicine;
  
            // Nếu thuốc chưa có trong danh sách, khởi tạo
            if (!medicineUsage[medicineID]) {
              medicineUsage[medicineID] = {
                medicineID,
                description,
                totalQuantity: 0,
                usageCount: 0,
              };
            }
  
            // Cộng dồn số lượng thuốc
            medicineUsage[medicineID].totalQuantity += quantity;
  
            // Kiểm tra nếu thuốc chưa được tính usageCount trong form này
            if (!countedMedicines.has(medicineID)) {
              medicineUsage[medicineID].usageCount += 1;
              countedMedicines.add(medicineID);
            }
          });
        }
      });
  
      // Lấy thông tin chi tiết từ bảng thuốc
      const medicineDetails = await Medicine.find({ deleted: false });
  
      // Tạo báo cáo
      const report = Object.values(medicineUsage).map((medicineStat) => {
        const medicineDetail = medicineDetails.find(
          (med) => med._id.toString() === medicineStat.medicineID
        );
  
        return {
          name: medicineDetail ? medicineDetail.medicineName : "Không xác định",
          unit: medicineDetail ? medicineDetail.unit : "Không xác định",
          description: medicineStat.description || "Không có mô tả",
          totalQuantity: medicineStat.totalQuantity,
          usageCount: medicineStat.usageCount,
        };
      });
  
      // Sắp xếp báo cáo theo tên thuốc
      report.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
  
      // Trả về kết quả
      res.status(StatusCodes.OK).json({
        message: "Báo cáo sử dụng thuốc trong tháng",
        medicines: report,
      });
    } catch (error) {
      console.error("Lỗi khi tạo báo cáo thuốc:", error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Đã xảy ra lỗi khi tạo báo cáo thuốc.",
      });
    }
  };
  