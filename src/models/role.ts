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
      tableName: 'rol',
      modelName: 'Role',
  })
  class Role extends Model {
  
      @Column({
          primaryKey: true,
          type: DataType.INTEGER,
          autoIncrement: true,
      })
      declare idrol: Number;
  
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
  
  export default Role;