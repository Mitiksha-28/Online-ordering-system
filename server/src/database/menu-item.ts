import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute } from "sequelize";
import { sequelize } from "./sequelize";
import { randomUUID, UUID } from "node:crypto";

export class MenuItem extends Model<InferAttributes<MenuItem>, InferCreationAttributes<MenuItem>> {
  public declare id: CreationOptional<UUID>;
  public declare name: string;
  public declare price: number;
  public declare description: string;
  public declare image: string;
  public declare createdAt: NonAttribute<CreationOptional<Date>>;
  public declare updatedAt: NonAttribute<CreationOptional<Date>>;
}

MenuItem.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: () => randomUUID(),
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "menu_items",
    sequelize,
  },
);
