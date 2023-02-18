import {
  Field,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Comment } from './comment.model';
import { Likes } from './like.model';
import { User } from './user.model';
import { status } from '@prisma/client';

@ObjectType()
export class Idea {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  caption: string;

  @Field()
  lineID: string;

  @Field({ nullable: true })
  auther: string;

  @Field()
  status: string;

  @Field((type) => Int)
  views: number;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;

  @Field((type) => User, { nullable: true })
  user: User;

  @Field()
  userEmail: string;

  @Field((type) => [Likes])
  Likes: Likes;

  @Field((type) => [Comment])
  Comment: Comment[];
}

@InputType()
export class IdeaInputData {
  @Field()
  title: string;

  @Field()
  caption: string;

  @Field({ nullable: true })
  author: string;

  @Field()
  lineID: string;
}
