import Context from "../graphql-context"
import { AuthChecker } from "type-graphql"
import { verifyJWT } from "./auth"

export const customAuthChecker: AuthChecker<Context> = ({
  root,
  args,
  context,
  info,
}) => {
  if (!context.token) {
    return false
  }

  try {
    verifyJWT(context.token)
  } catch {
    return false
  }

  return true
}
