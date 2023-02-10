import { Field, ObjectType } from "type-graphql"

@ObjectType()
export class TodoType {
  @Field()
  id!: string

  @Field()
  title!: string

  @Field()
  status!: boolean

  @Field()
  userId!: string
}
