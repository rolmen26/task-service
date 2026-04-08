import {
  AllowNull, AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  tableName: 'users',
} as any)
export class UserPersistenceEntity extends Model<UserPersistenceEntity> {
  @PrimaryKey
  @Default(DataType.INTEGER)
  @Column({ type: DataType.INTEGER, autoIncrement: true })
  declare id: number;

  @AllowNull(false)
  @Column({ type: DataType.STRING(150), unique: true })
  declare email: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(255),
    field: 'password',
  })
  declare password: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING(150) })
  declare name: string;

  @AllowNull(false)
  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
    field: 'is_active',
  })
  declare isActive: boolean;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    field: 'created_at',
  })
  declare createdAt: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
    field: 'updated_at',
  })
  declare updatedAt: Date;
}
