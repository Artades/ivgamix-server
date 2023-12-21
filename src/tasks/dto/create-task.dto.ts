import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Task Name',
    description: 'The name of the task',
  })
  readonly name: string;

  @ApiProperty({
    example: 'Task description',
    description: 'The description of the task',
  })
  readonly description: string;

  @ApiProperty({
    example: new Date().toISOString(),
    description: 'The date of creation for the task (optional)',
    required: true,
  })
  readonly dateOfCreation: Date;

  @ApiProperty({
    required: false,
    description: 'The Deadline of the task',
    example: 'till Friday',
  })
  readonly deadline?: String;

  @ApiProperty({
    required: false,
    description: 'The color, determining the type of the task',
    example: '#faff',
  })
  readonly color?: String;

  @ApiProperty({
    required: true,
    description: 'The status of the task',
    example: 'Set',
  })
  readonly status: String;

  constructor(
    name: string,
    description: string,
    dateOfCreation: Date,
    status: string,
    deadline?: string,
    color?: string,
  ) {
    this.name = name;
    this.description = description;
    this.dateOfCreation = dateOfCreation;
    this.deadline = deadline;
    this.color = color;
    this.status = status;
  }
}
