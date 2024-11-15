import { Order } from "./order";
import { Session } from "./session";
import { User } from "./user";

User.hasOne(Session, { foreignKey: "userId", as: "session" });
Session.belongsTo(User, { foreignKey: "userId", as: "user", onDelete: "CASCADE" });

User.hasMany(Order, { foreignKey: "userId", as: "orders" });
Order.belongsTo(User, { foreignKey: "userId", as: "user", onDelete: "CASCADE" });

export { User, Session };
