import React from 'react';
import { Link } from 'react-router-dom';
import styles from './coinItem.css';

export default function CoinItem({ coinData }) {
    return (
        <Link to={`/coins/${coinData.id}`} className={`${styles.coinItem} flex gap-30`}>
            <div className={styles.imageContainer}>
                <img src={coinData?.imgFrontUrl} alt={`${coinData?.name || 'Coin'} Front`} />
            </div>
            <div className={styles.infoContainer}>
                <h2 className={styles.coinName}>{coinData?.name || 'Unknown Coin'}</h2>
                <p className={styles.coinDescription}>{coinData?.shortDesc || 'No description available'}</p>
            </div>
        </Link>
    );
}
