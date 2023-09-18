import {
  Entity,
  PrimaryKey,
  Property,
  OneToMany,
  Collection,
  Cascade,
} from '@mikro-orm/core';
import { Field, ObjectType } from 'type-graphql';
import { MedicalRecord } from './MedicalRecord';

@ObjectType()
@Entity()
export class Patient {
  @Field()
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
  name!: string;

  @Field(() => String)
  @Property()
  birth_place!: string;

  @Field(() => String)
  @Property()
  birth_date!: Date;

  @Field(() => String)
  @Property()
  gender!: string;

  @Field(() => String)
  @Property()
  address!: string;

  @Field(() => [MedicalRecord])
  @OneToMany(() => MedicalRecord, (medical: MedicalRecord) => medical.patient, {
    cascade: [Cascade.ALL],
  })
  medicalRecords = new Collection<MedicalRecord>(this);
}
