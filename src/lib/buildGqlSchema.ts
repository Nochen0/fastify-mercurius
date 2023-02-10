import { GraphQLSchema } from "graphql"
import { buildSchema } from "type-graphql"
import { customAuthChecker } from "./auth-checker"
import { AuthResolver } from "../resolvers/auth.resolver"
import { TodoResolver } from "../resolvers/todo.resolver"

export async function buildGqlSchema(): Promise<GraphQLSchema> {
  return await buildSchema({
    resolvers: [AuthResolver, TodoResolver],
    authChecker: customAuthChecker,
  })
}
