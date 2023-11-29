import { AddressEntity } from "../../address/entities/address.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: "user",
})
export class UserEntity {
  @PrimaryGeneratedColumn("increment")
    id: number;

  @Column({ name: "name", nullable: false })
    name: string;
  @Column({ name: "email", nullable: false, unique: true })
    email: string;
  @Column({ name: "phone", nullable: false })
    phone: string;
  @Column({ name: "cpf", nullable: false, unique: true })
    cpf: string;
  @Column({ name: "password", nullable: false })
    password: string;
  @Column({ name: "type_user", nullable: false })
    type_user: number;
  @Column({ name: "created_at", nullable: false })
    created_at: Date;
  @Column({ name: "updated_at", nullable: false })
    updated_at: Date;

  // @OneToMany(() => AddressEntity, (address) => address.user)
  @OneToMany("AddressEntity", "user")
    address?: AddressEntity[];
}
