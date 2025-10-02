import * as React from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import api from "../api/api"
import "./LoginRegister.css"

const Login = () => {
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [error, setError] =React.useState('')

    const {login} = useAuth()
    const navigate =  useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch("https://pokedexbackend-la0a.onrender.com/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: username, password: password })
            });

            if(!response.ok) {
                throw new error("Invalid credentials")
            }

            const data = await response.json()

            login(data);


            navigate("/pokedex");
        } catch (err) {
            setError("Niepoprawny email lub hasło");
        }
    }

    return (
        <div className="main-container">
            <h1>Login</h1>
            <p>It might take a while to login</p>
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
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button type="submit">Login</button>
            </form>

            <form>
                <h3>Don't have an account?</h3>
                <button onClick={() => navigate("/register")}>Register</button>
            </form>
        </div>
    )
}

export default Login