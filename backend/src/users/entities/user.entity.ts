import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  user_name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;
}
