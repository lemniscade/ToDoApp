import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { register_user, registerUser } from '../actions/action';
import { useAppDispatch } from '../hooks/hook';
import { useSelector } from 'react-redux';

export default function Register() {
    const [inputUsernameValue, setInputUsernameValue] = useState("");
    const [inputPasswordValue, setInputPasswordValue] = useState("");
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(register_user(inputUsernameValue, inputPasswordValue));
    }, [dispatch, inputUsernameValue, inputPasswordValue,]);
    const { error } = useSelector((state: any) => state.user.user);
    const handleButtonClick = () => {
        setInputUsernameValue(inputUsernameValue);
        setInputPasswordValue(inputPasswordValue);
        localStorage.setItem("username", inputUsernameValue);
        localStorage.setItem("password", inputPasswordValue);
        dispatch(registerUser(inputUsernameValue, inputPasswordValue));
        console.log("araba");

    };
    return (
        <div className='vertical'>
            <Navbar />
            <div className='vertical'>
                {error && (
                    <div>
                        {error}
                    </div>
                )}
                <input type="text" placeholder="UserName" value={inputUsernameValue} onChange={(e) => setInputUsernameValue(e.target.value)}></input>
                <input type="text" placeholder="Password" value={inputPasswordValue} onChange={(e) => setInputPasswordValue(e.target.value)}></input>
                <button onClick={handleButtonClick}>Register</button>
            </div>
        </div>
    )
}
