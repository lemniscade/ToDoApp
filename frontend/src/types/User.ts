import type Todo from "./Todo";

export default interface User {
  id: number;
  username: string;
  password: string;
  isLoggedIn: boolean;
  todos: Todo[];
}