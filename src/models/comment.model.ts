import { Field, ObjectType } from '@nestjs/graphql';
import { Idea } from './idea.model';
import { User } from './user.model';

@ObjectType()
export class Comment {
  @Field()
  id: string;

  @Field((type) => User)
  user: User;

  @Field()
  UserEmail: string;

  @Field((type) => Idea)
  idea: Idea;

  @Field()
  ideaID: string;

  @Field()
  message: string;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;
}
