import React, { useState } from 'react';
import { FiFacebook, FiGithub, FiTwitter } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = ({ registerPath, resetPath }) => {
    const [email, setEmail] = useState('serendib@gmail.com');
    const [password, setPassword] = useState('Anubaba@123');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate(); // Hook to navigate programmatically

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        const baseUrl = import.meta.env.VITE_BASEURL;
        try {
            const response = await axios.post('https://localhost:7053/api/User/login', {
                userName: email,
                password,
            });

            // Save tokens to local storage
            const { accessToken, refreshToken } = response.data;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            alert('Login successful!');

            // Navigate to the home page or another route
            navigate('/');
        } catch (err) {
            setError('Failed to login. Please check your credentials.');
            console.error(err.response?.data || err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h2 className="fs-20 fw-bolder mb-4">Login</h2>
            <h4 className="fs-13 fw-bold mb-2">Login to your account</h4>
            <p className="fs-12 fw-medium text-muted">
                Thank you for getting back to <strong>Nelel</strong> web applications. Let's access our best recommendation for you.
            </p>
            <form onSubmit={handleLogin} className="w-100 mt-4 pt-2">
                <div className="mb-4">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Email or Username"
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
                    <div>
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="rememberMe" />
                            <label className="custom-control-label c-pointer" htmlFor="rememberMe">
                                Remember Me
                            </label>
                        </div>
                    </div>
                </div>
                <div className="mt-5">
                    <button type="submit" className="btn btn-lg btn-primary w-100" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </div>
                {error && <p className="mt-3 text-danger">{error}</p>}
            </form>
            <div className="mt-5 text-muted">
                <span> Don't have an account?</span>
                <Link to={registerPath} className="fw-bold">
                    {' '}
                    Create an Account
                </Link>
            </div>
        </>
    );
};

export default LoginForm;
