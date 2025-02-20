# Clinic Management System

## Overview

The **Clinic Management System** is designed to manage clinic operations such as patient registration, medical form handling, invoice generation, report creation, and much more. This project follows the **MVC (Model-View-Controller)** architecture, ensuring clean and organized code separation for ease of maintenance and scalability.

## Member Information

| **No** | **Full Name**      | **Email**                     | **Role**   | **Project Link** |
|--------|--------------------|-------------------------------|------------|------------------|
| 1      | Trương Tiến Anh    | truongtienanh16@gmail.com     | Backend    | [GitHub](https://github.com/trgtanhh04/Clinic-management) |
| 2      | Trần Hùng Anh      | tranhunganh@gmail.com         | Frontend   | [GitHub](https://github.com/TranRoger/front-end.git) |

---

## Features

- **Patient Management** – Create, update, and search for patient records  
- **Appointment Scheduling** – Book and manage medical appointments  
- **Billing System** – Generate invoices and process payments  
- **Monthly Reports** – Generate financial and operational reports  
- **Authentication** – Secure session-based login/logout system  
- **Regulation Management** – Update clinic rules dynamically
  
---
## Technologies Used  

- **Backend:** Node.js, Express.js, and Mongoose (MongoDB) following the **MVC pattern**.  
- **Frontend:** React and Vite, providing a **fast and interactive UI**.  
- **API Design:** RESTful APIs for **medical appointments, patient records, billing, reports, and system regulations**.  
- **Database:** MongoDB for **storing patient records, appointments, and invoices**.  
- **Authentication:** Secure **user authentication** (login, logout, registration).  
- **PDF Generation:** Automatic **invoice printing** and report generation.  
- **Data Visualization:** Display **monthly reports and statistics** for tracking clinic performance.  

---

## MVC Pattern

MVC is a popular software architecture that helps separate the components in an application. Here is the MVC pattern for this system:

<p align="center">
  <img src="https://github.com/trgtanhh04/Clinic-management/blob/main/mvc.png" width="60%" alt="MVC Pattern">
</p>

---

## Database Schema

<p align="center">
  <img src="https://github.com/trgtanhh04/Clinic-management/blob/main/er.png" width="60%" alt="Database Schema">
</p>

---

## 🎥 Video Demo

[![Watch Video](https://img.shields.io/badge/Youtube-Clinic%20Management-red?logo=youtube)](https://youtu.be/mjyDzThRdGM?si=HIIRGrxNZKDJRdgM)

---

## 📌 How to Run the Project  

### 1. Clone the Repository  
```bash
git clone https://github.com/trgtanhh04/Clinic-management.git
cd <repository-folder>
```

### 2. Install Dependencies
Run the following command to install all necessary libraries from package.json:
```bash
npm install
```

### 3.Run the Backend Server
```bash
cd backend
npm start
```

### 4. Run the Frontend App
Navigate to the Frontend folder and start the React/Vite app:
```bash
cd frontend
npm run dev
```

### 5 Access the Application
- Backend API: http://localhost:3000
- Frontend App: http://localhost:5173

