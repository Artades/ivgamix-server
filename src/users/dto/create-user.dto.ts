import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    default: 'john_smith@gmail.com',
  })
  email: string;

  @ApiProperty({
    default: 'John',
  })
  firstName: string;
  @ApiProperty({
    default: 'Smith',
  })
  lastName: string;

  @ApiProperty({
    default: '12345',
  })
  password: string;

}
