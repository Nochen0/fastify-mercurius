import { FastifyReply, FastifyRequest } from "fastify"
import Context from "../graphql-context"
import prisma from "../prisma"

export const buildContext = async (
  req: FastifyRequest,
  _reply: FastifyReply
): Promise<Context> => {
  return {
    token: req.headers.authorization,
    prisma,
  }
}
