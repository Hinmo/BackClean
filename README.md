# 🧱 BackClean

> Backend template based on Clean Architecture, feature-based and production-ready.

<p align="left">
  <img src="https://img.shields.io/badge/node-%3E%3D18-green" />
  <img src="https://img.shields.io/badge/typescript-%5E5-blue" />
  <img src="https://img.shields.io/badge/architecture-clean-orange" />
  <img src="https://img.shields.io/badge/license-MIT-lightgrey" />
</p>

---

BackClean is an architectural base for building scalable Node.js APIs without coupling domain logic to frameworks or infrastructure.

Designed for projects that require:

- ⚡ True feature-based modularity  
- 🔄 Replaceable infrastructure  
- 🧩 Low coupling  
- 🏗 Strict layer separation  
- 🚀 Production-ready  

---

## 🎯 Philosophy

This is not just another Node boilerplate.

BackClean provides a **reusable architectural foundation**, prioritizing:

- Strict separation of layers  
- Dependency rule pointing inwards  
- Self-contained feature modules  
- Single composition root  
- Framework and database independence  

---

## 🧰 Base Stack

- Node.js  
- Express (HTTP adapter)  
- TypeScript  

❌ No database included  
❌ No validation library included  
❌ No enforced ORM  

The infrastructure is fully replaceable.

---

# 🏛 Architecture

The project follows **Clean Architecture + feature-based organization**.

## 🔁 Dependency Rule

```
infrastructure → application → domain
```

### Key Rules

- `domain` does not know infrastructure  
- `application` does not know Express  
- Infrastructure implements domain contracts  
- `app.ts` is the only composition root  
- `main.ts` only boots the server  

---

# 📁 Project Structure

```bash
src/
├── main.ts              # Application entry
├── app.ts               # Composition root (wiring)
│
├── modules/
│   └── test/
│       ├── application/
│       │   └── use-cases/
│       │       └── HelloWorld.ts
│       │
│       ├── infrastructure/
│       │   └── http/
│       │       ├── HelloController.ts
│       │       └── testRoutes.ts
│       │
│       └── domain/
│
├── infrastructure/
│   └── http/
│       └── express/
│           ├── server.ts
│           └── middlewares/
│               └── errorMiddleware.ts
│
└── shared/
    ├── errors/
    │   ├── BaseError.ts
    │   ├── ApplicationError.ts
    │   └── DomainError.ts
    │
    └── http/
        └── HttpStatus.ts
```

---

# 🚀 Quick Start

```bash
git clone https://github.com/Hinmo/BackClean.git
cd BackClean
npm install
npm run dev
```

Default server:

```
http://localhost:3000
```

---

# 🧪 Example Module

Includes a `test` module with:

```
GET /test
```

Response:

```json
{
  "message": "Hello World"
}
```

This module exists purely to demonstrate structure and can be removed for real projects.

---

# 🏗 Creating a New Module

## 📂 Recommended Structure

```
modules/<feature>/
  domain/
  application/
  infrastructure/
```

---

## 1️⃣ Domain

Contains:

- Entities  
- Repository interfaces  
- Pure business rules  

⚠ Must not import infrastructure.

Example:

```
domain/
  entities/
  repositories/
```

---

## 2️⃣ Application

Contains:

- Use cases  
- Orchestration  
- Application errors  

⚠ Must not import Express or database.

Example:

```
application/
  use-cases/
  errors/
```

---

## 3️⃣ Infrastructure

Contains:

- HTTP controllers  
- Routes  
- Repository implementations  
- External adapters  

Example:

```
infrastructure/
  database/
  http/
```

---

## 4️⃣ Register Module in `app.ts`

Only place where dependencies are instantiated:

```ts
const productRepository = new MongoProductRepository(...)
const createProduct = new CreateProduct(productRepository)
const productController = new CreateProductController(createProduct)

app.use(productRoutes(productController))
```

🚫 Never instantiate infrastructure inside use cases.

---

# ⚠ Error Handling System

Base hierarchy:

```
BaseError
 ├─ ApplicationError
 └─ DomainError
```

Rules:

- All business errors must extend `BaseError`  
- HTTP middleware only recognizes `BaseError`  
- Do not handle specific errors inside controllers  

Centralized error handling preserves clean architecture.

---

# ▶ Running the Project

## 📦 Install dependencies

```bash
npm install
```

## 🛠 Development

```bash
npm run dev
```

## 🏗 Build

```bash
npm run build
```

## 🚀 Production

```bash
npm run start
```

---

# 📏 Template Rules (Do Not Break)

❌ Do not import Express in `application`  
❌ Do not import infrastructure in `domain`  
❌ Do not instantiate repositories inside use cases  
❌ Do not couple middleware to specific errors  

✅ Each module is self-contained  
✅ `main.ts` only boots the server  
✅ `app.ts` is the only composition root  

---

# 🔮 Future Extensions

Template allows adding without breaking architecture:

- MongoDB / PostgreSQL / SQLite  
- Fastify or other HTTP frameworks  
- Structured logging  
- Validation system  
- Testing  

No modification of domain or use cases required.

---

# 📌 When to Use This Template

✔ Medium or large APIs  
✔ Teams requiring real scalability  
✔ Projects where architecture matters  

❌ Tiny microservices  
❌ Quick MVP APIs without scaling needs  

---

# 🎯 Design Goal

- Real modularity  
- Low coupling  
- Feature-based scalability  
- Replaceable infrastructure  
- Reusable base for multiple projects  

This template is an **architectural foundation**, not a closed solution.

---

# 🤝 Contributions

Pull requests are welcome.  
Proposed changes must respect the dependency rule.

---

# 📄 License

MIT