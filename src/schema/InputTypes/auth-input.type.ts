import { MinLength } from "class-validator"
import { Field, InputType } from "type-graphql"

@InputType()
export class AuthInput {
  @Field()
  @MinLength(5)
  username!: string

  @Field()
  @MinLength(5)
  password!: string
}
