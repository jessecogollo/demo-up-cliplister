import { Entity, Column, PrimaryGeneratedColumn, Generated } from 'typeorm';

@Entity()
export class Assets {
  @PrimaryGeneratedColumn()
  @Generated('uuid')
  id: string;

  // @Column()
  // @Generated('uuid')
  // uuid: string;

  @Column('text')
  name: string;

  @Column('text')
  type: string;

  @Column('text')
  url: string;

  @Column('simple-json')
  metadata: { mimetype: string; size: string };

  @Column({ name: 'created_at' })
  created_at: Date;

  @Column({ name: 'updated_at' })
  updated_at: Date;
}
