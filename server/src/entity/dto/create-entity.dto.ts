import { ApiProperty } from "@nestjs/swagger";

export class CreateEntityDto {
    @ApiProperty({
        default: "test",
    })
    name: string;
    @ApiProperty({
        default: "aw",
    })
    link: string;
    @ApiProperty({
        default: '[]'
    })
    value: string | Array<any>
}
