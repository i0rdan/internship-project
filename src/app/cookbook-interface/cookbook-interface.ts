import { Comment } from "../comment-interface/comment-interface";

export interface Cookbook {
  label: string,
  author: string,
  description: string,
  photo: string,
  likes: string[],
  comments: Comment[],
  views: string[],
  recepiNames: string[],
  type: string
}