# Clinic Management System

## Overview

The Clinic Management System is designed to manage clinic operations such as patient registration, medical form handling, invoice generation, report creation, and much more. This project follows the **MVC (Model-View-Controller)** architecture, ensuring clean and organized code separation for ease of maintenance and scalability.

## Member information

| **No** | **Full name** | **Email** | **Role** | **Link project**|
|-------|---------------|---------|-----|-----|
| 1     | Trương Tiến Anh | truongtienanh16@gmail.com |  Backend  | https://github.com/trgtanhh04/Clinic-management
| 2     | Trần Hùng Anh | tranhunganh@gmail.com | Frontend | https://github.com/TranRoger/front-end.git

## Features

- **Patient Management** – Create, update, and search for patient records  
- **Appointment Scheduling** – Book and manage medical appointments  
- **Billing System** – Generate invoices and process payments  
- **Monthly Reports** – Generate financial and operational reports  
- **Authentication** – Session-based login/logout system  
- **Regulation Management** – Update clinic rules dynamically  

## MVC Pattern

MVC is a popular software architecture that helps separate the components in an application. Here is the MVC pattern for this system:

![Mô hình MVC](https://github.com/trgtanhh04/Clinic-management/blob/main/mvc.png)

## Data base

![Class Diagram](https://github.com/trgtanhh04/Clinic-management/blob/main/er.png)

## Video demo

[Youtube](https://youtu.be/mjyDzThRdGM?si=HIIRGrxNZKDJRdgM)

## How to Run the Project  

### 1️. Clone the Repository  
```bash
git clone <repository-url>
cd <repository-folder>
```
### 2. Install Dependencies
All required libraries are listed in library.txt. Run the command below to install:
```bash
xargs npm install < library.txt
If using yarn, use: xargs yarn add < library.txt
```

### 3.Run the Backend Server
```bash
cd <repository-folder>
npm start
```

### 4. Run the Frontend App
Navigate to the Frontend folder and start the React/Vite app:
```bash
cd <repository-folder>
npm run dev
```

### 5 Access the Application
- Backend API: http://localhost:3000
- Frontend App: http://localhost:5173

