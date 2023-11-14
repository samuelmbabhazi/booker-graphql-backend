import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './models/user.model';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/input/create-user-input.dto';
import { GetUserArgs } from './dto/args/get-user-args.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  async createUser(@Args('createUserData') createUserData: CreateUserInput) {
    return this.usersService.create(createUserData);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  async getUser(@Args() getUserArgs: GetUserArgs) {
    return this.usersService.getUser(getUserArgs);
  }
}
