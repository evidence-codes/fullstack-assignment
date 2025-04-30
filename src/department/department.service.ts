import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Department } from './entities/department.entity';
import { SubDepartment } from './entities/sub-department.entity';
import { CreateDepartmentInput } from './dto/create-department.input';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
    @InjectRepository(SubDepartment)
    private readonly subDepartmentRepository: Repository<SubDepartment>,
  ) {}

  async create(input: CreateDepartmentInput): Promise<Department> {
    const { name, subDepartments } = input;

    const department = this.departmentRepository.create({ name });

    if (subDepartments && subDepartments.length > 0) {
      department.subDepartments = subDepartments.map((sub) =>
        this.subDepartmentRepository.create({ name: sub.name }),
      );
    }

    return this.departmentRepository.save(department);
  }

  async findAll(): Promise<Department[]> {
    return this.departmentRepository.find({ relations: ['subDepartments'] });
  }

  async findPaginated(page: number, limit: number) {
    const [items, totalItems] = await this.departmentRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['subDepartments'],
      order: { id: 'ASC' },
    });

    return {
      items,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
    };
  }

  async update(id: number, name: string): Promise<Department> {
    const department = await this.departmentRepository.findOne({
      where: { id },
      relations: ['subDepartments'],
    });

    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }

    department.name = name;
    return this.departmentRepository.save(department);
  }

  async delete(id: number): Promise<void> {
    const department = await this.departmentRepository.findOne({
      where: { id },
      relations: ['subDepartments'],
    });

    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }

    await this.departmentRepository.remove(department);
  }

  async createSubDepartment(
    departmentId: number,
    name: string,
  ): Promise<SubDepartment> {
    const department = await this.departmentRepository.findOne({
      where: { id: departmentId },
    });
    if (!department) {
      throw new NotFoundException(
        `Department with ID ${departmentId} not found`,
      );
    }

    const subDepartment = this.subDepartmentRepository.create({ name });
    subDepartment.department = department;
    return this.subDepartmentRepository.save(subDepartment);
  }

  async getSubDepartments(departmentId: number): Promise<SubDepartment[]> {
    return this.subDepartmentRepository.find({
      where: { department: { id: departmentId } },
    });
  }

  async updateSubDepartment(id: number, name: string): Promise<SubDepartment> {
    const subDepartment = await this.subDepartmentRepository.findOne({
      where: { id },
    });
    if (!subDepartment) {
      throw new NotFoundException(`SubDepartment with ID ${id} not found`);
    }

    subDepartment.name = name;
    return this.subDepartmentRepository.save(subDepartment);
  }

  async deleteSubDepartment(id: number): Promise<void> {
    const subDepartment = await this.subDepartmentRepository.findOne({
      where: { id },
    });
    if (!subDepartment) {
      throw new NotFoundException(`SubDepartment with ID ${id} not found`);
    }

    await this.subDepartmentRepository.remove(subDepartment);
  }
}
