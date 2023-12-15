// @ts-nocheck
import sequelize from "database";
import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import Joi from "joi";
import { User } from "interfaces/user";

const User = sequelize.define(
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
                return jwt.sign(
                    { _id: this._id },
                    process.env.JWT_SECRET || "",
                );
            },
        },
    },
    {
        tableName: "users",
        timestamps: true,
    },
);

User.beforeCreate(async (user, options) => {
    user.password = await bcrypt.hash(user.password, 10);
});

const UserValidationObject = Joi.object({
    username: Joi.string().min(3).required(),
    name: Joi.string().required(),
    password: Joi.string().min(8).required(),
    gender: Joi.string().valid("male", "female").required(),
});

const UserValidation = (user: User) => {
    return UserValidationObject.validate(user, {
        abortEarly: false,
    }).error?.details.map((item) => {
        return item["message"];
    });
};

export { User, UserValidation };
