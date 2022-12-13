import { Test, TestingModule } from '@nestjs/testing';
import { CategoryTypesService } from './category-types.service';

describe('CategoryTypesService', () => {
  let service: CategoryTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryTypesService],
    }).compile();

    service = module.get<CategoryTypesService>(CategoryTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
