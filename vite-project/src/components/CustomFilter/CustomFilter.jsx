import React, { useState } from 'react'
import styles from './customFilter.module.css'
import FilterOptions from './filterOptions/FilterOptions'
import { DownArrow, UpArrow } from '../../icons'
import { API_URL } from '../../config'
import { useDispatch, useSelector } from 'react-redux'
import { updateFilteredData } from '../../redux/slice'
import { useNavigate } from 'react-router-dom'

export default function CustomFilter() {
    const { selectedType } = useSelector(state => state.asset)
    const [searchData, setSearchData] = useState({
        query: ''
    })
    const [isAdvanced, setIsAdvanced] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSearchDataChange = (field, value) => {
        setSearchData(state => {
            return { ...state, [field]: value }
        })
    }

    const convertToQueryString = (data) => {
        const queryParams = [];

        Object.keys(data).forEach((key) => {
            const value = data[key];
            if (value) {
                queryParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
            }
        });

        return queryParams.length ? `?${queryParams.join('&')}` : '';
    };

    const handleSubmit = async () => {
        const queryString = convertToQueryString({ ...searchData, type: selectedType });
        const url = `${API_URL}/searchAssets${queryString}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Error fetching data');
            }

            const results = await response.json();
            console.log('Server response:', results);
            dispatch(updateFilteredData(results))
            navigate('/results')
            setIsAdvanced(false)
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className={styles.customFilter}>
            <form>

                <div className="formSection">
                    <label>
                        Search Field
                    </label>
                    <div className="flex g30">
                        <input name='query' type="text" onChange={(e) => handleSearchDataChange(e.target.name, e.target.value)} />
                        <button onClick={handleSubmit} type='button' className="submitButton">
                            Search
                        </button>
                    </div>
                </div>

                <p onClick={() => setIsAdvanced(!isAdvanced)}>Advanced Search Options <span>{isAdvanced ? UpArrow : DownArrow}</span> </p>

                {
                    isAdvanced
                        ?
                        <FilterOptions status={true} searchData={searchData} setSearchData={setSearchData} />
                        :
                        <></>
                }
            </form>
        </div>
    )
}
