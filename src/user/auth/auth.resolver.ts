import { HttpException, HttpStatus } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthInputData } from 'src/models/user.model';
import { PrismaService } from 'src/prisma.service';
import { AuthService } from './auth.service';

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
  ) {}

  @Mutation((returns) => String)
  async createUser(@Args('authInputData') authInputData: AuthInputData) {
    const user = await this.prisma.users.findUnique({
      where: { email: authInputData.email },
    });

    console.log('user: ' + user);

    if (user) {
      try {
        await this.prisma.users.update({
          where: { email: authInputData.email },
          data: {
            name: authInputData.name,
            picture: authInputData.picture,
          },
        });

        return this.authService.createJWT(
          authInputData.name,
          authInputData.email,
          authInputData.picture,
        );
      } catch (e) {
        throw new HttpException(
          'update user is failed',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    try {
      await this.prisma.users.create({
        data: {
          email: authInputData.email,
          name: authInputData.name,
          picture: authInputData.picture,
        },
        include: {
          ideas: true,
          likes: true,
          comments: true,
        },
      });

      return this.authService.createJWT(
        authInputData.name,
        authInputData.email,
        authInputData.picture,
      );
    } catch (e) {
      throw new HttpException('create user is failed', HttpStatus.BAD_REQUEST);
    }
  }
}
