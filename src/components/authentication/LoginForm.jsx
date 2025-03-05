import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utilities/firebaseConfig";

const LoginForm = ({ registerPath, resetPath }) => {
    const [email, setEmail] = useState("at@gmail.com");
    const [password, setPassword] = useState("At1234");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Get Firebase authentication token
            const idToken = await user.getIdToken();

            // Save user details to localStorage
            localStorage.setItem("accessToken", idToken);
            localStorage.setItem("userEmail", user.email);

            alert("Login successful!");
            navigate("/");
        } catch (err) {
            setError("Failed to login. Please check your credentials.");
            console.error("Login Error:", err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h2 className="fs-20 fw-bolder mb-4">Login</h2>
            <h4 className="fs-13 fw-bold mb-2">Login to your account</h4>
            <p className="fs-12 fw-medium text-muted">
                Thank you for getting back to <strong>Nelel</strong> web applications. Let's access our best recommendations for you.
            </p>
            <form onSubmit={handleLogin} className="w-100 mt-4 pt-2">
                <div className="mb-4">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="d-flex align-items-center justify-content-between">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="rememberMe" />
                        <label className="custom-control-label c-pointer" htmlFor="rememberMe">
                            Remember Me
                        </label>
                    </div>
                </div>
                <div className="mt-4">
                    <button type="submit" className="btn btn-lg btn-primary w-100" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </div>
                {error && <p className="mt-3 text-danger">{error}</p>}
                {/* <div className="text-center mt-3">
                    <Link to={resetPath} className="text-decoration-none">Forgot Password?</Link>
                </div>
                <div className="text-center mt-2">
                    <span>Don't have an account? </span>
                    <Link to={registerPath} className="text-decoration-none">Register</Link>
                </div> */}
            </form>
        </div>
    );
};

export default LoginForm;
