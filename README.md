# MUJ SDC Task Manager

A login system with role-based access control built with Node.js, PostgreSQL, and Prisma ORM.

## Tech Stack
- Node.js + Express
- PostgreSQL + Prisma ORM
- EJS Templates
- bcrypt for password hashing

## Features
- Login with email/password authentication
- Role-based access (Supervisor, Manager, HR, Employee)
- Admins can view all employees' tasks
- Employees can only view their own tasks

## Setup

```bash
npm install
npx prisma migrate dev
npm run seed
npm run dev
```

Open http://localhost:3000/login

## Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Supervisor | supervisor@mujsdc.in | password123 |
| Employee | shashwat@mujsdc.in | password123 |
| Employee | shivansh@mujsdc.in | password123 |
