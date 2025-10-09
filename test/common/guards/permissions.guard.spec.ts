import { ForbiddenException, BadRequestException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionGuard } from '../../../src/common/guards/permissions.guard';
import { InMemoryUsersRepository } from '../../../src/users/repo/inmemory-users.repository';
import { UsersService } from '../../../src/users/users.service';

/**
 * ------------------------------------------------------------
 * 🧪 PermissionGuard Unit Test
 * ------------------------------------------------------------
 * Verifies that PermissionGuard correctly enforces RBAC rules
 * using Authorization header values and permissions metadata.
 * ------------------------------------------------------------
 */
describe('PermissionGuard', () => {
  let guard: PermissionGuard;
  let usersService: UsersService;
  let reflector: Reflector;

  beforeEach(() => {
    usersService = new UsersService(new InMemoryUsersRepository());
    reflector = new Reflector();
    guard = new PermissionGuard(reflector, usersService);
  });

  /** ✅ Helper: creates mock execution context */
  const mockCtx = (userId: string, requiredPerms: string[]) => ({
    switchToHttp: () => ({
      getRequest: () => ({ headers: { authorization: userId } }),
    }),
    getHandler: jest.fn(),
    getClass: jest.fn(),
  });

  /** 🧠 Test 1: Should allow admin for CREATE permission */
  it('should allow admin (Authorization: 1) for CREATE', async () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['CREATE']);
    const ctx = mockCtx('1', ['CREATE']); // user #1 = ADMIN
    await expect(guard.canActivate(ctx as any)).resolves.toBe(true);
  });

  /** 🧠 Test 2: Should reject viewer for CREATE permission */
  it('should reject viewer (Authorization: 6) for CREATE', async () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['CREATE']);
    const ctx = mockCtx('6', ['CREATE']); // user #6 = VIEWER
    await expect(guard.canActivate(ctx as any)).rejects.toThrow(ForbiddenException);
  });

  /** 🧠 Test 3: Should allow viewer for VIEW permission */
  it('should allow viewer (Authorization: 6) for VIEW', async () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['VIEW']);
    const ctx = mockCtx('6', ['VIEW']);
    await expect(guard.canActivate(ctx as any)).resolves.toBe(true);
  });

  /** 🧠 Test 4: Should throw BadRequestException if Authorization header missing */
  it('should throw BadRequestException if no Authorization header', async () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['VIEW']);
    const ctx: any = {
      switchToHttp: () => ({ getRequest: () => ({ headers: {} }) }),
      getHandler: jest.fn(),
      getClass: jest.fn(),
    };
    await expect(guard.canActivate(ctx)).rejects.toThrow(BadRequestException);
  });
});
