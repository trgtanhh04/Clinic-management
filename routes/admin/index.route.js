
const examListRoutes = require('./examList.route.js');
const examFormRoutes = require('./examForm.route.js');
const patientSearchRoutes = require('./patientSearch.route.js');
const invoiceRoutes = require('./invoice.route.js');
const monthlyReportRoutes = require('./monthlyReport.route.js');
const regulationUpdateRoutes = require('./regulationUpdate.route.js');
const accountRoutes = require("./account.route.js")
const authRoutes = require("./auth.route.js")
const authMiddleware = require("../../middleware/admin/auth.middleware.js")

const systemConfig = require("../../config/system.js");

module.exports = (app) => { 
    const PATH_ADMIN = systemConfig.prefixAdmin;  // Tiền tố cho tất cả các route của admin

    // Các route của admin
    app.use(PATH_ADMIN + '/exam-list', examListRoutes);  // Danh sách khám bệnh
    app.use(PATH_ADMIN + '/exam-form', examFormRoutes);  // Phiếu khám bệnh
    app.use(PATH_ADMIN + '/patient-search', patientSearchRoutes);  // Tra cứu bệnh nhân
    app.use(PATH_ADMIN + '/invoice', invoiceRoutes);  // Hóa đơn thanh toán
    app.use(PATH_ADMIN + '/monthly-report', monthlyReportRoutes);  // Báo cáo tháng
    app.use(PATH_ADMIN + '/regulation-update', regulationUpdateRoutes);  // Thay đổi quy định
    app.use(PATH_ADMIN + '/account', accountRoutes);  // Quản lý tài khoản
    app.use(PATH_ADMIN + '/auth', authRoutes);  // Đăng nhập/ đăng xuất
};
