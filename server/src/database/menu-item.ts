import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { sequelize } from "./sequelize";

export class MenuItem extends Model<InferAttributes<MenuItem>, InferCreationAttributes<MenuItem>> {
  public declare id: number;
  public declare name: string;
  public declare price: number;
  public declare description: string;
  public declare image: string;
}

MenuItem.init(
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
