import { ApiProperty } from "@nestjs/swagger";



export class UpdateStatusDto {
  @ApiProperty({
    default: "set",
  })
  status: string
}