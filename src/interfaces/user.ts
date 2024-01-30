import { Optional } from "sequelize";

export interface TUser {
  _id: string;
  username: string;
  name: string;
  password: string;
  gender: string;
  token?: string;
}

export type CreationAttributesUser = Optional<TUser, "_id">;
