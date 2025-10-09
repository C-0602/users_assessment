# 🧱 NestJS Users Module Assessment

A clean, scalable NestJS backend implementing CRUD operations for a Users module with in-memory data, role-based access control, and permission guards — built following industry-standard architecture and SOLID principles.

# 🧩 Overview

This project demonstrates a production-ready NestJS design for handling CRUD resources with complete validation and access control.
It uses:

- Predefined data for Users, Groups, Roles, and Permissions.

- A PermissionGuard that validates every request via the Authorization header.

- DTO validation with global pipes.

- Full test coverage (94 %) under Jest.

The purpose of this assessment is to highlight architectural understanding, modular design, TypeScript proficiency, and backend craftsmanship through a concise and maintainable NestJS codebase.

🚀 Key Features

✅ CRUD APIs (/users)
✅ Role-Based Access Control (RBAC)
✅ @Permissions() custom decorator
✅ Global DTO validation
✅ In-memory repository (no DB dependency)
✅ 94 % test coverage (unit + integration)
✅ Ready-made Postman Collection
✅ Scalable folder structure & SOLID design

⚙️ Tech Stack
Layer	Technology
Framework	NestJS v10 + TypeScript
Validation	Class-validator / DTO Pipes
Testing	Jest + Supertest
Architecture	Modular / Layered / SOLID
Storage	In-Memory Repository
Documentation	Postman Collection + README Guide

# 🏗️ Architecture Overview

Below is the directory structure showing modular design and separation of concerns.

src/
 ├── app.module.ts
 ├── main.ts
 ├── common/
 │   ├── constants/        # roles, groups, permissions
 │   ├── decorators/       # @Permissions() decorator
 │   ├── guards/           # PermissionGuard for RBAC
 │   └── interfaces/       # shared types & permission models
 └── users/
     ├── dto/              # create/update DTOs
     ├── entities/         # User entity model
     ├── repo/             # in-memory repository for CRUD ops
     ├── store/            # predefined user, role, and group data
     ├── users.controller.ts
     ├── users.service.ts
     └── users.module.ts

## 🧠 Design Highlights
🧱 SOLID Principles

Single Responsibility — Each class handles a single purpose (service vs controller vs repo).

Open/Closed — Easily extensible to real DB integrations.

Liskov Substitution — Interfaces abstract the underlying storage.

Interface Segregation — DTOs and entities are cleanly separated.

Dependency Inversion — Services depend on abstractions, not implementations.

## 🧩 Modular Architecture

Every module is self-contained, promoting scalability and testability.

Common utilities (guards, decorators, constants) are reusable across future modules.

## 🛡️ Security and RBAC

PermissionGuard ensures fine-grained route-level authorization.

Authorization header tokens map to pre-configured role → permission mappings.

Unauthorized access returns standardized 403 responses.

## 🧪 Testing & Coverage

Unit tests for services, guards, and decorators.

Integration tests for all CRUD endpoints using Supertest.

Coverage achieved: 94 %

Example command:

npm run test:cov


Sample Output:

- PASS src/users/users.service.spec.ts
- PASS src/users/users.controller.spec.ts
- Test Suites: 2 passed, 2 total
- Coverage summary:
Statements: 94%
Branches:   91%
Functions:  95%
Lines:      94%

### 📬 Example Endpoints
Method	Endpoint	Description
GET	/users	Get all users
GET	/users/:id	Get user by ID
POST	/users	Create a new user
PUT	/users/:id	Update user details
DELETE	/users/:id	Delete a user

Each endpoint is protected by the PermissionGuard, validating the token’s associated role and permission before execution.

🔐 Example Usage
Header
Authorization: Bearer admin-token

Create User Request
POST /users
{
  "name": "Alice",
  "email": "alice@example.com",
  "role": "Manager",
  "group": "HR"
}

Response
{
  "message": "User created successfully",
  "data": {
    "id": "3",
    "name": "Alice",
    "role": "Manager"
  }
}

🧰 Setup Instructions
# Install dependencies
npm install

# Run the project
npm run start:dev

# Run tests
npm test


Project runs at:
👉 http://localhost:3000/users


👩‍💻 Author

Chhavi Deshlahra
Backend Engineer @ Ericsson | NestJS | GraphQL | Azure | Clean Architecture
- [LinkedIn Profile](https://www.linkedin.com/in/chhavi-deshlahra/)
- GitHub Repo