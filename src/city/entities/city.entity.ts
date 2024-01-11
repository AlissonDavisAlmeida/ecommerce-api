import { StateEntity } from "../../state/entities/state.entity";
import { AddressEntity } from "../../address/entities/address.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm";

@Entity({
  name: "city",
})
export class CityEntity {
  @PrimaryGeneratedColumn("rowid")
    id: number;

  @Column({ name: "state_id", nullable: false })
    state_id: number;

  @Column({ name: "name", nullable: false })
    name: string;

  @Column({ name: "created_at", nullable: false })
    created_at: Date;

  @Column({ name: "updated_at", nullable: false })
    updated_at: Date;

  @OneToMany(() => AddressEntity, (address) => address.city)
    address?: Relation<AddressEntity[]>;

  @ManyToOne(() => StateEntity, (state) => state.city)
  @JoinColumn({ name: "state_id", referencedColumnName: "id" })
    state?: Relation<StateEntity>;
}
