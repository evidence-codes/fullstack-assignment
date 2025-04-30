# Department Management API

This project is a GraphQL API for managing departments and sub-departments. It supports authentication, pagination, and CRUD operations on departments and their sub-departments.

---

## 🛠 Tech Stack

- **Node.js**
- **GraphQL** (Apollo Server)
- **PostgreSQL**
- **Prisma ORM**
- **JWT Authentication**
- **Deployed on**: [Render](https://render.com)

---

## 🚀 Hosted API

You can access the deployed API at:  
🔗 [https://fullstack-assignment-ijo0.onrender.com/graphql](https://fullstack-assignment-ijo0.onrender.com/graphql)

---

## 🌐 Frontend

🔗 [https://department-management.netlify.app/](https://department-management.netlify.app/)

---

## ⚙️ Getting Started Locally

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Environment Variables

Create a .env file in the root directory:

```bash
DATABASE_URL=postgresql://user:password@localhost:5432/your_db
JWT_SECRET=your_jwt_secret
```

### 4. Start the Server

```bash
npm run start:dev
```

Server will run at: http://localhost:3000/graphql

---

## 🔐 Authentication

Use the login mutation to obtain a JWT token.
Pass the token in the Authorization header for secured routes:

```bash
Authorization: Bearer <your_token>
```

## 🔎 Example Queries & Mutations

### ✅ Login

```bash
mutation {
  login(input: { username: "admin", password: "admin123" })
}
```

### 📁 Create Department

```bash
mutation {
  createDepartment(input: {
    name: "Engineering"
    subDepartments: [{ name: "Backend" }, { name: "Frontend" }]
  }) {
    id
    name
    subDepartments {
      id
      name
    }
  }
}
```

### ✏️ Update Department

```bash
mutation {
  updateDepartment(id: 1, name: "Product Engineering") {
    id
    name
  }
}
```

### ❌ Delete Department

```bash
mutation {
  deleteDepartment(id: 1)
}
```

### 📄 Get Paginated Departments

```bash
query {
  getDepartments(page: 1, limit: 10) {
    totalItems
    totalPages
    currentPage
    items {
      id
      name
      subDepartments {
        id
        name
      }
    }
  }
}
```

### ➕ Create SubDepartment

```bash
mutation {
  createSubDepartment(departmentId: 1, name: "DevOps") {
    id
    name
  }
}
```

### ✏️ Update SubDepartment

```bash
mutation {
  updateSubDepartment(id: 3, name: "CloudOps") {
    id
    name
  }
}
```

### ❌ Delete SubDepartment

```bash
mutation {
  deleteSubDepartment(id: 3)
}
```

---

## 🧪 Testing

You can test the API via:

- GraphQL Playground at /graphql

- Postman (use POST requests to /graphql)

- Frontend UI

---

## ✨ Bonus Features

- JWT-based authentication

- Pagination support for departments

- Sub-department nesting in createDepartment mutation

- Type-safe GraphQL schema

---

## 📜 License

MIT License © 2025 Evidence Adejuwon
