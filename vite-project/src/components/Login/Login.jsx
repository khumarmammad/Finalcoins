import { useState } from "react";
import { Link, useHistory } from "react-router-dom"; // добавляем useHistory для редиректа
import "./Login.css";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    user: '',
    pass: ''
  });

  const history = useHistory(); // Используем useHistory для редиректа

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/admin/api/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials)
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(errorDetails.message || 'Login failed');
      }

      const data = await response.json();  
      console.log("Received Response:", data);

      // Перенаправляем на страницу админ-панели после успешного логина
      history.push("/admin/dashboard");

    } catch (error) {
      console.error('Error during login:', error);
    }

    console.log("Sent form data:", JSON.stringify(credentials));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleLogin} className="admin-login-form">
      <h2 className="admin-header">Admin Panel</h2>

      <div className="input-fields-container">
        <label htmlFor="user">Username</label>
        <input 
          type="text" 
          id="user" 
          name="user" 
          className="input-field" 
          value={credentials.user} 
          onChange={handleInputChange} 
        />

        <label htmlFor="pass">Password</label>
        <input 
          type="password" 
          id="pass" 
          name="pass" 
          className="input-field" 
          value={credentials.pass} 
          onChange={handleInputChange} 
        />
      </div>

      <div className="action-buttons">
        <button type="submit" className="login-button">Log In</button>
      </div>

      <p className="center-text">
        Don't have an account? <Link to="/register" className="register-link">Register</Link>
      </p>

      <div className="back-home-container">
        <Link to="/" className="back-home-link">Back to Home</Link>
      </div>
    </form>
  );
};

export default AdminLogin;
