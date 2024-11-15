import { sequelize } from "./sequelize";
export { Order } from "./order";
export { MenuItem } from "./menu-item";
export { User, Session } from "./relations";

// sequelize.sync({ force: true });
export { sequelize };
