import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
} from "sequelize-typescript";  
import Role from "./role";

@Table({
  timestamps: true,
  tableName: "usuario",
  modelName: "User",
})
class User extends Model {
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
  })
  declare idusuario: Number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare nombre: String;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare apellido: String;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare telefono: String;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare correo: String;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare contraseña: String;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  declare habilitado: Boolean;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare id_rol: Number;

  @UpdatedAt
  declare updatedAt?: Date;

  @CreatedAt
  declare createdAt: Date;
}

export default User;
