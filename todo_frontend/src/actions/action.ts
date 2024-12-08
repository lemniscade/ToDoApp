import axios from 'axios'
import { toDo } from '../reducers/reducer';
const url = 'http://localhost:5138/api'
export const register_user = (username: string, password: string) => ({
    type: "REGISTER",
    username: username,
    password: password,
});
export const create_user_conflict = (error: string) => ({
    type: "CREATE_USER_CONFLICT",
    error: error
});
export const login_user = (username: string, password: string) => ({
    type: "LOGIN",
    username: username,
    password: password
});
export const logout_user = () => ({
    type: "LOGOUT"
});
export const list_todo = (username: string, todos: toDo[]) => ({
    type: "LIST",
    payload: { username, todos },
});
export const add_todo = (username: string, description: string, toDoName: string) => ({
    type: "ADD",
    username: username,
    description: description,
    toDoName: toDoName
});

export const delete_todo = (id: number) => ({
    type: "DELETE",
    id: id,
});

export const edit_todo = (id: number, description: string) => ({
    type: "EDIT",
    id: id,
    description: description,
});

export const registerUser = (username: string, password: string) => {
    return async (dispatch: any) => {
        try {
            const endpoint = url + '/User/register';
            await axios.post(endpoint, {
                username: username,
                password: password
            })
            dispatch(register_user(username, password));
        } catch (error: any) {
            if (error.response.data && error.response.status === 409) {
                dispatch(create_user_conflict(error.response.data));
            }
        }

    }
}

export const loginUser = (username: string, password: string) => {
    return async (dispatch: any) => {
        await axios({
            method: 'post',
            url: '',
            data: {
                username: username,
                password: password
            }
        })
        dispatch(login_user(username, password));
    }
}

export const logoutUser = () => {
    return async (dispatch: any) => {
        await axios({
            method: 'post',
            url: '',
        })
        dispatch(logout_user());
    }
}

export const listTodo = (username: string) => {
    return async (dispatch: any) => {
        const response = await axios.post('http://localhost:5138/api/ToDo/listToDo', {
            username: username
        })
        const todos: toDo[] = await response.data;
        dispatch(list_todo(username, todos));
    }
}

export const addTodo = (description: string, username: string, toDoName: string) => {
    return async (dispatch: any) => {
        const endpoint = url + '/ToDo/addToDo';
        await axios.post(endpoint, {
            username: username,
            description: description,
            toDoName: toDoName
        })
        dispatch(add_todo(username, description, toDoName));
    }
}

export const deleteTodo = (id: number) => {
    return async (dispatch: any) => {
        await axios({
            method: 'post',
            url: '',
            data: {
                id: id
            }
        })
        dispatch(delete_todo(id));
    }
}

export const editTodo = (id: number, description: string) => {
    return async (dispatch: any) => {
        await axios({
            method: 'post',
            url: '',
            data: {
                id: id,
                description: description
            }
        })
        dispatch(edit_todo(id, description));
    }
}