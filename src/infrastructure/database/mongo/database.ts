// src/infrastructure/database/mongo/database.ts

import { Db } from "mongodb"
import { getMongoClient } from "./connection"

/**
 * Devuelve la instancia de base de datos.
 * 
 * Centraliza el acceso al nombre de la base.
 */
export function getDatabase(dbName: string): Db {
  const client = getMongoClient()
  return client.db(dbName)
}