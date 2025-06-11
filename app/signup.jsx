import React, { useState } from 'react';
import { FaApple, FaEnvelope, FaEye, FaEyeSlash, FaLock, FaPhone } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import vpaylogo from '../assets/images/vpaylogo.png'; // Adjust the path as necessary

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
            {/* Section 1: Logo */}
            <div style={{ marginBottom: '20px' }}>
            <img src={vpaylogo} style={{ width: '150px' }} />
            </div>

            {/* Section 2: Input Fields */}
            <div style={{ marginBottom: '20px' }}>
                <div style={{ position: 'relative', marginBottom: '10px' }}>
                    <FaPhone style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', color: 'rgba(88, 0, 151, 1)' }} />
                    <input
                        type="text"
                        placeholder="Phone Number"
                        style={{ width: '100%', padding: '10px 10px 10px 40px', boxSizing: 'border-box' }}
                    />
                </div>
                <div style={{ position: 'relative', marginBottom: '10px' }}>
                    <FaEnvelope style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', color: 'rgba(88, 0, 151, 1)' }} />
                    <input
                        type="email"
                        placeholder="Email"
                        style={{ width: '100%', padding: '10px 10px 10px 40px', boxSizing: 'border-box' }}
                    />
                </div>
                <div style={{ position: 'relative', marginBottom: '10px' }}>
                    <FaLock style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', color: 'rgba(88, 0, 151, 1)' }} />
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        style={{ width: '100%', padding: '10px 10px 10px 40px', boxSizing: 'border-box' }}
                    />
                    <span
                        onClick={togglePasswordVisibility}
                        style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer', color: 'rgba(88, 0, 151, 1)' }}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                <div style={{ position: 'relative', marginBottom: '10px' }}>
                    <FaLock style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', color: 'rgba(88, 0, 151, 1)' }} />
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm Password"
                        style={{ width: '100%', padding: '10px 10px 10px 40px', boxSizing: 'border-box' }}
                    />
                    <span
                        onClick={toggleConfirmPasswordVisibility}
                        style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer', color: 'rgba(88, 0, 151, 1)' }}
                    >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
            </div>

            {/* Section 3: Create Account Button */}
                        <div style={{ marginBottom: '20px' }}>
                            <button
                                onClick={() => window.location.href = '/emailverification'}
                                style={{ padding: '10px 20px', width: '100%', backgroundColor: 'rgba(88, 0, 151, 1)', color: '#fff', border: 'none', borderRadius: '5px' }}
                            >
                                Create an Account
                            </button>
                        </div>

                        {/* Section 4: Already Have an Account */}
            <div style={{ marginBottom: '20px' }}>
                <p>Do you have an account already? <a href="/login" style={{ color: 'rgba(88, 0, 151, 1)' }}>Log in</a></p>
            </div>

            {/* Section 5: Login with Google or Apple */}
            <div>
                <hr />
                <p>Or log in with</p>
                <div style={{ marginBottom: '10px' }}>
                    <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#fff' }}>
                        <FcGoogle style={{ marginRight: '10px' }} /> Google
                    </button>
                </div>
                <div>
                    <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#fff' }}>
                        <FaApple style={{ marginRight: '10px' }} /> Apple
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;