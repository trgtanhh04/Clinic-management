# Clinic Management System

## Overview

The Clinic Management System is designed to manage clinic operations such as patient registration, medical form handling, invoice generation, report creation, and much more. This project follows the **MVC (Model-View-Controller)** architecture, ensuring clean and organized code separation for ease of maintenance and scalability.

## Cấu trúc Thư Mục

Dưới đây là cấu trúc thư mục của dự án:

<pre>
Clinic Management
├── controllers
│   ├── admin
│   │   ├── account.controller.js
│   │   ├── auth.controller.js
│   │   ├── examForm.controller.js
│   │   ├── examList.controller.js
│   │   ├── invoice.controller.js
│   │   ├── monthlyReport.controller.js
│   │   ├── patientSearch.controller.js
│   │   └── regulationUpdate.controller.js
├── models
│   ├── patientModel.js
│   ├── medicalFormModel.js
│   ├── medicineModel.js
│   ├── invoiceModel.js
│   ├── diseaseTypeModel.js
│   ├── regulationModel.js
│   └── accountModel.js
├── routes
│   ├── admin
│   │   ├── account.router.js
│   │   ├── auth.router.js
│   │   ├── examForm.router.js
│   │   ├── examList.router.js
│   │   ├── index.route.js
│   │   ├── invoice.router.js
│   │   ├── monthlyReport.router.js
│   │   ├── patientSearch.router.js
│   │   └── regulationUpdate.router.js
├── views
│   ├── admin
├── index.js
├── package.json
└── README.md
</pre>

## Cây Phân Rã

Dưới đây là cây phân rã của hệ thống. Cây phân rã này mô tả các thành phần và mối quan hệ giữa chúng trong hệ thống quản lý bệnh viện.

![Cây phân rã]([./path/to/your/tree-image.png](https://github.com/trgtanhh04/Clinic-management/blob/main/cayphanra.png))

## Mô Hình MVC

MVC là một kiến trúc phần mềm phổ biến giúp tách biệt các thành phần trong ứng dụng. Dưới đây là mô hình MVC cho hệ thống này:

![Mô hình MVC](./path/to/your/mvc-image.png)

## Class Diagram

Dưới đây là biểu đồ lớp của các đối tượng trong hệ thống Clinic Management. Các lớp trong diagram này thể hiện các mô hình dữ liệu và các quan hệ giữa chúng.

![Class Diagram](./path/to/your/class-diagram-image.png)

## Cài Đặt và Sử Dụng

1. Clone repository này:
   ```bash
   git clone https://github.com/trgtanhh04/Clinic-management.git
