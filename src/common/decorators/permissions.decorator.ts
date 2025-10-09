// src/common/decorators/permissions.decorator.ts
import { SetMetadata } from '@nestjs/common';

/**
 * Custom decorator to attach permissions metadata to route handlers.
 * Example: @Permissions('VIEW', 'EDIT')
 */
export const PERMISSIONS_KEY = 'required_permissions';
export const Permissions = (...perms: string[]) =>
  SetMetadata(PERMISSIONS_KEY, perms);
