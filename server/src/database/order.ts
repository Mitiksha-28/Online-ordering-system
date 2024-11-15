import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "sequelize";
import { sequelize } from "./sequelize";
import type { User } from "./user";

export class Order extends Model<InferAttributes<Order>, InferCreationAttributes<Order>> {
  public declare id: CreationOptional<number>;
  public declare name: string;
  public declare price: number;
  public declare quantity: number;
  public declare total: number;
  public declare userId: ForeignKey<User["id"]>;
  public declare createdAt: NonAttribute<Date>;
  public declare updatedAt: NonAttribute<Date>;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total: {
      type: DataTypes.VIRTUAL(DataTypes.FLOAT, ["price", "quantity"]),
      get() {
        return this.getDataValue("price") * this.getDataValue("quantity");
      },
    },
  },
  {
    sequelize,
    tableName: "orders",
  },
);
