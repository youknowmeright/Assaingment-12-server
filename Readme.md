# Scholarship Management System - Backend

[![Node.js](https://img.shields.io/badge/Node.js-18+-brightgreen)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-orange)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)](https://www.mongodb.com/cloud/atlas)
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)

---

## Overview

This is the backend API for the **Scholarship Management System**. It is built with **Node.js**, **Express**, and **MongoDB**, and integrates **Stripe** for payments. It supports user, scholarship, application, and review management.

---

## Features

* User CRUD and role management
* Scholarship CRUD
* Application CRUD
* Review submission and retrieval
* Stripe payment integration
* RESTful API with JSON responses
* CORS enabled

---

## Environment Setup

Create a `.env` file in the root directory with:

```env
PORT=3000
DB_USER=<your_mongodb_username>
DB_PASSWORD=<your_mongodb_password>
STRIPE_SECRET_KEY=<your_stripe_secret_key>
```

> Ensure your MongoDB user has read/write access to the database.

---

## Installation

1. Clone the repo:

```bash
git clone <your-repo-url>
cd <project-folder>
```

2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
npm start
```

> For development with auto-reload, use:

```bash
npx nodemon server.js
```

---

## API Endpoints

### Users

| Method | Endpoint                          | Description            |
| ------ | --------------------------------- | ---------------------- |
| POST   | `/users`                          | Create a new user      |
| GET    | `/users`                          | Get all users          |
| GET    | `/users/:email`                   | Get user by email      |
| GET    | `/users/admin/:email`             | Check if user is admin |
| PATCH  | `/users/request-moderator/:email` | Request moderator role |
| PATCH  | `/users/approve-moderator/:email` | Approve moderator role |

### Scholarships

| Method | Endpoint            | Description              |
| ------ | ------------------- | ------------------------ |
| GET    | `/scholarships`     | Get all scholarships     |
| GET    | `/scholarships/:id` | Get scholarship by ID    |
| POST   | `/scholarships`     | Create a new scholarship |

### Applications

| Method | Endpoint        | Description              |
| ------ | --------------- | ------------------------ |
| GET    | `/applications` | Get all applications     |
| POST   | `/applications` | Create a new application |

### Reviews

| Method | Endpoint   | Description         |
| ------ | ---------- | ------------------- |
| GET    | `/reviews` | Get all reviews     |
| POST   | `/reviews` | Create a new review |

### Payments

| Method | Endpoint                 | Description                  |
| ------ | ------------------------ | ---------------------------- |
| POST   | `/create-payment-intent` | Create Stripe payment intent |

---

## Default Route

```http
GET /
```

Response:

```
Scholarship management server is running
```

---

## Notes

* Restart the server after any changes to `.env`.
* Ensure the MongoDB Atlas cluster is accessible and network rules allow your IP.
* Use Postman or any HTTP client to test routes before connecting frontend.

---

## License

MIT License © 2025
