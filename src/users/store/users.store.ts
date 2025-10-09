import { User } from '../entities/user.entity';

// Predefined users (as per assessment)
export const USERS_SEED: User[] = [
  { id: 1, name: 'John Doe',          roles: ['ADMIN', 'PERSONAL'],  groups: ['GROUP_1', 'GROUP_2'] },
  { id: 2, name: 'Grabriel Monroe',   roles: ['PERSONAL'],           groups: ['GROUP_1', 'GROUP_2'] },
  { id: 3, name: 'Alex Xavier',       roles: ['PERSONAL'],           groups: ['GROUP_2'] },
  { id: 4, name: 'Jarvis Khan',       roles: ['ADMIN', 'PERSONAL'],  groups: ['GROUP_2'] },
  { id: 5, name: 'Martines Polok',    roles: ['ADMIN', 'PERSONAL'],  groups: ['GROUP_1'] },
  { id: 6, name: 'Gabriela Wozniak',  roles: ['VIEWER', 'PERSONAL'], groups: ['GROUP_1'] },
];
