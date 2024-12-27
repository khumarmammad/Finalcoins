import React from 'react';
import CoinItem from '../CoinItem/CoinItem'; 
import styles from './coinCollection.module.css'; 

export default function CoinCollection({ coinData }) { 
  return (
    <div className={styles.coinCollection}>
      {
        coinData.length > 0 ? (
          coinData.map((item) => (
            <CoinItem key={item.id} coinData={item} />
          ))
        ) : (
          <p className={styles.noData}>Məlumat tapılmadı</p> 
        )
      }
    </div>
  );
}
