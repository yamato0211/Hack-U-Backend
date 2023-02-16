import { HttpException, HttpStatus } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthInputData, User } from 'src/models/user.model';
import { PrismaService } from 'src/prisma.service';

@Resolver('Auth')
export class AuthResolver {
  constructor(private prisma: PrismaService) {}

  @Mutation((returns) => User)
  async createUser(@Args('authInputData') authInputData: AuthInputData) {
    const user = await this.prisma.user.findUnique({
      where: { email: authInputData.email },
    });

    console.log('user: ' + user);

    if (user) {
      throw new HttpException(
        'this email user is already existed!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.prisma.user.create({
      data: {
        email: authInputData.email,
        name: authInputData.name,
        picture: authInputData.picture,
      },
      include: {
        solvedIdeas: true,
        Likes: true,
        Comment: true,
      },
    });
  }
}
