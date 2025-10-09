import { User } from '../entities/user.entity';

export const USERS_REPO = Symbol('USERS_REPO');

// Interface for dependency inversion
export interface UsersRepository {
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User | undefined>;
  create(user: Omit<User, 'id'>): Promise<User>;
  update(id: number, patch: Partial<User>): Promise<User | undefined>;
  delete(id: number): Promise<boolean>;
}
