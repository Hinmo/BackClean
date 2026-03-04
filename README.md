# 🧱 BackClean

**Backend template basado en Clean Architecture**, organizado por features y listo para producción.

Diseñado para proyectos que necesitan:

- ⚡ Escalabilidad real por módulos  
- 🔄 Infraestructura intercambiable  
- 🧩 Bajo acoplamiento entre capas  
- 🚀 Preparado para entorno productivo  

---

## 🎯 Filosofía

Este template no es un boilerplate más de Node.

Está pensado como **base arquitectónica reutilizable**, priorizando:

- Separación estricta de capas
- Regla de dependencias hacia adentro
- Módulos autocontenidos por feature
- Composition Root único
- Independencia de frameworks y base de datos

---

## 🧰 Stack Base

- Node.js  
- Express (HTTP adapter)  
- TypeScript  

❌ No incluye base de datos  
❌ No incluye librería de validación  
❌ No impone ORM  

La infraestructura es reemplazable.

---

# 🏛 Arquitectura

El proyecto sigue **Clean Architecture + organización por feature**.

## 🔁 Regla de Dependencias

```
infrastructure → application → domain
```

### Reglas clave

- `domain` no conoce infraestructura  
- `application` no conoce Express  
- infraestructura implementa contratos del dominio  
- `app.ts` es el único composition root  
- `main.ts` solo arranca el servidor  

---

# 📁 Estructura del Proyecto

```bash
src/
├── main.ts              # Arranque de la aplicación
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

Servidor por defecto:

```
http://localhost:3000
```

---

# 🧪 Módulo de Ejemplo

Incluye un módulo `test` con:

```
GET /test
```

Respuesta:

```json
{
  "message": "Hello World"
}
```

Este módulo existe solo como demostración estructural.  
Puede eliminarse al iniciar un proyecto real.

---

# 🏗 Cómo Crear un Nuevo Módulo

## 📂 Estructura Recomendada

```
modules/<feature>/
  domain/
  application/
  infrastructure/
```

---

## 1️⃣ Domain

Contiene:

- Entidades  
- Interfaces de repositorio  
- Reglas puras  

⚠ No debe importar infraestructura.

Ejemplo:

```
domain/
  entities/
  repositories/
```

---

## 2️⃣ Application

Contiene:

- Casos de uso  
- Orquestación  
- Errores de aplicación  

⚠ No debe importar Express ni base de datos.

Ejemplo:

```
application/
  use-cases/
  errors/
```

---

## 3️⃣ Infrastructure

Contiene:

- Controllers HTTP  
- Routes  
- Implementaciones de repositorios  
- Adaptadores externos  

Ejemplo:

```
infrastructure/
  database/
  http/
```

---

## 4️⃣ Registrar el módulo en `app.ts`

Único lugar donde se instancian dependencias.

```ts
const productRepository = new MongoProductRepository(...)
const createProduct = new CreateProduct(productRepository)
const productController = new CreateProductController(createProduct)

app.use(productRoutes(productController))
```

🚫 Nunca instanciar infraestructura dentro de casos de uso.

---

# ⚠ Sistema de Errores

Jerarquía base:

```
BaseError
 ├─ ApplicationError
 └─ DomainError
```

Reglas:

- Todo error de negocio debe extender `BaseError`
- El middleware HTTP solo reconoce `BaseError`
- No manejar errores específicos dentro de controllers

Arquitectura limpia = manejo centralizado.

---

# ▶ Ejecutar el Proyecto

## 📦 Instalar dependencias

```bash
npm install
```

## 🛠 Desarrollo

```bash
npm run dev
```

## 🏗 Build

```bash
npm run build
```

## 🚀 Producción

```bash
npm run start
```

---

# 📏 Reglas del Template (No Romper)

❌ No importar Express en `application`  
❌ No importar infraestructura en `domain`  
❌ No instanciar repositorios dentro de casos de uso  
❌ No acoplar middleware a errores específicos  

✅ Cada módulo es autocontenido  
✅ `main.ts` solo arranca  
✅ `app.ts` es el único composition root  

---

# 🔮 Extensión Futura

El template permite agregar sin romper arquitectura:

- MongoDB / PostgreSQL / SQLite  
- Fastify u otro framework HTTP  
- Logger estructurado  
- Sistema de validación  
- Testing  

Sin modificar dominio ni casos de uso.

---

# 📌 ¿Cuándo usar este template?

✔ APIs medianas o grandes  
✔ Equipos que necesitan escalabilidad real  
✔ Proyectos donde la arquitectura importa  

❌ Microservicios triviales  
❌ APIs rápidas tipo MVP sin intención de escalar  

---

# 🎯 Objetivo del Diseño

- Modularidad real  
- Bajo acoplamiento  
- Escalabilidad por feature  
- Infraestructura reemplazable  
- Base reutilizable en múltiples proyectos  

Este template es una base arquitectónica, no una solución cerrada.

---

# 🤝 Contribuciones

Pull requests son bienvenidos.  
Si propones cambios, deben respetar la regla de dependencias.

---

# 📄 Licencia

MIT