# User Directory Application
React + .NET 8 Web API + SQLite

---

## 📌 Overview

This project is a small User Directory application built with:

- **Frontend:** React (Vite) – 2 pages (Add & List)
- **Backend:** .NET 8 Web API
- **Database:** SQLite (via EF Core)

The application supports full CRUD operations with proper validation, clean UI, and API integration.

---

## ✅ Features

### 🔹 Frontend

### 1️⃣ List View
- Displays all users in a table:
  - Name
  - Age
  - City
  - State
  - Pincode
- Loads data from API on mount
- Loading spinner
- Empty state message
- Error handling if API fails

### 2️⃣ Add View
Form fields:
- `name` (required, 2–100 characters)
- `age` (required, integer 0–120)
- `city` (required)
- `state` (required)
- `pincode` (required, 4–10 characters)

Behavior:
- Client-side validation with inline messages
- On successful submission:
  - Shows success toast
  - Redirects to List page
  - Newly created user is displayed

### 🔹 Navigation
- Simple top navigation bar:
  - Add
  - List

### 🔹 Styling
- Plain CSS
- Clean and minimal UI

---

## 🔹 Backend

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| GET | `/api/users/{id}` | Get user by ID |
| POST | `/api/users` | Create user |
| PUT | `/api/users/{id}` | Update user |
| DELETE | `/api/users/{id}` | Delete user |

### Backend Features
- .NET 8 Web API
- EF Core with SQLite
- DTO validation using DataAnnotations
- Proper HTTP status codes:
  - 200 OK
  - 201 Created
  - 204 NoContent
  - 400 BadRequest
  - 404 NotFound
- Swagger / OpenAPI enabled

---

## 🗂 Project Structure


user-directory/
│
├── backend/
│ └── UserDirectory.Api/
│
├── frontend/
│ └── user-directory-ui/
│
├── data/ # SQLite DB location (ignored in git)
│
└── README.md


---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- React Router
- Fetch API
- Plain CSS

### Backend
- .NET 8
- ASP.NET Core Web API
- Entity Framework Core
- SQLite
- Swashbuckle (Swagger)

---

## 🚀 How to Run Locally

### 🔹 1) Run Backend

```bash
cd backend/UserDirectory.Api
dotnet restore
dotnet run

Swagger UI:

http://localhost:<port>/swagger
🔹 2) Run Frontend

Create .env file inside:

frontend/user-directory-ui/

Add:

VITE_API_BASE_URL=http://localhost:<backend-port>

Then run:

cd frontend/user-directory-ui
npm install
npm run dev

Open:

http://localhost:5173
🗄 Database

SQLite is used for persistence.

The database file is created automatically when the backend runs.

EF Core migrations are applied automatically.

Database file is ignored from Git.

🧪 Validation
Client-side:

Field validation with inline error messages.

Server-side:

DataAnnotations validation in DTOs.

Returns structured validation responses (400).

📦 Persistence Verification

Create user

Refresh page

Data persists (SQLite file-based storage)

🤖 AI Usage Disclosure

AI tools (ChatGPT) were used to assist with scaffolding, validation structure, and development guidance.
All code was reviewed, adjusted, and tested manually.
