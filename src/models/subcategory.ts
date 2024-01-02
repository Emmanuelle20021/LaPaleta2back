import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";

@Table({
    timestamps: true,
    tableName: 'subcategoria',
    modelName: 'Subcategory',
})
class Subcategory extends Model {

    @Column({
        primaryKey: true,
        type: DataType.INTEGER,
        autoIncrement: true,
        allowNull: false,
    })
    declare idsubcategoria: Number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare nombre: String;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    })
    declare habilitado: Boolean;

    @UpdatedAt
    declare updatedAt?: Date;

    @CreatedAt
    declare createdAt: Date;
} 

export default Subcategory;