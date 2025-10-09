import { InMemoryUsersRepository } from "../../src/users/repo/inmemory-users.repository";
import { UsersService } from "../../src/users/users.service";


describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    service = new UsersService(new InMemoryUsersRepository());
  });

  it('should return all users', async () => {
    const users = await service.findAll();
    expect(users.length).toBeGreaterThan(0);
  });

  it('should create a new user', async () => {
    const newUser = await service.create({
      name: 'TDD User',
      roles: ['PERSONAL'],
      groups: ['GROUP_1'],
    });
    expect(newUser).toHaveProperty('id');
    expect(newUser.name).toBe('TDD User');
  });

  it('should update an existing user', async () => {
    const updated = await service.update(1, { name: 'Updated John' });
    expect(updated.name).toBe('Updated John');
  });

  it('should delete a user', async () => {
    await service.delete(2);
    const all = await service.findAll();
    expect(all.find(u => u.id === 2)).toBeUndefined();
  });

  it('should return managed users for an admin', async () => {
    const managed = await service.managedBy(1);
    expect(Array.isArray(managed)).toBe(true);
  });

  it('should return empty list for non-admin', async () => {
    const managed = await service.managedBy(3);
    expect(managed).toEqual([]);
  });
});
