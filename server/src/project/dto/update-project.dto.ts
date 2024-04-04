import { ApiProperty } from '@nestjs/swagger';

export class UpdateProjectDto {
    @ApiProperty({
        default: true
    })
    auth: boolean;
    @ApiProperty({
        default: true
    })
    register: true;
    @ApiProperty({
        default: true
    })
    uploads: true;
}
