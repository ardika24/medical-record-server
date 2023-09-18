import { Entity, Property, ManyToOne, PrimaryKey } from '@mikro-orm/core';
import { Field, Int, ObjectType } from 'type-graphql';
import { Patient } from './Patient';

@ObjectType()
@Entity()
export class MedicalRecord {
  @Field(() => Int)
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: 'date' })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt = new Date();

  @Field(() => String)
  @Property()
  anamnesa!: string;

  @Field(() => String)
  @Property()
  diagnosa!: string;

  @Field(() => String)
  @Property()
  teraphy!: string;

  @Field()
  @Property()
  note?: string;

  @Field(() => Patient)
  @ManyToOne(() => Patient, { onDelete: 'cascade' })
  patient!: Patient;

  constructor(patient: Patient) {
    this.patient = patient;
  }
}
