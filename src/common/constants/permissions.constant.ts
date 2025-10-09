// All possible permissions
export const PREDEFINED_PERMISSIONS = ['CREATE', 'VIEW', 'EDIT', 'DELETE'];

// Role to permission mapping (used by PermissionGuard)
export const ROLE_DEFINITIONS = [
  {
    name: 'Admin',
    code: 'ADMIN',
    permissions: ['CREATE', 'VIEW', 'EDIT', 'DELETE'],
  },
  { name: 'Personal', code: 'PERSONAL', permissions: [] },
  { name: 'Viewer', code: 'VIEWER', permissions: ['VIEW'] },
];
