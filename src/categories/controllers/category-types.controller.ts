import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AdminRoleGuard } from 'src/auth/guards/admin-role.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateCategoryTypeDto } from '../dtos/create-category-type.dto';
import { UpdateCategoryTypeDto } from '../dtos/update-category-type.dto';
import { CategoryType } from '../entities/category-type.entity';
import { CategoryTypesService } from '../services/category-types.service';

@Controller('category-types')
export class CategoryTypesController {
  constructor(private readonly categoryTypesService: CategoryTypesService) {}

  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  @Post()
  async create(
    @Body() categoryTypeDetails: CreateCategoryTypeDto,
  ): Promise<CategoryType> {
    return await this.categoryTypesService.create(categoryTypeDetails);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(): Promise<CategoryType[]> {
    return this.categoryTypesService.getAll();
  }

  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  @Patch(':id')
  async update(
    @Body() categoryDetails: UpdateCategoryTypeDto,
    @Param('id') id: string,
  ): Promise<CategoryType | HttpException> {
    return this.categoryTypesService.update(id, categoryDetails);
  }
}
