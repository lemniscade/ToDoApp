import { createContext, useContext, type ReactNode,useReducer } from "react";

interface Todo {
  id: number;
  description: string;
  todos: Todo[];
}


type TodoActions =
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'REMOVE_TODO'; payload: number }
  | { type: 'UPDATE_TODO'; payload: Todo };

  const initialState: Todo = {
    id: 0,
    description: '',
    todos: [],
  };


  const todoReducer = (state: Todo, action: TodoActions): Todo => {
  switch (action.type) {
    case 'ADD_TODO':
      return { ...state, todos: [...state.todos, action.payload] };
    case 'REMOVE_TODO':
      return { ...state, todos: state.todos.filter(todo => todo.id !== action.payload) };
    case 'UPDATE_TODO':
      return { ...state, todos: state.todos.map(todo => todo.id === action.payload.id ? action.payload : todo) };
    default:
      return state;
  }
};

interface TodoContextType {
  state: Todo;
  dispatch: React.Dispatch<TodoActions>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

interface TodoProviderProps {
  children: ReactNode;
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = (): TodoContextType => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return context;
};