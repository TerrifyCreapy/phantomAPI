import { Test, TestingModule } from '@nestjs/testing';
import { RestEndpointsService } from '../rest-endpoints.service';

describe('RestEndpointsService', () => {
  let service: RestEndpointsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestEndpointsService],
    }).compile();

    service = module.get<RestEndpointsService>(RestEndpointsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
