import { MaxLength } from "class-validator"
import { Field, InputType } from "type-graphql"

@InputType()
export class TodoInput {
  @Field()
  @MaxLength(255)
  title!: string
}

@InputType()
export class UpdateTodoInput extends TodoInput {
  @Field()
  todoId!: string
}
