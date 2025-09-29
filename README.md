<h2>📚 Library Management System (LMS) </h2>

<strong> A full-stack Library Management System built with the MERN stack (MongoDB, Express, React, Node.js), TypeScript, and Redux Toolkit for state management. </strong>

<h2>🚀 Live Demo </h2>

<h3>🔗 LMS on Render   → <b> https://library-management-system-frontend-cm2z.onrender.com</b> </h3>

<h2>✨ Features </h2>

<h4> User Authentication → Register, login, logout with secure JWT. 

Library Card System → Every user gets a unique library card ID for borrowing/returning books.

CatalogView Page → Browse all books, search by title/author, and filter by genre with pagination.

Loan Management → Checkout available books and return them directly from the resource page.

Loan History → View all previous and current loans with status, due dates, and return logs.

Responsive UI → Built with MUI for clean and modern design.

Toast Notifications → Instant feedback for actions like login, loan, or errors. </h4>

<h2>🛠️ Tech Stack </h2>

<h4>Frontend → React 19, TypeScript, Redux Toolkit, React Router, MUI, Vite

Backend → Node.js, Express.js, MongoDB

Deployment → Render (Frontend + Backend)</h4>

<h3>🧑‍💻 Developer Setup </h3>
1. Clone the repository
git clone https://github.com/WaleedAhmedKiani/Library-Management-System.git
cd Library-Management-System

2. Backend setup
cd backend
npm install
npm run dev


Make sure to create a .env file with:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

3. Frontend setup
cd frontend
npm install
npm run dev

4. Open in browser

Visit 👉 http://localhost:5173

📌 Notes

By default, the CatalogView will fetch paginated books from backend.

Search & genre filters are integrated with backend queries.

A logged-in user with a library card can checkout and return books.

Deployment ready on Render with separate frontend + backend services.
