import { BaseError } from "./BaseError"

/**
 * Error de reglas de dominio.
 * Siempre representa error 400.
 */
export class DomainError extends BaseError {
  constructor(message: string) {
    super(message, 400)
  }
}