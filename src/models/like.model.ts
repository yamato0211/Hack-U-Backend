import { Field, ObjectType } from '@nestjs/graphql';
import { Idea } from './idea.model';
import { User } from './user.model';

@ObjectType()
export class Likes {
  @Field((type) => User)
  user: User;

  @Field()
  UserEmail: string;

  @Field((type) => Idea)
  idea: Idea;

  @Field()
  ideaID: string;
}
