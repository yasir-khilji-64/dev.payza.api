import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryType } from './entities/category-type.entity';
import { CategoryTypesService } from './services/category-types.service';
import { CategoryTypesController } from './controllers/category-types.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryType])],
  providers: [CategoryTypesService],
  controllers: [CategoryTypesController],
})
export class CategoriesModule {}
