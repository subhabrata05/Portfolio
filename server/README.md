# Subhabrata Dey Portfolio — Backend API Documentation

High-performance, secure backend API for Subhabrata Dey's personal portfolio built with **Node.js**, **Express**, **TypeScript**, **PostgreSQL**, and **Prisma ORM**.

---

## 🛠️ Architecture & Features

- **Runtime & Framework**: Node.js (ESM NodeNext) with Express 4.
- **ORM & Database**: Prisma ORM v6 with PostgreSQL (`projects` and `contact_messages` tables).
- **Dual-Mode Persistence**: Automatically queries PostgreSQL via Prisma when `DATABASE_URL` is configured, with a resilient fallback file store (`data/store.json`) for local development without database overhead.
- **Security & Hardening**:
  - **Helmet**: Enforces `nosniff`, `SAMEORIGIN`, and standard HTTP security headers.
  - **CORS**: Origin validation matching frontend origins (`http://localhost:5173` or environment variable).
  - **Rate Limiting**: Multi-tier rate limiting with `express-rate-limit` (General: 300 req/5m, Contact: 10 submissions/15m, Auth: 15 attempts/15m).
  - **Input Sanitization**: Strips HTML tags and normalizes whitespace across all text payloads.
  - **Server-Side Authorization**: JWT-based bearer authentication (`requireAdmin`) strictly enforced on all project mutations and message management.
  - **Centralized Error Handling**: Standardized error response format and consistent HTTP status codes (`200`, `201`, `400`, `401`, `403`, `404`, `429`, `500`).

---

## 🚀 Local Setup & Configuration

### 1. Environment Variables
Create a `.env` file in the `server/` directory (copied from `.env.example`):

```bash
cp .env.example .env
```

Configurable variables:
| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `PORT` | Port for the backend Express server | `5000` |
| `NODE_ENV` | Environment mode (`development` / `production`) | `development` |
| `CLIENT_ORIGIN` | Allowed frontend origin(s) for CORS | `http://localhost:5173` |
| `ADMIN_PASSWORD` | Password for the protected Admin Studio | `subhabrata_secure_admin_2026` |
| `JWT_SECRET` | Secret key used to sign and verify admin JWTs | `super_secret_jwt_portfolio_key_998877665544` |
| `DATABASE_URL` | PostgreSQL connection URL (Neon, Supabase, local) | `postgresql://user:pass@localhost:5432/portfolio_db?schema=public` |

> [!NOTE]
> For cloud hosting (e.g. Neon, Supabase, Render), set `DATABASE_URL` to your connection string with `?sslmode=require`.

### 2. Database Migrations & Client Generation
Run Prisma client generation and deploy migrations:

```bash
# Generate Prisma Client
npm run prisma:generate

# Apply migrations to PostgreSQL (when DATABASE_URL is reachable)
npx prisma migrate deploy

# Run the safe seed script with clearly fictional sample projects
npm run prisma:seed
```

### 3. Running the Server

```bash
# Development mode with hot reload
npm run dev

# Production build and run
npm run build
npm start
```

---

## 📋 API Endpoints Reference

### Public Endpoints

#### 1. `GET /api/health`
Checks server health, uptime, and operational status.
- **Status**: `200 OK`
- **Response**:
```json
{
  "status": "ok",
  "timestamp": "2026-10-09T16:50:00.000Z",
  "service": "Subhabrata Dey Portfolio Backend API",
  "uptime": 120.5
}
```

#### 2. `GET /api/projects`
Retrieves all published portfolio projects.
- **Status**: `200 OK`
- **Query Parameters (optional)**:
  - `category` (string): Filter by project category (e.g., `Web Development`, `App Development`, `AI & ML`).
  - `search` (string): Search query across title, description, and summary.
  - `featured` (boolean string: `true` | `false`): Filter featured highlights.
  - `limit` (integer, max 50): Page size (default: 20).
  - `page` (integer): Page number (default: 1).
