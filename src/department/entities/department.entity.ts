import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SubDepartment } from './sub-department.entity';

@ObjectType()
@Entity()
export class Department {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [SubDepartment], { nullable: true })
  @OneToMany(() => SubDepartment, (sub) => sub.department, { cascade: true })
  subDepartments: SubDepartment[];
}
