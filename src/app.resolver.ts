import { Resolver, Query } from '@nestjs/graphql';
import { AppService } from './app.service';

@Resolver('')
export class AppResolver {
  constructor(private appService: AppService) {}
  @Query(() => String)
  hello(): string {
    return this.appService.getHello();
  }
}
