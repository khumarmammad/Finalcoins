import React from 'react';
import CustomFilter from '../../components/CustomFilter/CustomFilter';
import styles from './HomePage.css';
import CustomCoinsList from './components/customCoinsList/CustomCoinsList';

export default function HomePage() {
  return (
    <div className={styles.homePage}>
        <div className="heading">Home Page</div>
        <CustomFilter />
        <CustomCoinsList />
    </div>
  );
}
