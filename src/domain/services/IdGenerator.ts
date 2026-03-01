/**
 * Puerto de dominio para generación de identificadores.
 * 
 * El dominio y la aplicación no deben depender de:
 * - crypto
 * - uuid
 * - librerías externas
 * 
 * La infraestructura implementará esta interfaz.
 */
export interface IdGenerator {
  generate(): string
}