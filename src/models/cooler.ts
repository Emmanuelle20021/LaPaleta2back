import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
} from "sequelize-typescript";
import Product from "./product";

@Table({
  timestamps: true,
  tableName: "nevera",
  modelName: "Cooler",
})
class Cooler extends Model {
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
  })
  declare id: Number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  declare habilitado: Boolean;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare id_cliente: Number;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare id_producto: Number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare id_pedido: Number;

  @UpdatedAt
  declare updatedAt?: Date;

  @CreatedAt
  declare createdAt: Date;
}

export default Cooler;
