/**
 * Represents a User entity in the system.
 * 
 * This class defines the data structure for a User.
 * In this project, it is used as an in-memory model
 * (no database ORM is used).
 *
 * ⚙️ Notes:
 * - `!:` (definite assignment operator) tells TypeScript
 *   that these properties will be assigned before use,
 *   even though they're not initialized here.
 * - This avoids "Property has no initializer" errors
 *   when `"strictPropertyInitialization": true` is enabled.
 * - These properties are expected to be filled by the
 *   in-memory store or service methods (e.g. repository).
 */
export class User {
  /** Unique numeric identifier for the user */
  id!: number;

  /** Full name of the user */
  name!: string;

  /** List of roles assigned to the user (e.g., ADMIN, PERSONAL, VIEWER) */
  roles!: string[];

  /** Groups this user belongs to (e.g., GROUP_1, GROUP_2) */
  groups!: string[];
}
