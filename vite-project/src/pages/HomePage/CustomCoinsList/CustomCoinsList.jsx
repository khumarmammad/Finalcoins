import React, { useEffect } from 'react';
import styles from './customCoinsList.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from '../../../../icons';
import { COINS_API_URL } from '../../../../config';
import { useDispatch, useSelector } from 'react-redux';
import { setCoinCategory, setFilteredItems } from '../../../redux/slice';

export default function CustomCoinsList() {
    const { coins } = useSelector(state => state.coin);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const categories = [
        {
            heading: "Bullion coins",
            navigateTo: "",
            image: "https://i.postimg.cc/mkdPNp9f/South-Vietnamese-Dong-1.png",
            type: "investment"
        },
        {
            heading: "Exclusive coins",
            navigateTo: "",
            image: "https://i.postimg.cc/QdzprCHG/ISK-2.png",
            type: 'exclusive'
        },
        {
            heading: "Commemorative coins",
            navigateTo: "",
            image: "https://i.postimg.cc/J44JDZXC/Looney-1.png",
            type: "memorable"
        },
    ];

    const objectToQuery = (obj) => {
        const params = [];

        Object.keys(obj).forEach((key) => {
            const value = obj[key];
            if (value) {
                params.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
            }
        });

        return params.length ? `?${params.join('&')}` : '';
    };

    const displayAll = async (category) => {
        const queryString = objectToQuery({ type: category });
        const url = `${COINS_API_URL}/coinsSearch${queryString}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Error fetching data');
            }

            const results = await response.json();
            console.log('Server response:', results);
            dispatch(setFilteredItems(results));
            dispatch(setCoinCategory(category));
            navigate('/filtered');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        dispatch(setCoinCategory(''));
        dispatch(setFilteredItems(coins));
    }, [dispatch, coins]);

    return (
        <div className={styles.customCoinsList}>
            {
                categories.map((category, key) => (
                    <div className={styles.customCoinsList_element} key={key}>
                        <h2>{category.heading}</h2>
                        <span to={'/filtered'} onClick={() => displayAll(category.type)}>
                            Show all
                            {ArrowRight}
                        </span>
                        <img src={category.image} alt="" />
                    </div>
                ))
            }
        </div>
    );
}
