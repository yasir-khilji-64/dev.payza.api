import { Test, TestingModule } from '@nestjs/testing';
import { CategoryTypesController } from './category-types.controller';

describe('CategoryTypesController', () => {
  let controller: CategoryTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryTypesController],
    }).compile();

    controller = module.get<CategoryTypesController>(CategoryTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
