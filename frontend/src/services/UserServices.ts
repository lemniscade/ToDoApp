import axios from "axios";

export const getUsers = async () => {
  const response = await axios.get("http://localhost:3000/users/findAll");
  return response.data;
};

export const getUserById = async (id: number) => {
  const response = await axios.get(`http://localhost:3000/users/findOne/${id}`);
  return response.data;
};

export const deleteUser = async (id: number) => {
  const response = await axios.delete(`http://localhost:3000/users/remove/${id}`);
  return response.data;
};

export const createUser = async (username: string, password: string) => {
  const response = await axios.post("http://localhost:3000/users/create", {
    username,
    password,
  });
  return response.data;
};