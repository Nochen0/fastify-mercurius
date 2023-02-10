import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql"
import { Prisma } from "../prisma"
import { AuthInput } from "../schema/InputTypes/auth-input.type"
import { comparePasswords, createJWT, hashPassword } from "../lib/auth"
import { GraphQLError } from "graphql"

@Resolver()
export class AuthResolver {
  @Query(() => String)
  async signin(
    @Ctx("prisma") prisma: Prisma,
    @Arg("input") { username, password }: AuthInput
  ) {
    const user = await prisma.user.findUnique({ where: { username } })

    if (!user) {
      throw new GraphQLError("User not found")
    }

    const isValidPassword = await comparePasswords(password, user.password)

    if (!isValidPassword) {
      throw new GraphQLError("Wrong password or username")
    }

    return createJWT({ id: user.id, username })
  }

  @Mutation(() => String)
  async signup(
    @Ctx("prisma") prisma: Prisma,
    @Arg("input") { username, password }: AuthInput
  ) {
    const user = await prisma.user.findUnique({ where: { username } })

    if (user) {
      throw new GraphQLError("Username taken")
    }

    const createdUser = await prisma.user.create({
      data: { username, password: await hashPassword(password) },
    })
    return createJWT({ id: createdUser.id, username })
  }
}
