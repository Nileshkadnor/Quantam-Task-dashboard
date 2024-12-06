import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../App.css';

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", formData);

            if (response?.data) { 
                localStorage.setItem("user", JSON.stringify(response.data));
                navigate("/dashboard");
            } else {
                throw new Error("Unexpected response format");
            }
        } catch (err) {
            
            if (err.response) {
                
                alert(err.response.data.error || "Login failed.");
            } else if (err.request) {
                
                alert("No response from the server. Please try again later.");
            } else {
                
                alert(`Error: ${err.message}`);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
