import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CoinDetails() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/coins/${id}`).then(response => setCoin(response.data));
  }, [id]);

  if (!coin) return <div>Loading...</div>;
  const addToCart = () => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    savedCart.push(coin);
    localStorage.setItem('cart', JSON.stringify(savedCart));
    alert('Added to cart!');
  };
  
  <button onClick={addToCart}>Add to Cart</button>;
  
  return (
    <div>
      <h1>{coin.name}</h1>
      <img src={`http://localhost:5000${coin.front_image}`} alt={coin.name} />
      <p>{coin.full_description}</p>
      {/* Additional details */}
    </div>
  );
}

export default CoinDetails;
