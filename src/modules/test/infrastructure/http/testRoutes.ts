import { Router } from "express"
import { HelloController } from "./HelloController"

export function testRoutes(controller: HelloController) {
  const router = Router()

  router.get("/test", controller.handle.bind(controller))

  return router
}