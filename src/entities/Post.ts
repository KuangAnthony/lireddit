import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity() // corresponds to a database table
export class Post {
  @PrimaryKey()
  id!: number;

  @Property({ type: 'date' })
  createdAt = new Date(); // standard rows that most tables should have

  @Property({ type: 'date', onUpdate: () => new Date() }) // only updates due to the MikroORM onUpdate hook
  updatedAt = new Date();

  @Property({ type: 'text' })
  title!: string;
}
