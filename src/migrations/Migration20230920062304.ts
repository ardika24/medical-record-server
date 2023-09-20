import { Migration } from '@mikro-orm/migrations';

export class Migration20230920062304 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "username" text not null, "password" varchar(255) not null, constraint "user_pkey" primary key ("id"));');
    this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "user" cascade;');
  }

}
