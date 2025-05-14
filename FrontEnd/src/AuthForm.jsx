import React, { useState } from 'react';
import './form.css';
import 'boxicons/css/boxicons.min.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [loginData, setLoginData] = useState({ username: '', password: '' });

  const [registerData, setRegisterData] = useState({
    name: '',
    rollNumber: '',
    email: '',
    groupNumber: '',
    password: '',
    confirmPassword: '',
  });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        alert('Login successful');
      } else {
        alert(`Login failed: ${data.message}`);
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('An error occurred. Please try again.');
    }
  };

  // Handle register submit
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword, groupNumber } = registerData;

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    let formattedGroupNumber = groupNumber;
    if (formattedGroupNumber.startsWith('G-')) {
      formattedGroupNumber = formattedGroupNumber.split('G-')[1];
    }

    const payload = {
      ...registerData,
      groupNumber: formattedGroupNumber,
    };

    try {
      const res = await fetch('http://localhost:3000/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        alert('Registration successful');
      } else {
        alert(`Registration failed: ${data.message}`);
      }
    } catch (err) {
      console.error('Register error:', err);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className={`container ${!isLogin ? 'active' : ''}`}>
      {/* Login Form */}
      <div className="form-box login">
        <form onSubmit={handleLoginSubmit}>
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="Username"
              value={loginData.username}
              onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
              required
            />
            <i className='bx bxs-user'></i>
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              required
            />
            <i className='bx bxs-lock'></i>
          </div>
          <div className="forget-link">
            <a href="#">Forget Password?</a>
          </div>
          <button type="submit" className="btn">Login</button>
        </form>
      </div>

      {/* Register Form */}
      <div className="form-box register">
        <form onSubmit={handleRegisterSubmit}>
          <div className="input-box">
            <input
              type="text"
              placeholder="Full Name"
              value={registerData.name}
              onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
              required
            />
            <i className='bx bxs-user'></i>
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="Roll number"
              value={registerData.rollNumber}
              onChange={(e) => setRegisterData({ ...registerData, rollNumber: e.target.value })}
              required
            />
            <i className='bx bxs-user'></i>
          </div>
          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              value={registerData.email}
              onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
              required
            />
            <i className='bx bxl-gmail'></i>
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="Group Number (e.g., 2)"
              value={registerData.groupNumber}
              onChange={(e) => setRegisterData({ ...registerData, groupNumber: e.target.value })}
              required
            />
            <i className='bx bxs-group'></i>
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              value={registerData.password}
              onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
              required
            />
            <i className='bx bxs-lock'></i>
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Confirm Password"
              value={registerData.confirmPassword}
              onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
              required
            />
            <i className='bx bxs-lock'></i>
          </div>
          <button type="submit" className="btn">Register</button>
        </form>
      </div>

      {/* Toggle Panel */}
      <div className="toggle-box">
        <div className="toggle-panel toggle-left">
          <h1>Hello, Welcome!</h1>
          <p>Don't have an account?</p>
          <button className="btn register-btn" onClick={() => setIsLogin(false)}>Register</button>
        </div>
        <div className="toggle-panel toggle-right">
          <h1>Welcome Back</h1>
          <p>Already have an account?</p>
          <button className="btn login-btn" onClick={() => setIsLogin(true)}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
