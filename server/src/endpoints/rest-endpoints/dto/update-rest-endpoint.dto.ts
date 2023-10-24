import { PartialType } from '@nestjs/swagger';
import { CreateRestEndpointDto } from './create-rest-endpoint.dto';

export class UpdateRestEndpointDto extends PartialType(CreateRestEndpointDto) {}
