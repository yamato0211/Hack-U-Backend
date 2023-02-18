import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { AuthResolver } from './user/auth/auth.resolver';
import { AuthModule } from './user/auth/auth.module';
import { PrismaService } from './prisma.service';
import { join } from 'path';
import { AuthService } from './user/auth/auth.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [
    AppResolver,
    AppService,
    AuthResolver,
    PrismaService,
    AuthService,
  ],
})
export class AppModule {}
