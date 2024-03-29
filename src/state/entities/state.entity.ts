import { CityEntity } from "../../city/entities/city.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm";

@Entity({
  name: "state",
})
export class StateEntity {
    @PrimaryGeneratedColumn("rowid")
      id: number;

    @Column({ name: "name", nullable: false })
      name: string;

    @Column({ name: "uf", nullable: false })
      uf: string;
      
    @Column({ name: "created_at", nullable: false })
      created_at: Date;

    @Column({ name: "updated_at", nullable: false })
      updated_at: Date;

      @OneToMany(()=> CityEntity, (city) => city.state)
        city?: Relation<CityEntity[]>;
}
