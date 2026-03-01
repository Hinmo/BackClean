import { randomUUID } from "crypto"
import { IdGenerator } from "../../domain/services/IdGenerator"

/**
 * Implementación concreta del puerto IdGenerator.
 * 
 * Infraestructura decide usar crypto de Node.
 */
export class CryptoIdGenerator implements IdGenerator {
  generate(): string {
    return randomUUID()
  }
}