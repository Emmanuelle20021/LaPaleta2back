import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
} from "sequelize-typescript";
import User from "./user";

@Table({
  timestamps: true,
  tableName: "pedido",
  modelName: "Order",
})
class Order extends Model {
  @Column({
    primaryKey: true,
    type: DataType.NUMBER,
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

  @ForeignKey(() => User)
  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  declare id_cliente: Number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  declare fecha: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare estado: String;

  @UpdatedAt
  declare updatedAt?: Date;

  @CreatedAt
  declare createdAt: Date;
}

export default Order;
