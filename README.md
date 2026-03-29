# 🚀 Full Stack Task Manager (Backend + Frontend)

## 📌 Project Overview

This project is a simple full-stack application that includes:

* User Authentication (Register & Login)
* Role-based structure (user/admin ready)
* CRUD operations for tasks
* Protected APIs using JWT
* Basic frontend to interact with APIs

---

## 🛠️ Tech Stack

**Backend:**

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* bcrypt (password hashing)

**Frontend:**

* React (Vite)
* Fetch API

---

## ⚙️ Setup Instructions

### 🔹 Backend Setup

```bash
cd backend
npm install
node app.js
```

Server runs on:

```
http://localhost:5000
```

---

### 🔹 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 🔐 API Endpoints

### Auth APIs

* POST `/api/v1/auth/register` → Register user
* POST `/api/v1/auth/login` → Login user

### Task APIs (Protected)

* GET `/api/v1/tasks` → Get all user tasks
* POST `/api/v1/tasks` → Create task
* PUT `/api/v1/tasks/:id` → Update task
* DELETE `/api/v1/tasks/:id` → Delete task

---

## 🔑 Authentication

* JWT token is returned on login
* Token must be sent in headers:

```
Authorization: <token>
```

---

## 🧪 Features

* Secure password hashing using bcrypt
* JWT-based authentication
* User-specific task management
* Basic validation and error handling
* Clean and modular backend structure

---

## 📈 Scalability Notes

* Modular architecture allows easy expansion into microservices
* JWT enables stateless authentication for scaling
* Can integrate Redis for caching frequently accessed data
* Load balancing can be added for handling high traffic
* Database indexing can improve query performance

---

## 📌 Future Improvements

* Add role-based admin features
* Improve UI/UX design
* Add pagination for tasks
* Add logging and monitoring

---

## 👨‍💻 Author

Esha Lokhande
