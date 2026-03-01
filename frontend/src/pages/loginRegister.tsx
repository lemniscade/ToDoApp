import React, { useState } from "react";
import type User from "../types/User";
import axios from "axios";
import { Link } from "react-router-dom";
import type Todo from "../types/Todo";
import { useUser } from "../contexts/UserContext";

function LoginRegister() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [isRegisterOperation, setIsRegisterOperation] = useState<boolean>(true);
  const {state, login, register} = useUser();
  let updatedUser: User;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submit edildi:", { username, password });
    try {
      if (isRegisterOperation) {
        const isUserExists = await axios.get<any>(
          `http://localhost:3000/users/user/${username}`,
        );
        if (isUserExists.data) {
          alert(
            "Bu kullanıcı zaten mevcut. Lütfen farklı bir kullanıcı adı deneyin veya giriş yapın.",
          );
          return;
        }

        const response = await axios.post<any>(
          "http://localhost:3000/users/register",
          { username, password },
        );
        setUser(response.data);
        register(response.data);
        setUsername("");
        setPassword("");
      } else {
        const isUserExists = await axios.get<any>(
          `http://localhost:3000/users/user/${username}`,
        );
        if (!isUserExists.data) {
          alert(
            "Kullanıcı bulunamadı. Lütfen kayıt olun veya kullanıcı adını kontrol edin.",
          );
          return;
        }else{
        if(todos==null){
          updatedUser = { ...isUserExists.data, todos: [] };
        }

        setUser(updatedUser);
        login(updatedUser);
        setUsername("");
        setPassword("");
      }
      console.log("Login Başarılı. Kullanıcı verisi:", updatedUser);
    }
      
    } catch (error) {
      console.error("POST hatası:", error);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-gray-600">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
          alt="Your Company"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          action="#"
          method="POST"
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div>
            <label
              htmlFor="username"
              className="block text-sm/6 font-medium text-gray-100"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                name="username"
                required
                autoComplete="username"
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-100"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-400 hover:text-indigo-300"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              {isRegisterOperation ? "Register" : "Login"}
            </button>
            <p className="text-indigo-400 hover:text-indigo-300">
              Have you already registered?
              <Link
                to="#"
                onClick={() => setIsRegisterOperation(!isRegisterOperation)}
                className="inline-block ml-4"
              >
                Login here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginRegister;
