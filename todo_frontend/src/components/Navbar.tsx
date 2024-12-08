import React from 'react'
import '../styles/global.scss'

export default function Navbar() {
    return (
        <div className="horizontal" style={{ margin: "50px", justifyContent: "space-around" }}>
            <button>ToDoApp</button>
            <button>Homepage</button>
            <button>Register</button>
            <button>Login</button>
            <button>LogOut</button>
        </div>
    )
}
