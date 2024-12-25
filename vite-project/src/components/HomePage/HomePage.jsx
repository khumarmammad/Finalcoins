import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; 
import Bullion from '../../assets/1.svg';
import Exclusive from '../../assets/2.svg';
import Commemorative from '../../assets/3.svg';

const HomePage = () => {
  return (
    <div className="main-container">
      <h1 className="catalog-title">
        Homepage
        <Link to="/login" className="login-link">Login</Link>
        <Link to="/register" className="register-link">Register</Link>
      </h1>
      <div className="search-container">
        <label className="label1" htmlFor="inputfield">Input field</label>
        <input className="search-field" id="inputfield" name="inputfield" type="text" />
        <button className="search-button">Search</button>
      </div>
      <Link to="/home2" className="view-all-link">
        Advanced Filter &#11167;
      </Link>
      <div className="coins-gallery">
        <div>
          <h2 className="category-title">Bullion Coins</h2>
          <Link to="/list" className="view-all-link">Show All  &#62;</Link>
          <img src={Bullion} alt="Bullion Coins" className="coin-image" />
        </div>
        <div>
          <h2 className="category-title">Exclusive Coins</h2>
          <Link to="/list" className="view-all-link">Show All &#62;</Link>
          <img src={Exclusive} alt="Exclusive Coins" className="coin-image" />
        </div>
        <div>
          <h2 className="category-title">Commemorative Coins</h2>
          <Link to="/list" className="view-all-link">Show All &#62;</Link>
          <img src={Commemorative} alt="Commemorative Coins" className="coin-image" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
