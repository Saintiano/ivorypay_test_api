/* eslint-disable prettier/prettier */


import {
  BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';

  
  @Entity('transactions')
  export class TransactionEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    transaction_id: number;

    @Column({ select: false })
    transactionReference: string;
  
    @Column()
    firstName: string;
  
    @Column()
    lastName: string;
  
    @Column({ unique: false })
    email: string;

    @Column({ select: false })
    itemName: string;
  
    @Column({  type: 'numeric', precision: 10, scale: 2  })
    price: number;

    @Column({ default: '' })
    transactionDescription: string;

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updatedAt: Date;

  }