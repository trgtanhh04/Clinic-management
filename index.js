const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const methodOverride = require('method-override');
var path = require('path');
const moment = require('moment');
const { StatusCodes, getReasonPhrase } = require('http-status-codes'); // Thêm http-status-codes


// Tải biến môi trường
require('dotenv').config();

//Dung cookies
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173', // URL của frontend
    credentials: true, // Cho phép gửi cookie
}));


// Nhập và cấu hình cơ sở dữ liệu
const database = require("./config/database.js");
database.connect(); // Kết nối với cơ sở dữ liệu

// Nhập cấu hình
const systemConfig = require("./config/system.js");

// Nhập các route
const routeAdmin = require("./routes/admin/index.route.js");


// Middleware để xử lý dữ liệu JSON được gửi trong body của request
app.use(bodyParser.json());

// App local variable
app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.locals.moment = moment;

// Định nghĩa các route
routeAdmin(app);

// Khởi động server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
