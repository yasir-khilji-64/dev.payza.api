import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryTypeDto } from '../dtos/create-category-type.dto';
import { UpdateCategoryTypeDto } from '../dtos/update-category-type.dto';
import { CategoryType } from '../entities/category-type.entity';

@Injectable()
export class CategoryTypesService {
  constructor(
    @InjectRepository(CategoryType)
    private categoryTypesRepository: Repository<CategoryType>,
  ) {}

  async create(
    categoryTypeDetails: CreateCategoryTypeDto,
  ): Promise<CategoryType> {
    const newCategoryType = await this.categoryTypesRepository.create(
      categoryTypeDetails,
    );
    await this.categoryTypesRepository.save(newCategoryType);
    return newCategoryType;
  }

  async getAll(): Promise<CategoryType[]> {
    return await this.categoryTypesRepository
      .createQueryBuilder('category_type')
      .select(['id', 'name', 'description', 'created_at'])
      .execute();
  }

  async update(
    id: string,
    categoryDetails: UpdateCategoryTypeDto,
  ): Promise<CategoryType | HttpException> {
    const updateResult = await this.categoryTypesRepository
      .createQueryBuilder('category_type')
      .update()
      .set({
        name: categoryDetails.name,
        description: categoryDetails.description,
      })
      .where('id = :id', { id: id })
      .execute();
    if (!updateResult.affected) {
      throw new HttpException('Category Type not found', HttpStatus.NOT_FOUND);
    }
    return await this.categoryTypesRepository
      .createQueryBuilder('category_type')
      .select(['id', 'name', 'description', 'created_at', 'updated_at'])
      .where('id = :id', { id: id })
      .execute();
  }
}
