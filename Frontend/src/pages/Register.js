import * as React from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import api from "../api/api"
import "./LoginRegister.css"

const Register = () => {
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [repPassword, setRepPassword] =React.useState('')
    const [error, setError] =React.useState('')

    const navigate =  useNavigate()
    const {login} = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (password !== repPassword) {
            setError("Passwords don't match");
            return;
        }


        // if (username.length > 20) {
        //     setError("Ssername can only be 20 characters long");
        //     return;
        // }

        // if (password.length > 40) {
        //     setError("Password can only be 40 characters long");
        //     return;
        // }

        setError("")

        try {

            const response = await fetch("https://pokedexbackend-la0a.onrender.com/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: username, password: password })
            });

            if(!response.ok) {
                throw new error("Username already used")
            }

            const data = await response.json();

            login(data);
            
            navigate("/pokedex");
        } catch (err) {
            setError("Username already used");
        }
    }

    return (
        <div className="main-container">
            <h1>Register</h1>
            <p>It might take a while to register</p>
            <form onSubmit={handleSubmit}>
                <input 
                    maxLength={20}
                    type="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input 
                    maxLength={40}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input 
                    maxLength={40}
                    type="password"
                    placeholder="Repeat Password"
                    value={repPassword}
                    onChange={(e) => setRepPassword(e.target.value)}
                    required
                />

                {error && <p style={{ color: "red" }}>{error}</p>}
                <button type="submit">Sign Up</button>
            </form>

            <form>
                <h3>Already have an account?</h3>
                <button onClick={() => navigate("/login")}>Sign In</button>
            </form>
        </div>
    )
}

export default Register