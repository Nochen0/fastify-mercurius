import { GraphQLError } from "graphql"
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql"
import Context from "../graphql-context"
import { decodeJWT } from "../lib/auth"
import { Prisma } from "../prisma"
import {
  TodoInput,
  UpdateTodoInput,
} from "../schema/InputTypes/todo-input.type"
import { TodoType } from "../schema/ObjectTypes/todo.type"

@Resolver()
export class TodoResolver {
  @Authorized()
  @Query(() => TodoType)
  async Todo(@Ctx("prisma") prisma: Prisma, @Arg("todoId") todoId: string) {
    const todo = await prisma.todo.findUnique({ where: { id: todoId } })

    if (!todo) {
      throw new GraphQLError("Todo not found")
    }

    return todo
  }

  @Authorized()
  @Mutation(() => TodoType)
  async createTodo(
    @Ctx() { prisma, token }: Context,
    @Arg("input") { title }: TodoInput
  ) {
    const { id } = decodeJWT(token as string)
    const createdTodo = await prisma.todo.create({
      data: { title, userId: id },
    })

    return createdTodo
  }

  @Authorized()
  @Mutation(() => TodoType)
  async updateTodoStatus(
    @Ctx("prisma") prisma: Prisma,
    @Arg("todoId") todoId: string,
    @Arg("todoStatus") todoStatus: boolean
  ) {
    const updatedTodo = await prisma.todo.update({
      where: { id: todoId },
      data: { status: todoStatus },
    })

    return updatedTodo
  }

  @Authorized()
  @Mutation(() => TodoType)
  async updateTodoTitle(
    @Ctx("prisma") prisma: Prisma,
    @Arg("input") { todoId, title }: UpdateTodoInput
  ) {
    const updatedTodo = await prisma.todo.update({
      where: { id: todoId },
      data: { title },
    })

    return updatedTodo
  }

  @Authorized()
  @Query(() => [TodoType])
  async todos(@Ctx() { prisma, token }: Context) {
    const { id } = decodeJWT(token as string)

    const todos = await prisma.todo.findMany({ where: { userId: id } })

    return todos
  }
}
