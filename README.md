# CodeHire – Developer Assessment Platform 🚀

Live Demo: https://code-hire-three.vercel.app

CodeHire is a full-stack MERN technical assessment platform that allows companies to evaluate developer skills through coding assignments and technical tests.

The platform enables administrators to create job roles, design coding or theoretical questions, and assign time-limited tests to candidates. Candidates can complete the tests directly in the browser using an integrated code editor and submit their solutions for review.

---

# Features

## Authentication
- User registration and login
- JWT authentication
- Role-based access control (Admin / Candidate)
- Protected routes

## Admin Features
- Create job roles
- Add coding, MCQ, and text-based questions
- Set test duration
- View candidate submissions
- Delete jobs
- Track number of submissions

## Candidate Features
- View available jobs
- Start coding tests
- Integrated code editor
- Timer-based assessment
- Submit answers
- View submitted applications

## System Features
- Role-based dashboards
- Secure API with JWT middleware
- Code editor using Monaco Editor
- Submission tracking
- Responsive UI

---

# Tech Stack

Frontend
- React
- React Router
- Axios
- Monaco Editor
- CSS

Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt

Deployment
- Frontend: Vercel
- Backend: Node.js server
- Database: MongoDB Atlas

---
# Project Structure

```
CodeHire
│
├── frontend
│   ├── components
│   ├── pages
│   ├── api
│   └── App.jsx
│
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   └── server.js
```


---

## 2 Backend Setup


cd backend
npm install


Create `.env`


MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
PORT=5000


Run backend


npm run dev or npm start


---

## 3 Frontend Setup


cd frontend
npm install


Create `.env`


VITE_API_URL=http://localhost:5000/api


Run frontend


npm run dev


---

# How the Platform Works

## Admin Flow
1. Register as Admin
2. Create job roles
3. Add questions
4. Set test duration
5. View candidate submissions

## Candidate Flow
1. Register as Candidate
2. View available jobs
3. Start coding test
4. Solve problems using code editor
5. Submit test
6. Admin reviews submissions

---

# Security

- JWT Authentication
- Protected API routes
- Role-based authorization
- Password hashing using bcrypt

---

# Future Improvements

- AI-based code evaluation
- Plagiarism detection
- Code execution sandbox
- Interview scheduling
- Email notifications
- Company analytics dashboard

---

# Author

Bikram

GitHub: https://github.com/16-Biki

---

# Live Project

https://code-hire-three.vercel.app
