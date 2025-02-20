# Clinic Management System

## Overview

The Clinic Management System is designed to manage clinic operations such as patient registration, medical form handling, invoice generation, report creation, and much more. This project follows the **MVC (Model-View-Controller)** architecture, ensuring clean and organized code separation for ease of maintenance and scalability.

## Member information

| **No** | **Full name** | **Email** | **Role** | **Link project**|
|-------|---------------|---------|-----|-----|
| 1     | Trương Tiến Anh | truongtienanh16@gmail.com |  Back end | https://github.com/trgtanhh04/Clinic-management
| 2     | Trần Hùng Anh | tranhunganh@gmail.com | Front end | https://github.com/TranRoger/front-end.git


## Directory Structure

Below is the project folder structure:

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

## MVC Pattern

MVC is a popular software architecture that helps separate the components in an application. Here is the MVC pattern for this system:

![Mô hình MVC](https://github.com/trgtanhh04/Clinic-management/blob/main/mvc.png)

## Class Diagram

Below is a class diagram of the objects in the Clinic Management system. The classes in this diagram represent the data models and the relationships between them.
![Class Diagram](https://github.com/trgtanhh04/Clinic-management/blob/main/classdiagram.png)

## Data base

![Class Diagram](https://github.com/trgtanhh04/Clinic-management/blob/main/er.png)

