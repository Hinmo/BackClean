import "dotenv/config"
import { createApp } from "./app"

async function bootstrap() {
  const app = await createApp()

  app.listen(3000, () => {
    console.log("Server running on http://localhost:3000")
  })
}

bootstrap()