import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Department } from '../entities/department.entity';

@ObjectType()
export class PaginatedDepartments {
  @Field(() => [Department])
  items: Department[];

  @Field(() => Int)
  totalItems: number;

  @Field(() => Int)
  totalPages: number;

  @Field(() => Int)
  currentPage: number;
}
