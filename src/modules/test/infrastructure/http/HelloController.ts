import { Request, Response, NextFunction } from "express"
import { HelloWorld } from "../../application/use-cases/HelloWorld"

export class HelloController {
  constructor(private readonly helloWorld: HelloWorld) {}

  handle(_req: Request, res: Response, next: NextFunction) {
    try {
      const result = this.helloWorld.execute()
      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }
}