import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AdminRoleGuard } from 'src/auth/guards/admin-role.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { Category } from '../entities/category.entity';
import { CategoriesService } from '../services/categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  @Post()
  async create(@Body() categoryDetails: CreateCategoryDto): Promise<Category> {
    return await this.categoriesService.create(categoryDetails);
  }
}
