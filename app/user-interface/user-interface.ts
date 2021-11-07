import { Cookbook } from "../cookbook-interface/cookbook-interface";

export interface User {
  username: string,
  password: string,
  email: string,
  photo: string,
  cookbooks: Cookbook[];
}