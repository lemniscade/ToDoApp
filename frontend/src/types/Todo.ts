import type User from "./User";

export default interface Todo {
  id: number;
  todoname: string;
  description: string;
  isCompleted: boolean;
  user:User;
}