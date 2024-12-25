import React, { useState } from 'react';
import axios from 'axios';
import './AdminPanel.css';

const Admin = () => {
  const [formData, setFormData] = useState({
    name: '',
    denomination: '',
    year: '',
    price: '',
    issuing_country: '',
    composition: '',
    short_description: '',
    full_description: '',
    front_image: '',
    reverse_image: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/api/coins', formData)
      .then(() => alert('Coin added successfully!'))
      .catch((err) => console.error(err));
  };

  return (
    <div className="admin-panel-wrapper">
      <h1 className="admin-header">Admin Panel</h1>
      <form className="form-grid" onSubmit={handleSubmit}>

        <div className="column-left">
          <label className="label-text">Coin Name</label>
          <input
            className="input-field"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter coin name"
          />

          <label className="label-text">Face Value</label>
          <input
            className="input-field"
            type="text"
            name="denomination"
            value={formData.denomination}
            onChange={handleChange}
            placeholder="Enter face value"
          />

          <label className="label-text">Year of Issue</label>
          <input
            className="input-field"
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            placeholder="Enter year"
          />

          <label className="label-text">Price</label>
          <input
            className="input-field"
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
          />

          <label className="label-text">Country</label>
          <input
            className="input-field"
            type="text"
            name="issuing_country"
            value={formData.issuing_country}
            onChange={handleChange}
            placeholder="Enter country"
          />

          <label className="label-text">Metal</label>
          <input
            className="input-field"
            type="text"
            name="composition"
            value={formData.composition}
            onChange={handleChange}
            placeholder="Enter metal"
          />
        </div>

        <div className="column-middle">
          <label className="label-text">Short Description</label>
          <textarea
            className="textarea-field"
            name="short_description"
            rows="3"
            value={formData.short_description}
            onChange={handleChange}
            placeholder="Write a short description"
          ></textarea>

          <label className="label-text">Long Description</label>
          <textarea
            className="textarea-field"
            name="full_description"
            rows="6"
            value={formData.full_description}
            onChange={handleChange}
            placeholder="Write a detailed description"
          ></textarea>
        </div>

        <div className="column-right">
          <label className="label-text">Link to Obverse Image</label>
          <input
            className="input-field"
            type="url"
            name="front_image"
            value={formData.front_image}
            onChange={handleChange}
            placeholder="Paste URL for obverse image"
          />

          <label className="label-text">Link to Reverse Image</label>
          <input
            className="input-field"
            type="url"
            name="reverse_image"
            value={formData.reverse_image}
            onChange={handleChange}
            placeholder="Paste URL for reverse image"
          />
        </div>
      </form>

      <div className="actions">
        <button type="button" className="button-cancel" onClick={() => setFormData({})}>
          Cancel
        </button>
        <button type="submit" className="button-save" onClick={handleSubmit}>
          Save
        </button>
      </div>
    </div>
  );
};

export default Admin;
