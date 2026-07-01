import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Login.css";
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";

export default function Login() {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await API.post("/api/auth/login", {
                email,
                password
            });
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            if (res.data.user.role === "admin") {
                navigate("/dashboard");
            } else {
                navigate("/employee/profile");
            }
        } catch (err) {
            alert(err.response?.data?.message || "Login Failed");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="logo">CDS</div>
                {/* <p>Employee Onboarding Portal</p> */}
                <form
                    onSubmit={handleLogin}
                    className="form"
                >
                    <div className="inp-field">
                        <label>Email :</label>
                        <input
                            type="email"
                            placeholder="you@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input" />
                    </div>
                    <div className="inp-field">
                        <label>Password :</label>
                        <input
                            type={
                                visible ? "text" : "password"
                            }
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input" />
                        <span onClick={() => setVisible(!visible)}
                            className="eye-icon">{
                                visible ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}</span>
                    </div>
                    <button type="submit" className="button">
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}