# Lawyereddit

Lawyereddit is a full-stack discussion platform inspired by Reddit, focused on structured, threaded conversations and secure user interactions.  
This project is currently under active development.

## Features
- JWT-based authentication (signup, login, protected routes)
- Role-based ownership and authorization
- Threaded posts and nested comments (parent–child model)
- Pagination for posts and replies
- RESTful API built with Node.js, Express, and MongoDB

## Tech Stack
**Backend**
- Node.js
- Express
- MongoDB
- Mongoose
- JWT Authentication

**Frontend (In Progress)**
- React (Vite)

## Project Structure

lawyereddit

├── server/ # Backend (Express + MongoDB)

└── client/ # Frontend (React + Vite) 

## Getting Started (Backend)
cd server
npm install
npm run dev


Create a `.env` file:
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret


