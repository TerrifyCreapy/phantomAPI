import { ApiProperty } from "@nestjs/swagger";

export class CreateProjectDto {
    @ApiProperty({
        default: "TestProject"
    })
    name: string;
    @ApiProperty({
        default: "Project description"
    })
    description: string;
}
