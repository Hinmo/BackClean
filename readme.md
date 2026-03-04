🧱 Backend Template — Clean Architecture (Feature-Based)

Template backend base organizado por módulos y siguiendo principios de Clean Architecture.

🎯 Este proyecto está diseñado para:

✅ Servir como base reutilizable

✅ Permitir escalar por features

✅ Mantener desacoplamiento entre capas

✅ No imponer base de datos ni herramientas específicas

✅ Facilitar el reemplazo de infraestructura (HTTP, DB, etc.)

🧰 Stack base

Node.js

Express (adapter HTTP)

TypeScript

No incluye base de datos ni validación por defecto.

🏛 Arquitectura

El proyecto sigue separación por feature (módulo), manteniendo capas internas.

🔁 Regla de dependencias

Las dependencias siempre apuntan hacia adentro:

infrastructure → application → domain
Reglas clave:

domain no conoce infraestructura

application no conoce Express

Infraestructura implementa contratos del dominio

app.ts compone dependencias (composition root)

main.ts solo arranca el servidor

📁 Estructura del proyecto
src/
│
├── main.ts              # Arranque de la aplicación
├── app.ts               # Composition root (wiring)
│
├── modules/
│   └── test/            # Módulo de ejemplo mínimo
│       ├── application/
│       │   └── use-cases/
│       │       └── HelloWorld.ts
│       │
│       ├── infrastructure/
│       │   └── http/
│       │       ├── HelloController.ts
│       │       └── testRoutes.ts
│       │
│       └── domain/      # (Opcional, según necesidad)
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
🧪 Módulo de ejemplo

El módulo test incluye un endpoint:

GET /test
Respuesta:
{
  "message": "Hello World"
}

Este módulo existe únicamente para demostrar la estructura.
Puede eliminarse al iniciar un proyecto real.

🏗 Cómo crear un nuevo módulo
📂 Estructura recomendada
modules/<feature>/
  domain/
  application/
  infrastructure/
1️⃣ Crear estructura

Ejemplo: módulo product

modules/product/
  domain/
  application/
  infrastructure/
2️⃣ Domain

Contiene:

Entidades

Interfaces de repositorio

Reglas puras

⚠ No debe importar nada de infraestructura.

Ejemplo:

domain/
  entities/
  repositories/
3️⃣ Application

Contiene:

Casos de uso

Orquestación de reglas

Errores de aplicación

⚠ No debe importar Express ni base de datos.

Ejemplo:

application/
  use-cases/
  errors/
4️⃣ Infrastructure

Contiene:

Implementaciones técnicas

Controllers HTTP

Routes

Implementaciones de repositorios

Ejemplo:

infrastructure/
  database/
  http/
5️⃣ Registrar el módulo en app.ts

El único lugar donde se instancian dependencias es app.ts.

const productRepository = new MongoProductRepository(...)
const createProduct = new CreateProduct(productRepository)
const productController = new CreateProductController(createProduct)

app.use(productRoutes(productController))

🚫 Nunca instanciar infraestructura dentro de casos de uso.

⚠ Sistema de errores
Jerarquía base
BaseError
 ├─ ApplicationError
 └─ DomainError
Reglas

Todo error de negocio debe extender BaseError

El middleware HTTP solo reconoce BaseError

No manejar errores específicos dentro de controllers

▶ Ejecutar el proyecto
📦 Instalar dependencias
npm install
🛠 Desarrollo
npm run dev
🏗 Build
npm run build
🚀 Producción
npm run start

Servidor por defecto:

http://localhost:3000
📏 Reglas del template (no romper)

❌ No importar Express en application

❌ No importar infraestructura en domain

❌ No acoplar middleware a errores específicos

❌ No instanciar repositorios dentro de casos de uso

✅ Cada módulo debe ser autocontenido

✅ main.ts solo arranca

✅ app.ts es el único composition root

🔮 Extensión futura

El template permite agregar:

Base de datos (Mongo, PostgreSQL, SQLite, etc.)

Framework HTTP alternativo (Fastify, por ejemplo)

Logger estructurado

Sistema de validación

Testing

Sin modificar el dominio ni los casos de uso.

🎯 Objetivo del diseño

Modularidad real

Bajo acoplamiento

Escalabilidad por feature

Infraestructura reemplazable

Base reutilizable en múltiples proyectos

Este template representa una base arquitectónica, no una solución cerrada.

✅ Production Checklist
1️⃣ Compilación limpia
npm run build

Debe:

Generar dist/

No tener errores TypeScript

Mantener estructura correcta

✔ Obligatorio antes de cualquier deploy.

2️⃣ Arranque desde código compilado
npm run start

Verificar:

El servidor levanta correctamente

Rutas funcionan

No hay errores de path

No dependes de tsx

✔ Simulación real de producción.

3️⃣ Variables de entorno

Confirmar que:

process.env.PORT funciona

process.env.NODE_ENV funciona

No dependes obligatoriamente de .env

Ejemplo recomendado en main.ts:

const port = process.env.PORT || 3000

✔ No hardcodear puertos.

4️⃣ .gitignore correcto

Debe contener:

node_modules/
.env
dist/

✔ Nunca subir:

node_modules

archivos sensibles

código compilado

5️⃣ package.json limpio

Verificar:

typescript en devDependencies

No dependencias innecesarias

"private": true

Scripts correctos: dev, build, start

✔ Sin basura técnica.

6️⃣ Manejo centralizado de errores

Confirmar:

Middleware global de errores activo

No hay try/catch innecesarios en controllers

Errores del dominio no dependen de Express

✔ Arquitectura intacta.

7️⃣ Separación real de capas

Confirmar:

domain no importa infraestructura

application no importa Express

app.ts es el único composition root

✔ No romper Clean Architecture.

8️⃣ Sin dependencias de desarrollo en producción

En un entorno real se ejecutaría:

npm install --production
npm run build
npm run start

Si eso funciona, estás listo para producción 🚀