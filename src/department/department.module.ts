import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DepartmentService } from './department.service';
import { DepartmentResolver } from './department.resolver';
import { Department } from './entities/department.entity';
import { SubDepartment } from './entities/sub-department.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Department, SubDepartment])],
  providers: [DepartmentService, DepartmentResolver],
})
export class DepartmentModule {}
