import { ApiProperty } from "@nestjs/swagger";

export class CreateProjectDto {
    @ApiProperty({
        default: "TestProject"
    })
    name: string;
}
