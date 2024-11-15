import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  UUIDV4,
} from "sequelize";
import { UUID } from "node:crypto";
import { sequelize } from "./sequelize";

export class Session extends Model<InferAttributes<Session>, InferCreationAttributes<Session>> {
  public declare id: CreationOptional<UUID>;
  public declare userId: ForeignKey<UUID>;
  public declare token: string;
  public declare duration: CreationOptional<number>;
  public declare deletedAt: NonAttribute<Date>;
  public declare createdAt: NonAttribute<Date>;
  public declare updatedAt: NonAttribute<Date>;
}

Session.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV4,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: Date.now() + 1000 * 60 * 60 * 24 * 7,
    },
  },
  { sequelize, modelName: "session", paranoid: true },
);
