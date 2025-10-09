import { UsersRepository } from './users.repository';
import { User } from '../entities/user.entity';
import { USERS_SEED } from '../store/users.store';

// Simple in-memory implementation for assessment
export class InMemoryUsersRepository implements UsersRepository {
  private users: User[] = [...USERS_SEED];

  async findAll(): Promise<User[]> {
    return [...this.users];
  }

  async findById(id: number): Promise<User | undefined> {
    return this.users.find(u => u.id === id);
  }

  async create(user: Omit<User, 'id'>): Promise<User> {
    const id = Math.max(0, ...this.users.map(u => u.id)) + 1;
    const created: User = { id, ...user };
    this.users.push(created);
    return created;
  }

  async update(id: number, patch: Partial<User>): Promise<User | undefined> {
    const idx = this.users.findIndex(u => u.id === id);
    if (idx < 0) return undefined;
    this.users[idx] = { ...this.users[idx], ...patch };
    return this.users[idx];
  }

  async delete(id: number): Promise<boolean> {
    const before = this.users.length;
    this.users = this.users.filter(u => u.id !== id);
    return this.users.length !== before;
  }
}
