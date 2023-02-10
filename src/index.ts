import "reflect-metadata"
import fastify from "fastify"
import mercurius from "mercurius"
import { buildGqlSchema } from "./lib/buildGqlSchema"
import { buildContext } from "./lib/buildContext"

async function main() {
  const app = fastify()

  const schema = await buildGqlSchema()

  app.register(mercurius, {
    path: "/graphql",
    schema,
    context: buildContext,
    graphiql: true,
    jit: 1,
  })

  app.listen({ port: 4000 }, () => {
    console.log("Server is on http://localhost:4000/graphiql")
  })
}

main().catch(console.error)
