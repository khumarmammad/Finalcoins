import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate(); // Используем useNavigate для редиректа после успешной регистрации

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/admin/api/register', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(errorDetails.message || 'Registration failed');
      }

      const data = await response.json();
      console.log("Response data:", data);

      // Перенаправляем пользователя на страницу логина после успешной регистрации
      navigate("/login");

    } catch (error) {
      console.error('Error during registration:', error);
    }

    console.log("Form data sent:", JSON.stringify(formData));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleRegister} className="admin-register-form">
      <h2 className="admin-header">Admin Panel</h2>

      <div className="input-fields-container">
        <label htmlFor="email">Email</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          className="input-field" 
          value={formData.email} 
          onChange={handleInputChange} 
        />

        <label htmlFor="password">Password</label>
        <input 
          type="password" 
          id="password" 
          name="password" 
          className="password-input" 
          value={formData.password} 
          onChange={handleInputChange} 
        />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input 
          type="password" 
          id="confirmPassword" 
          name="confirmPassword" 
          className="password-input" 
          value={formData.confirmPassword} 
          onChange={handleInputChange} 
        />
      </div>

      <div className="buttons-container">
        <button type="submit" className="register-button">Register</button>
      </div>

      <p className="center-text">
        Already have an account? <Link to="/login" className="login-link">Login</Link>
      </p>

      <div className="back-home-container">
        <Link to="/" className="back-home-link">Back to Home</Link>
      </div>
    </form>
  );
};

export default AdminRegister;
