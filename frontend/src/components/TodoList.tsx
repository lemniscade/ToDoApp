import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../contexts/UserContext";
import type ToDo from "../types/Todo";
function TodoList() {
  const [todoname, setToDoName] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState<ToDo[]>([]);
  const { state } = useUser();
  let userId = state.id;
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get<any>(
          `http://localhost:3000/todos/all/${userId}`,
        );
        if (response.data.length > 0) setTodos(response.data);
        console.log("Todo eklendi:", response.data);
      } catch (error) {
        console.error("POST hatası:", error);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async () => {
    try {
      const response = await axios.post<any>(
        "http://localhost:3000/todos/addTodo/",
        { todoname, description, userId, isCompleted: false },
      );
      
      setTodos((prevTodos) => [
      ...prevTodos,
      response.data,
    ]);

      console.log("Todo eklendi:", response.data);
    } catch (error) {
      console.error("POST hatası:", error);
    }
  };

  const removeTodo = async (id:number) => {
    try {
      const response = await axios.delete<any>(
        `http://localhost:3000/todos/${id}/`
      );

      setTodos((prevTodos) =>
      prevTodos.filter((todo) => todo.id !== id)
    );

      console.log("Todo silindi:", response.data);
    } catch (error) {
      console.error("POST hatası:", error);
    }
  };

  const updateTodo = async (id: number, currentStatus: boolean) => {
  try {
    await axios.put(
      `http://localhost:3000/todos/update/${id}/`,
      { isCompleted: !currentStatus }
    );

    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, isCompleted: !currentStatus }
          : todo
      )
    );

  } catch (error) {
    console.error("UPDATE hatası:", error);
  }
};
  return (
    <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
      <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div className="mb-4">
          <h1 className="text-grey-darkest">Todo List</h1>
          <div className="flex mt-4">
            <input
              onChange={(e) => setToDoName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
              placeholder="Enter Name for Todo"
            />
            <input
              onChange={(e) => setDescription(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
              placeholder="Enter Description for Todo"
            />
            <button
              onClick={addTodo}
              className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal"
            >
              Add
            </button>
          </div>
        </div>
        <div>
          {todos.map((todo: any) => (
            <div key={todo.id} className="flex mb-4 items-center">
              <p className={`w-full text-grey-darkest ${todo.isCompleted ? 'line-through' : ''}`}>
                {todo.todoname} - {todo.description}
              </p>
              <button onClick={() => updateTodo(todo.id, todo.isCompleted)} className="flex-no-shrink p-2 ml-2 border-2 rounded text-green border-green hover:text-white hover:bg-green">
                Done
              </button>
              <button onClick={() => removeTodo(todo.id)} className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red">
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default TodoList;
