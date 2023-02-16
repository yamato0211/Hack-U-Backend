import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Message {
  @Field()
  id: string;

  @Field()
  message: string;

  @Field()
  senderID: string;

  @Field()
  receverID: string;
}
