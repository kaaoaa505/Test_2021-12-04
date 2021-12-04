import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersProviders } from './users.providers';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [...UsersProviders, UsersService]
})
export class UsersModule {}
