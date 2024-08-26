import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateEntityDto } from './create-entity.dto';

export class UpdateEntityDto extends PartialType(CreateEntityDto) {
    @ApiProperty({
        default: "name"
    })
    name: string;
    @ApiProperty({
        default: []
    })
    value: Array<any> | string;
}
