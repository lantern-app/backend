import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import { DataTypes, Model } from "sequelize";

import sequelize from "database";
import { TUser, CreationAttributesUser } from "interfaces/user";

const User = sequelize.define<Model<TUser, CreationAttributesUser> & TUser>(
  "User",
  {
    _id: {
      type: DataTypes.STRING,
      defaultValue: nanoid(24),
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM,
      values: ["female", "male"],
    },
    token: {
      type: DataTypes.STRING,
      get() {
        return jwt.sign({ _id: this._id }, process.env.JWT_SECRET || "");
      },
    },
  },
  {
    tableName: "users",
    timestamps: true,
  },
);

User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
});

export default User;
