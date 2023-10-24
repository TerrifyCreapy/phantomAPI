"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRestEndpointDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_rest_endpoint_dto_1 = require("./create-rest-endpoint.dto");
class UpdateRestEndpointDto extends (0, swagger_1.PartialType)(create_rest_endpoint_dto_1.CreateRestEndpointDto) {
}
exports.UpdateRestEndpointDto = UpdateRestEndpointDto;
//# sourceMappingURL=update-rest-endpoint.dto.js.map