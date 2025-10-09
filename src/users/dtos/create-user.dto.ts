import {
  IsArray, ArrayNotEmpty, IsString, MaxLength, IsIn, IsNotEmpty,
} from 'class-validator';
import { PREDEFINED_GROUPS } from '../../common/constants/groups.constant';
import { PREDEFINED_ROLES_WITH_VIEWER } from '../../common/constants/roles.constant';

// DTO for user creation with validation
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name!: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsIn(PREDEFINED_ROLES_WITH_VIEWER as ReadonlyArray<string>, { each: true })
  roles!: string[];

  @IsArray()
  @ArrayNotEmpty()
  @IsIn(PREDEFINED_GROUPS as ReadonlyArray<string>, { each: true })
  groups!: string[];
}
