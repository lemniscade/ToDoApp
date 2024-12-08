import { combineReducers } from "redux";

// Reducers:0
interface State {
    toDo: toDo[];
    todosByUser: {};
}

const initialState: State = {
    toDo: [],
    todosByUser: {},
};

export interface toDo {
    id?: number;
    username: string;
    description: string;
    toDoName: string;
}
export interface user {
    id?: number;
    username: string;
    password: string;
    error: string;
}
interface userState {
    user: {};
}
const initialUserState: userState = {
    user: {
        id: 0,
        username: "",
        password: "",
        error: "",
    },
};
// const initialUserState: userState = {
//     user:{
//         id:0,
//         username:"",
//         password:"",
//         error:""
//     }
// }
const userReducer = (state = initialUserState, action: any) => {
    switch (action.type) {
        case "REGISTER":
            return {
                ...state,
                user: {
                    ...state.user,
                    error: action.error,
                    username: action.username,
                    password: action.password,
                },
            };
        case "LOGIN":
            return {
                ...state,
                username: action.username,
                password: action.password,
                error: action.error,
            };
        case "LOGOUT":
            return { ...initialUserState };
        case "CREATE_USER_CONFLICT":
            return {
                ...state,
                user: {
                    ...state.user,
                    error: action.error,
                },
            };
        default:
            return state;
    }
};
const toDoReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case "ADD":
            return state.toDo.map((toDo) => {
                if (toDo.username === action.username) {
                    return {
                        ...state,
                        todosByUser: {
                            ...state.todosByUser,
                            [action.username]: action.toDo, // Kullanıcı adıyla ilişkili todo'ları güncelliyoruz
                        },
                    };
                }
                return toDo;
            });
        case "DELETE":
            return { ...state, id: action.id };
        case "EDIT":
            return state.toDo.map((toDo) => {
                if (toDo.id === action.id) {
                    return {
                        ...toDo,
                        description: action.description,
                    };
                }
                return toDo;
            });
        case 'LIST':
            return action.payload.todos.map((toDo: any) => {
                if (toDo.username === action.username) {
                    return {
                        ...state,
                        todosByUser: {
                            ...state.todosByUser,
                            [action.payload.username]: action.payload.todos, // Kullanıcı adıyla ilişkili todo'ları güncelliyoruz
                        },
                    }
                }
                return toDo;
            })
        default:
            return state;
    }
};

// Combine Reducers
const rootReducer = combineReducers({
    toDo: toDoReducer,
    user: userReducer,
});

export default rootReducer;
