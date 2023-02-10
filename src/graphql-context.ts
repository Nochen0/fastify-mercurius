import { Prisma } from "./prisma"

type Context = {
  token: string | undefined
  prisma: Prisma
}

export default Context
