/**
 * Error base del sistema.
 * 
 * Permite tipar errores y diferenciar
 * entre errores controlados y fallos inesperados.
 */
export abstract class BaseError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number
  ) {
    super(message)
    this.name = this.constructor.name
  }
}