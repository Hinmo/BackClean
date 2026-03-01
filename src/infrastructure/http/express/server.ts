// src/infrastructure/http/express/server.ts

import express from "express"
import { errorMiddleware } from "./middlewares/errorMiddleware"

/**
 * Crea la instancia base del servidor Express.
 * No conoce casos de uso ni controladores concretos.
 */
export function createServer() {
  const app = express()

  app.use(express.json())

  app.use(errorMiddleware)

  return app
}