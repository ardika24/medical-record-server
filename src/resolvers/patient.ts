import { Patient } from '../entities/Patient';
import { MyContext } from '../types';
import {
  Query,
  Resolver,
  Ctx,
  Arg,
  Mutation,
  InputType,
  Field,
} from 'type-graphql';

@InputType()
class PatientInput {
  @Field()
  name!: string;

  @Field()
  birt_date!: Date;

  @Field()
  birt_place!: string;

  @Field()
  gender!: string;

  @Field()
  address!: string;
}

@Resolver()
export class PatientResolver {
  @Query(() => [Patient])
  patients(@Ctx() { em }: MyContext): Promise<Patient[]> {
    return em.fork({}).findAll(Patient, {});
  }

  @Query(() => Patient)
  patient(
    @Arg('name', () => String) name: string,
    @Ctx() { em }: MyContext
  ): Promise<Patient[] | null> {
    return em.fork({}).findOne(Patient, { name });
  }

  @Mutation(() => Patient)
  async createPatient(
    @Arg('options') options: PatientInput,
    @Ctx() { em }: MyContext
  ): Promise<Patient> {
    const emFork = em.fork();
    const data = emFork.create(Patient, {
      name: options.name,
      birth_place: options.birt_place,
      birth_date: options.birt_date,
      gender: options.gender,
      address: options.address,
    });
    await emFork.persistAndFlush(data);
    return data;
  }

  @Mutation(() => Patient, { nullable: true })
  async updatePatient(
    @Arg('name') name: string,
    @Ctx() { em }: MyContext
  ): Promise<Patient | null> {
    const data = await em.fork().findeOne(Patient, { name });
    if (!data) {
      return null;
    }
    if (typeof name !== 'undefined') {
      data.name = name;
    }
    return data;
  }

  @Mutation(() => Boolean)
  async deletePatient(
    @Arg('id') id: string,
    @Ctx() { em }: MyContext
  ): Promise<boolean> {
    await em.fork().nativeDelete(Patient, { id });
    return true;
  }
}
