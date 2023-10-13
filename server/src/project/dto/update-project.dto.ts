import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProjectDto } from './create-project.dto';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
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
