import { Comment } from "../comment-interface/comment-interface";

export interface Recepi {
  title: string,
  author: string,
  description: string,
  directions: string,
  photo: string,
  ingridiens: string[],
  views: string[],
  likes: string[],
  comments: Comment[],
  time: number
}