import { UsersController } from "../../src/users/users.controller";
import { UsersService } from "../../src/users/users.service";


describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockService = {
    create: jest.fn(dto => ({ id: 7, ...dto })),
    update: jest.fn((id, dto) => ({ id, ...dto })),
    findAll: jest.fn(() => [{ id: 1, name: 'John' }]),
    delete: jest.fn(() => Promise.resolve()),
    managedBy: jest.fn(() => []),
  };

  beforeEach(() => {
    service = mockService as any;
    controller = new UsersController(service);
  });

  it('should call service.create on create()', () => {
    const dto = { name: 'New', roles: ['PERSONAL'], groups: ['GROUP_1'] };
    controller.create(dto as any);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should call service.findAll on findAll()', () => {
    controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should call service.update on update()', () => {
    controller.update(1, { name: 'Updated' } as any);
    expect(service.update).toHaveBeenCalledWith(1, { name: 'Updated' });
  });

  it('should call service.delete on remove()', async () => {
    await controller.remove(2);
    expect(service.delete).toHaveBeenCalledWith(2);
  });

  it('should call service.managedBy on findManaged()', () => {
    controller.findManaged(1);
    expect(service.managedBy).toHaveBeenCalledWith(1);
  });
});
