import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';

import { Permissions } from '../common/decorators/permissions.decorator';
import { PermissionGuard } from '../../src/common/guards/permissions.guard';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

/**
 * ------------------------------------------------------------
 * 👥 UsersController
 * ------------------------------------------------------------
 * This controller exposes RESTful CRUD APIs for the "users" module.
 * It is protected by the PermissionGuard and permission metadata
 * via the @Permissions() decorator.
 *
 * ------------------------------------------------------------
 * Endpoint Overview & Required Permissions
 * ------------------------------------------------------------
 * | METHOD | ENDPOINT              | PERMISSION | DESCRIPTION                            |
 * |---------|----------------------|-------------|----------------------------------------|
 * | POST    | /users               | CREATE      | Create a new user                      |
 * | PATCH   | /users/:id           | EDIT        | Partially update an existing user      |
 * | GET     | /users               | VIEW        | Retrieve all users                     |
 * | DELETE  | /users/:id           | DELETE      | Remove a user by ID                    |
 * | GET     | /users/managed/:id   | VIEW        | Fetch users managed by an admin user   |
 *
 * ------------------------------------------------------------
 * Quick Sanity Check (Authorization IDs)
 * ------------------------------------------------------------
 * | ID | Name              | Roles               | Permissions       |
 * |----|-------------------|---------------------|-------------------|
 * | 1  | John Doe          | ADMIN, PERSONAL     | All               |
 * | 5  | Martines Polok    | ADMIN, PERSONAL     | All               |
 * | 6  | Gabriela Wozniak  | VIEWER, PERSONAL    | VIEW only         |
 *
 * Example:
 *   Authorization: 1   → Admin  (all actions)
 *   Authorization: 6   → Viewer (only GET /users)
 *
 * ------------------------------------------------------------
 * Note:
 * This controller delegates all business logic to `UsersService`.
 * The guard performs permission validation *before* executing
 * any method below.
 * ------------------------------------------------------------
 */
@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  /** 🟢 Create user (requires CREATE permission) */
  @Post()
  @UseGuards(PermissionGuard)
  @Permissions('CREATE')
  create(@Body() dto: CreateUserDto) {
    return this.users.create(dto);
  }

  /** 🟡 Partially update user (requires EDIT permission) */
  @Patch(':id')
  @UseGuards(PermissionGuard)
  @Permissions('EDIT')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto) {
    return this.users.update(id, dto);
  }

  /** 🔵 Get all users (requires VIEW permission) */
  @Get()
  @UseGuards(PermissionGuard)
  @Permissions('VIEW')
  findAll() {
    return this.users.findAll();
  }

  /** 🔴 Delete a user (requires DELETE permission) */
  @Delete(':id')
  @UseGuards(PermissionGuard)
  @Permissions('DELETE')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.users.delete(id).then(() => ({ status: 'deleted' }));
  }

  /** 🟣 Get users managed by a given admin (requires VIEW permission) */
  @Get('managed/:id')
  @UseGuards(PermissionGuard)
  @Permissions('VIEW')
  findManaged(@Param('id', ParseIntPipe) id: number) {
    return this.users.managedBy(id);
  }
}
