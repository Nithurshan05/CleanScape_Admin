import './Login.css';
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import React, { useState } from 'react';
import Logo from '../../Assets/Clean Scape.png';
import { useNavigate } from 'react-router-dom';

export const logPage= () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    
    clickPasswordVisible = () => {
        setPasswordVisible(!passwordVisible);
    }

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
                                    <FaEyeSlash className="toggle-icon" onClick={clickPasswordVisibility} />
                                ) : (
                                    <FaEye className="toggle-icon" onClick={clickPasswordVisibility} />
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
  )
}

const styles = StyleSheet.create({})