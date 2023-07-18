import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: "address",
})
export class AddressEntity {
    @PrimaryGeneratedColumn("rowid")
      id: number;

    @Column({ name: "user_id", nullable: false })
      user_id: number;

    @Column({ name: "complement", nullable: true })
      complement: string;

    @Column({ name: "number", nullable: false })
      addressNumber: number;

    @Column({ name: "cep", nullable: false })
      cep: string;

    @Column({ name: "city_id", nullable: false })
      city_id: number;
      
    @Column({ name: "created_at", nullable: false })
      created_at: Date;

    @Column({ name: "updated_at", nullable: false })
      updated_at: Date;
}
