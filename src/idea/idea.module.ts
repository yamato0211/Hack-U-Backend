import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { IdeaResolver } from './idea.resolver';

@Module({
  providers: [IdeaResolver, PrismaService],
})
export class IdeaModule {}
