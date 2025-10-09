import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  BadRequestException
} from '@nestjs/common';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';
import { ROLE_DEFINITIONS } from '../constants/permissions.constant';
import { UsersService } from '../../users/users.service';
import { Reflector } from '@nestjs/core';
/**
 * ------------------------------------------------------------
 * PermissionGuard
 * ------------------------------------------------------------
 * This guard enforces permission-based access control
 * using the @Permissions('CREATE') decorator on routes.
 *
 * How It Works:
 * 1. Reads the required permissions from route metadata
 *    via Reflector (set by @Permissions()).
 * 2. Extracts user ID from the "Authorization" header.
 * 3. Loads the user from UsersService (in-memory user data).
 * 4. Maps user roles → permissions (from ROLE_DEFINITIONS).
 * 5. If user has all required permissions → allow access.
 *    Otherwise → throw ForbiddenException.
 *
 * ------------------------------------------------------------
 * 🧾 Quick Sanity Check (Role → Allowed Endpoints)
 * ------------------------------------------------------------
 * | ROLE      | ALLOWED ENDPOINTS                                 |
 * |-----------|----------------------------------------------------|
 * | ADMIN     | All (POST, GET, PATCH, DELETE, /managed/:id)   |
 * | PERSONAL  | Only GET (view data via Admin’s routes)        |
 * | VIEWER    | Only GET /users (read-only access)             |
 *
 * Authorization Header Example:
 *   Authorization: 1   → John Doe (ADMIN)
 *   Authorization: 6   → Gabriela Wozniak (VIEWER)
 *
 * Note: This guard is stateless — it reads predefined users
 * from in-memory data, not a database.
 * ------------------------------------------------------------
 */
@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector, private users: UsersService) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
  // Step 1: Get required permissions from @Permissions decorator
    const required = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
    // If no permissions are defined, allow by default
    if (!required?.length) return true;

    // Step 2️: Extract user ID from Authorization header
    const req = ctx.switchToHttp().getRequest();
    const raw = req.headers['authorization'];
    const id = Number(raw);

    if (!raw || Number.isNaN(id)) {
      throw new BadRequestException('Authorization header must be a numeric user ID');
    }

    // Step 3️: Fetch user details from UsersService
    const requester = await this.users.getByIdOrThrow(id);

    // Step 4️: Aggregate all permissions granted by user's roles
    const permSet = new Set<string>();
    requester.roles.forEach((r: string) => {
      const def = ROLE_DEFINITIONS.find(d => d.code === r);
      def?.permissions.forEach((p: string) => permSet.add(p));
    });

    // Step 5️: Validate if user has all required permissions
    const ok = required.every((p: string) => permSet.has(p));
    if (!ok) {
      throw new ForbiddenException('Not allowed to perform action due to insufficient permissions.');
    }

    return true;
  }
}
