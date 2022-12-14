import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryType } from './entities/category-type.entity';
import { CategoryTypesService } from './services/category-types.service';
import { CategoryTypesController } from './controllers/category-types.controller';
import { CategoriesService } from './services/categories.service';
import { Category } from './entities/category.entity';
import { CategoriesController } from './controllers/categories.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryType, Category])],
  providers: [CategoryTypesService, CategoriesService],
  controllers: [CategoryTypesController, CategoriesController],
})
export class CategoriesModule {}
