import { MedicalRecord } from '../entities/MedicalRecord';
import { Patient } from '../entities/Patient';
import { MyContext } from 'src/types';
import { Arg, Ctx, Field, InputType, Mutation } from 'type-graphql';

@InputType()
class MedicalInput {
  @Field()
  anamnesa!: string;

  @Field()
  diagnosa!: string;

  @Field()
  teraphy!: string;

  @Field()
  note?: string;
}

export class MedicalRecordResolver {
  @Mutation(() => MedicalRecord)
  async createPatient(
    @Arg('options') options: MedicalInput,
    @Ctx() { em }: MyContext
  ): Promise<Patient> {
    const emFork = em.fork();
    const data = emFork.create(Patient, {
      anamnesa: options.anamnesa,
      diagnosa: options.diagnosa,
      teraphy: options.teraphy,
      note: options.note,
    });
    await emFork.persistAndFlush(data);
    return data;
  }
}
