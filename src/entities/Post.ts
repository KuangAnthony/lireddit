import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity() // corresponds to a database table
export class Post {
  @Field() // exposing this field to GraphQL schema
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: 'date' })
  createdAt = new Date(); // standard rows that most tables should have

  @Field(() => String)
  @Property({ type: 'date', onUpdate: () => new Date() }) // only updates due to the MikroORM onUpdate hook
  updatedAt = new Date();

  @Field()
  @Property({ type: 'text' })
  title!: string;
}
