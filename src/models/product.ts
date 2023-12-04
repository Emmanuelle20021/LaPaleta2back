import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
} from "sequelize-typescript";
import Category from "./category";
import Subcategory from "./subcategory";

@Table({
    timestamps: true,
    tableName: 'producto',
    modelName: 'Product',
})
class Product extends Model {

    @Column({
        primaryKey: true,
        type: DataType.NUMBER,
        autoIncrement: true,
        allowNull: false,
    })
    declare id: Number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare nombre: String;

    @Column({
        type: DataType.DECIMAL,
        allowNull: false,
    })
    declare precio: Number;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    declare descripción: String;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    })
    declare habilitado: Boolean;

    @ForeignKey(() => Category)
    @Column({
        type: DataType.NUMBER,
        allowNull: false,
    })
    declare id_categoria: Number;

    @ForeignKey(() => Subcategory)
    @Column({
        type: DataType.NUMBER,
        allowNull: false,
    })
    declare id_subcategoria: Number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare foto_producto: String;

    @UpdatedAt
    declare updatedAt?: Date;

    @CreatedAt
    declare createdAt: Date;
} 

export default Product;