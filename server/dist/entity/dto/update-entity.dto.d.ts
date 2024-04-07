import { CreateEntityDto } from './create-entity.dto';
declare const UpdateEntityDto_base: import("@nestjs/common").Type<Partial<CreateEntityDto>>;
export declare class UpdateEntityDto extends UpdateEntityDto_base {
    name: string;
    value: Array<any> | string;
}
export {};
