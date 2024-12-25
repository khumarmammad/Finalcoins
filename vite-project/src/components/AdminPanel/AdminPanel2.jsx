import React, { useState } from 'react';
import axios from 'axios';
import './AdminPanel2.css';

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

    const handleImageClick = (event, field) => {
        const fileInput = event.target.previousElementSibling; // Скрытое поле input для загрузки файлов
        fileInput.click(); // Открываем диалог выбора файла
        fileInput.onchange = () => handleFileChange(field);
    };

    const handleFileChange = (field) => (e) => {
        const fileName = e.target.files[0]?.name;
        if (fileName) {
            setFormData((prevData) => ({
                ...prevData,
                [field]: fileName, // Сохраняем имя файла (можно заменить на URL изображения)
            }));
            alert(`Загружен файл: ${fileName}`); // Пример уведомления о загруженном файле
        }
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
                {/* Левая колонка */}
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
                    <label className="label-text">Obverse Image</label>
                    <input
                        className="input-field"
                        type="file"
                        name="front_image"
                        onChange={handleFileChange('front_image')}
                        style={{ display: 'none' }} // Скрытое поле для загрузки изображения
                    />
                    <img
                        className="image-upload"
                        src="https://via.placeholder.com/100"
                        alt="Upload obverse"
                        onClick={(e) => handleImageClick(e, 'front_image')}
                    />
                    {formData.front_image && <span>{formData.front_image}</span>} 

                    <label className="label-text">Reverse Image</label>
                    <input
                        className="input-field"
                        type="file"
                        name="reverse_image"
                        onChange={handleFileChange('reverse_image')}
                        style={{ display: 'none' }} // Скрытое поле для загрузки изображения
                    />
                    <img
                        className="image-upload"
                        src="https://via.placeholder.com/100"
                        alt="Upload reverse"
                        onClick={(e) => handleImageClick(e, 'reverse_image')}
                    />
                    {formData.reverse_image && <span>{formData.reverse_image}</span>} {/* Показываем имя файла */}
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
