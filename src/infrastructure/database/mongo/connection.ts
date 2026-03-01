// src/infrastructure/database/mongo/connection.ts

import { MongoClient } from "mongodb"

/**
 * Cliente interno de MongoDB.
 * Se inicializa una sola vez durante el bootstrap.
 */
let client: MongoClient | null = null

/**
 * Inicializa la conexión con MongoDB.
 * 
 * Debe llamarse una sola vez en main.ts
 */
export async function connectMongo(uri: string): Promise<void> {
  client = new MongoClient(uri)
  await client.connect()
}

/**
 * Devuelve el cliente activo.
 * Solo debe usarse dentro de infraestructura.
 */
export function getMongoClient(): MongoClient {
  if (!client) {
    throw new Error("Mongo client not initialized")
  }

  return client
}