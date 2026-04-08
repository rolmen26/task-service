import {
  AllowNull,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { UserPersistenceEntity } from '../../../auth/entity/persistence/user.persistence.entity';
import { TaskStatus } from '../task-status.enum';
import { TaskPriority } from '../task-priority.enum';

@Table({
  tableName: 'tasks',
})
export class TaskPersistenceEntity extends Model<TaskPersistenceEntity> {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  declare id: number;

  @AllowNull(false)
  @Column({ type: DataType.STRING(255) })
  declare title: string;

  @Column({ type: DataType.TEXT })
  declare description: string;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM(...Object.values(TaskStatus)),
    defaultValue: TaskStatus.PENDING,
  })
  declare status: TaskStatus;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM(...Object.values(TaskPriority)),
    defaultValue: TaskPriority.MEDIUM,
  })
  declare priority: TaskPriority;

  @Column({ type: DataType.DATE, field: 'due_date' })
  declare dueDate: Date | null;

  @ForeignKey(() => UserPersistenceEntity)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'owner_id',
  })
  declare ownerId: number;

  @BelongsTo(() => UserPersistenceEntity)
  declare owner: UserPersistenceEntity;

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
