import { Injectable, NotFoundException, ConflictException, Inject } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersRepository, USERS_REPO } from './repo/users.repository';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@Inject(USERS_REPO) private readonly repo: UsersRepository) {}

  async findAll(): Promise<User[]> {
    return this.repo.findAll();
  }

  async create(dto: CreateUserDto): Promise<User> {
    const all = await this.repo.findAll();
    const exists = all.some(u =>
      u.name.trim().toLowerCase() === dto.name.trim().toLowerCase() &&
      u.groups.some(g => dto.groups.includes(g))
    );
    if (exists) throw new ConflictException('User with same name in overlapping group already exists.');
    return this.repo.create(dto);
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    const updated = await this.repo.update(id, dto);
    if (!updated) throw new NotFoundException('User not found');
    return updated;
  }

  async delete(id: number): Promise<void> {
    const ok = await this.repo.delete(id);
    if (!ok) throw new NotFoundException('User not found');
  }

  async getByIdOrThrow(id: number): Promise<User> {
    const u = await this.repo.findById(id);
    if (!u) throw new NotFoundException('User not found');
    return u;
  }

  async managedBy(id: number): Promise<User[]> {
    const manager = await this.repo.findById(id);
    if (!manager) throw new NotFoundException('User not found');

    if (!manager.roles.includes('ADMIN')) return [];

    const groupSet = new Set(manager.groups);
    const all = await this.repo.findAll();
    return all.filter(u => u.id !== manager.id && u.groups.some(g => groupSet.has(g)));
  }
}
