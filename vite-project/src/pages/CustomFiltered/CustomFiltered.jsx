import React from 'react'
import CustomFilter from './../components/customFilter/CustomFilter'
import CustomCoinsList from '../../components/customCoinsList/CustomCoinsList'
import { useSelector } from 'react-redux'

export default function CustomFiltered() {
    const { filteredCoins } = useSelector((state) => state.coin)
    return (
        <div className={styles.customFiltered}>
            <div className="heading">Coin Collection</div>
            <CustomFilter />
            <CustomCoinsList coins={filteredCoins} />
        </div>
    )
}