- **Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "proj-1",
      "title": "Cinematic 3D Portfolio Platform",
      "slug": "cinematic-3d-portfolio",
      "summary": "High-performance WebGL interactive digital space...",
      "description": "An exploratory personal digital portfolio...",
      "technologies": ["React", "TypeScript", "Three.js", "React Three Fiber", "GSAP", "Tailwind CSS", "Prisma"],
      "imageUrls": ["/assets/projects/portfolio-3d.webp"],
      "featured": true,
      "published": true,
      "githubUrl": "https://github.com/...",
      "liveDemoUrl": "https://subhabratadey.dev",
      "sortOrder": 0
    }
  ],
  "pagination": { "page": 1, "limit": 20, "count": 1 }
}
```

#### 3. `GET /api/projects/:slug`
Retrieves a single published project by its unique URL slug.
- **Status**: `200 OK` (or `404 Not Found` if unpublished or nonexistent)
- **Response**:
```json
{
  "success": true,
  "data": {
    "id": "proj-1",
    "title": "Cinematic 3D Portfolio Platform",
    "slug": "cinematic-3d-portfolio",
    ...
  }
}
```

#### 4. `POST /api/contact`
Submits a contact form message. Protected by spam rate limiter (`10 requests / 15 minutes`).
- **Status**: `201 Created`
- **Request Body**:
```json
{
  "senderName": "Jane Doe",
  "email": "jane@example.com",
  "subject": "Collaboration Opportunity",
  "message": "Hello Subhabrata, interested in discussing a creative technology project with you."
}
```
*(Accepts either `senderName` or `name` for backwards client compatibility)*
- **Response**:
```json
{
  "success": true,
  "message": "Your message has been successfully recorded. Thank you for reaching out!",
  "data": {
    "id": "msg-1791564720383-17ldy",
    "senderName": "Jane Doe",
    "createdAt": "2026-10-09T16:52:00.383Z"
  }
}
```

---

### Admin Endpoints (Protected by JWT)

All admin routes require an `Authorization: Bearer <TOKEN>` header obtained via `POST /api/auth/login`.

#### 1. `POST /api/auth/login`
Authenticates the portfolio owner. Rate-limited against brute force (15 attempts / 15 min).
- **Request Body**: `{ "password": "subhabrata_secure_admin_2026" }`
- **Status**: `200 OK`
- **Response**:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { "name": "Subhabrata Dey", "role": "admin" }
}
```

#### 2. `GET /api/admin/projects`
Returns all projects (both published and draft items) plus overview metrics.
- **Status**: `200 OK`
- **Response**:
```json
{
  "success": true,
  "data": [ ... ],
  "metrics": {
    "total": 4,
    "published": 4,
    "drafts": 0,
    "featured": 3
  }
}
```

#### 3. `POST /api/admin/projects`
Creates a new project record.
- **Status**: `201 Created`
- **Request Body**:
```json
{
  "title": "New System Project",
  "category": "Web Development",
  "summary": "High-throughput data streaming tool",
  "description": "Full technical breakdown of the streaming pipeline...",
  "technologies": ["Node.js", "Redis", "WebSockets"],
  "imageUrls": ["/assets/projects/system.webp"],
  "featured": false,
  "published": true
}
```

#### 4. `PUT /api/admin/projects/:id`
Updates an existing project record.
- **Status**: `200 OK`

#### 5. `PATCH /api/admin/projects/:id/publish`
Toggles publication status between draft and public.
- **Status**: `200 OK`
- **Request Body**: `{ "published": false }` (or omitted to toggle)

#### 6. `DELETE /api/admin/projects/:id`
Deletes a project record.
- **Status**: `200 OK`

#### 7. `GET /api/admin/messages`
Retrieves all incoming contact messages ordered by timestamp descending.
- **Status**: `200 OK`

#### 8. `PATCH /api/admin/messages/:id/status`
Updates status (`unread`, `read`, or `archived`).
- **Status**: `200 OK`
- **Request Body**: `{ "status": "read" }`

#### 9. `DELETE /api/admin/messages/:id`
Deletes a message from the inbox.
- **Status**: `200 OK`

---

## 🛡️ Centralized Error Response Format

All error responses adhere to a uniform JSON schema:

```json
{
  "success": false,
  "message": "Human-readable description of error",
  "error": {
    "code": "VALIDATION_ERROR | NOT_FOUND | UNAUTHORIZED | FORBIDDEN | RATE_LIMIT_EXCEEDED | INTERNAL_SERVER_ERROR",
    "message": "Human-readable description",
    "details": { ... }
  }
}
```
