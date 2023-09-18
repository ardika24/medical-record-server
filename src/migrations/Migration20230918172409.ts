import { Migration } from '@mikro-orm/migrations';

export class Migration20230918172409 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "medical_record" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "anamnesa" varchar(255) not null, "diagnosa" varchar(255) not null, "teraphy" varchar(255) not null, "note" varchar(255) not null, "patient_id" int not null);');

    this.addSql('alter table "medical_record" add constraint "medical_record_patient_id_foreign" foreign key ("patient_id") references "patient" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "patient" add column "birth_place" varchar(255) not null, add column "birth_date" timestamptz(0) not null, add column "gender" varchar(255) not null, add column "address" varchar(255) not null;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "medical_record" cascade;');

    this.addSql('alter table "patient" drop column "birth_place";');
    this.addSql('alter table "patient" drop column "birth_date";');
    this.addSql('alter table "patient" drop column "gender";');
    this.addSql('alter table "patient" drop column "address";');
  }

}
