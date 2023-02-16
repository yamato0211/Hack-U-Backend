import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Comment } from './comment.model';
import { Idea } from './idea.model';
import { Likes } from './like.model';

@ObjectType()
export class User {
  @Field()
  email: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  picture: string;

  @Field({ nullable: true })
  description: string;

  @Field()
  isEmailPublic: boolean;

  @Field((type) => [Idea])
  solvedIdeas: Idea[];

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;

  @Field({ nullable: true })
  deletedAt: Date;

  @Field((type) => [Likes])
  Likes: Likes[];

  @Field((type) => [Comment])
  Comment: Comment[];
}

@InputType()
export class AuthInputData {
  @Field()
  email: string;

  @Field()
  name: string;

  @Field()
  picture: string;
}
