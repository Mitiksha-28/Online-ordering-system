export { Order } from "./order";
export { MenuItem } from "./menu-item";

import { sequelize } from "./sequelize";
sequelize.sync();
export { sequelize };
