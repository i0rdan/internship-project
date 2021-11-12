import { Cookbook } from "../cookbook-interface/cookbook-interface";
import { Recepi } from "../recepi-interface/recepi-interface";

export interface User {
  username: string,
  password: string,
  email: string,
  photo: string,
  cookbooks: Cookbook[],
  recepies: Recepi[]
}