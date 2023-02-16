import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Idea, IdeaInputData } from 'src/models/idea.model';
import { PrismaService } from 'src/prisma.service';

@Resolver('Idea')
export class IdeaResolver {
  constructor(private prisma: PrismaService) {}
  @Mutation((returns) => Idea)
  async createIdea(@Args('ideaInputData') ideaInputData: IdeaInputData) {
    return this.prisma.idea.create({
      data: {
        title: ideaInputData.title,
        caption: ideaInputData.caption,
        lineID: ideaInputData.lineID,
        author: ideaInputData.author,
      },
      include: {
        User: true,
        Likes: true,
        Comment: true,
      },
    });
  }
}
