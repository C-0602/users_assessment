import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { USERS_REPO } from './repo/users.repository';
import { InMemoryUsersRepository } from './repo/inmemory-users.repository';
import { PermissionGuard } from '../common/guards/permissions.guard';

@Module({
  controllers: [UsersController],
  providers: [
    { provide: USERS_REPO, useClass: InMemoryUsersRepository },
    UsersService,
    PermissionGuard,
  ],
  exports: [UsersService],
})
export class UsersModule {}
