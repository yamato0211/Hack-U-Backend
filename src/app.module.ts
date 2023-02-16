import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { AuthResolver } from './user/auth/auth.resolver';
import { AuthModule } from './user/auth/auth.module';
import { PrismaService } from './prisma.service';
import { join } from 'path';
import { IdeaModule } from './idea/idea.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    AuthModule,
    IdeaModule,
  ],
  controllers: [],
  providers: [AppResolver, AppService, AuthResolver, PrismaService],
})
export class AppModule {}
