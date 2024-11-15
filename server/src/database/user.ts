import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  UUIDV4,
} from "sequelize";
import { UUID } from "node:crypto";
import { sequelize } from "./sequelize";
import { createHash } from "crypto";

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  public declare id: CreationOptional<UUID>;
  public declare email: string;
  public declare password: string;
  public declare idCardImage?: string;
  public declare hostelAddress?: string;
  public declare verified: CreationOptional<boolean>;
  public declare createdAt: NonAttribute<Date>;
  public declare updatedAt: NonAttribute<Date>;
  verifyPassword(password: string) {
    const hash = createHash("sha256");
    const salt = process.env.AUTH_SALT;
    if (!salt) {
      throw new Error("SALT environment variable is not set");
    }
    hash.update(password);
    hash.update(salt);
    const digested = hash.digest("hex");

    return this.password === digested;
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV4,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value: string) {
        const hash = createHash("sha256");
        const salt = process.env.AUTH_SALT;
        if (!salt) {
          throw new Error("SALT environment variable is not set");
        }
        hash.update(value);
        hash.update(salt);
        const digested = hash.digest("hex");
        this.setDataValue("password", digested);
      },
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    idCardImage: {
      type: DataTypes.BLOB("medium"),
    },
    hostelAddress: {
      type: DataTypes.STRING,
    },
  },
  { sequelize, modelName: "user", paranoid: true },
);
