import { createServer } from "./infrastructure/http/express/server"

import { HelloWorld } from "./modules/test/application/use-cases/HelloWorld"
import { HelloController } from "./modules/test/infrastructure/http/HelloController"
import { testRoutes } from "./modules/test/infrastructure/http/testRoutes"

export async function createApp() {

  const app = createServer()

  //Test Module
  const helloWorld = new HelloWorld()
  const helloController = new HelloController(helloWorld)

  app.use(testRoutes(helloController))

  return app
}