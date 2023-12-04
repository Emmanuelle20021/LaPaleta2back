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
    tableName: 'categoria',
    modelName: 'Category',
})
class Category extends Model {

    @Column({
        primaryKey: true,
        type: DataType.NUMBER,
        autoIncrement: true,
        allowNull: false,
    })
    declare idcategoria: Number;

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

export default Category;