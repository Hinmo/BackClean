import { Request, Response, NextFunction } from "express"
import { BaseError } from "../../../../shared/errors/BaseError"
import { HttpStatus } from "../../../../shared/http/HttpStatus"

/**
 * Middleware global de errores.
 *
 * Traduce errores tipados del sistema a respuestas HTTP.
 * No conoce errores específicos de módulos.
 */
export function errorMiddleware(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response {

  // Error controlado del sistema
  if (error instanceof BaseError) {
    return res.status(error.statusCode).json({
      error: error.name,
      message: error.message
    })
  }

  // Error inesperado
  return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    error: "InternalServerError",
    message: "Unexpected error"
  })
}