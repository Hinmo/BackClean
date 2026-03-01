import { BaseError } from "./BaseError"

/**
 * Error de caso de uso.
 * Permite definir distintos códigos HTTP.
 */
export class ApplicationError extends BaseError {
  constructor(message: string, statusCode = 400) {
    super(message, statusCode)
  }
}