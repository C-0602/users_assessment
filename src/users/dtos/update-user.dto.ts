import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// Partial DTO for PATCH (inherits validation)
export class UpdateUserDto extends PartialType(CreateUserDto) {}
