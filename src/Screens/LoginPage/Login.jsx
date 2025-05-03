import './Login.css';
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import React, { useState } from 'react';
import Logo from '../../Assets/Clean Scape.png';
import { useNavigate } from 'react-router-dom';
export const Login = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // Initialize navigate hook
    
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    const handleUsernameInput = (event) => {
        setUsername(event.target.value);
        // Reset error when user starts typing
        setUsernameError(false); 
        setErrorMessage('');
    };
    const handlePasswordInput = (event) => {
        setPassword(event.target.value);
        // Reset error when user starts typing
        setPasswordError(false); 
        setErrorMessage('');
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        // Validate username and password
        if (!username || !password) {
            setErrorMessage('Username and Password are required.');
            if (!username) setUsernameError(true);
            if (!password) setPasswordError(true);
        } else if (username !== 'admin' || password !== 'admin123') {
            setErrorMessage('Username or Password is wrong.');
            setUsernameError(true);
            setPasswordError(true);
        } else {
            setErrorMessage('');
            // Navigate to AdminDashboard
            navigate('/AdminDashboard');
        }
    };
    return (
        <div className='LoginBody'>
            <div className='logo'>
                <img src={Logo} alt='Logo' />
            </div>
            <div className='LoginWrapper'>
                <div className='form-box login'>
                    <form onSubmit={handleSubmit}>
                        <h1>Login</h1>
                        {/* Combo Box */}
                        <div className='input-box'>
                            <select className="custom-select">
                                <option value="" disabled selected>Select Role</option>
                                <option>Admin</option>
                                <option>Staffs</option>
                            </select>
                        </div>

                        <div className={`input-box ${usernameError ? 'error' : ''}`}>
                            <input
                                type="text"
                                placeholder='Username'
                                value={username}
                                onChange={handleUsernameInput}
                                required
                            />
                            <FaUser className='icon' />
                        </div>

                        <div className={`input-box ${passwordError ? 'error' : ''}`}>
                            {isTyping && (
                                passwordVisible ? (
                                    <FaEyeSlash className="toggle-icon" onClick={togglePasswordVisibility} />
                                ) : (
                                    <FaEye className="toggle-icon" onClick={togglePasswordVisibility} />
                                )
                            )}
                            <input
                                type={passwordVisible ? "text" : "password"}
                                placeholder='Password'
                                value={password}
                                onChange={handlePasswordInput}
                                required
                            />
                            <FaLock className='icon' />
                        </div>

                        {errorMessage && (
                            <div className="error-message">
                                {errorMessage}
                            </div>
                        )}

                        <div className='remember-forgot'>
                            <label>
                                <input type="checkbox" /> Remember Me
                            </label>
                        </div>
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
