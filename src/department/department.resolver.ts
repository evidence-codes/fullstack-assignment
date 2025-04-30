import { Resolver, Mutation, Args, Query, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { DepartmentService } from './department.service';
import { Department } from './entities/department.entity';
import { SubDepartment } from './entities/sub-department.entity';
import { CreateDepartmentInput } from './dto/create-department.input';
import { PaginatedDepartments } from './dto/paginated-departments.output';
import { GqlAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(GqlAuthGuard)
@Resolver(() => Department)
export class DepartmentResolver {
  constructor(private readonly deptService: DepartmentService) {}

  @Mutation(() => Department)
  createDepartment(@Args('input') input: CreateDepartmentInput) {
    return this.deptService.create(input);
  }

  @Query(() => Department)
  getDepartment(@Args('id') id: number): Promise<Department> {
    return this.deptService.findOne(id);
  }

  @Query(() => PaginatedDepartments)
  getDepartments(
    @Args('page', { type: () => Int }) page: number,
    @Args('limit', { type: () => Int }) limit: number,
  ) {
    return this.deptService.findPaginated(page, limit);
  }

  @Mutation(() => Department)
  async updateDepartment(
    @Args('id') id: number,
    @Args('name') name: string,
  ): Promise<Department> {
    return this.deptService.update(id, name);
  }

  @Mutation(() => Boolean)
  async deleteDepartment(@Args('id') id: number): Promise<boolean> {
    await this.deptService.delete(id);
    return true;
  }

  @Mutation(() => SubDepartment)
  async createSubDepartment(
    @Args('departmentId') departmentId: number,
    @Args('name') name: string,
  ): Promise<SubDepartment> {
    return this.deptService.createSubDepartment(departmentId, name);
  }

  @Mutation(() => SubDepartment)
  async updateSubDepartment(
    @Args('id') id: number,
    @Args('name') name: string,
  ): Promise<SubDepartment> {
    return this.deptService.updateSubDepartment(id, name);
  }

  @Mutation(() => Boolean)
  async deleteSubDepartment(@Args('id') id: number): Promise<boolean> {
    await this.deptService.deleteSubDepartment(id);
    return true;
  }

  @Query(() => [SubDepartment])
  async getSubDepartments(
    @Args('departmentId') departmentId: number,
  ): Promise<SubDepartment[]> {
    return this.deptService.getSubDepartments(departmentId);
  }
}
