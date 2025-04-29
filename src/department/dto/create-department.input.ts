import { InputType, Field } from '@nestjs/graphql';
import {
  IsString,
  MinLength,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
class SubDeptInput {
  @Field()
  @IsString()
  @MinLength(2)
  name: string;
}

@InputType()
export class CreateDepartmentInput {
  @Field()
  @IsString()
  @MinLength(2)
  name: string;

  @Field(() => [SubDeptInput], { nullable: true })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => SubDeptInput)
  subDepartments?: SubDeptInput[];
}
