import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async create(categoryDetails: CreateCategoryDto): Promise<Category> {
    const newCategory = await this.categoriesRepository.create(categoryDetails);
    await this.categoriesRepository.save(newCategory);
    return newCategory;
  }
}
