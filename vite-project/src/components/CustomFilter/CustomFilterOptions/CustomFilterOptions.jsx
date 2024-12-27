import React, { useEffect, useState } from "react";
import styles from "./CustomFilterOptions.module.css";
import { useSelector } from "react-redux";

const CustomFilterOptions = ({ searchData, setSearchData }) => {
    const { assets } = useSelector(state => state.asset);
    const [regions, setRegions] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [grades, setGrades] = useState([]);

    const updateSearchData = (name, value) => {
        setSearchData({ ...searchData, [name]: value });
    };

    useEffect(() => {
        if (assets.length) {
            const uniqueRegions = [...new Set(assets.map((asset) => asset.region))];
            setRegions(uniqueRegions);

            const uniqueMaterials = [...new Set(assets.map((asset) => asset.material))];
            setMaterials(uniqueMaterials);

            const uniqueGrades = [...new Set(assets.map((asset) => asset.grade))];
            setGrades(uniqueGrades);
        }
    }, [assets]);

    return (
        <div className={styles.customFilterOptions}>
            <div className={styles.row}>
                <div className={styles.filterGroup}>
                    <label htmlFor="region">Issuing Region</label>
                    <select
                        id="region"
                        value={searchData.region}
                        onChange={(e) => updateSearchData("region", e.target.value)}
                    >
                        <option value="">Select</option>
                        {
                            regions.length
                                ?
                                regions.map((region, key) => (
                                    <option value={region} key={key}>{region}</option>
                                ))
                                :
                                <></>
                        }
                    </select>
                </div>

                <div className={styles.filterGroup}>
                    <label htmlFor="material">Material</label>
                    <select
                        id="material"
                        value={searchData.material}
                        onChange={(e) => updateSearchData("material", e.target.value)}
                    >
                        <option value="">Select</option>
                        {
                            materials.length
                                ?
                                materials.map((material, key) => (
                                    <option value={material} key={key}>{material}</option>
                                ))
                                :
                                <></>
                        }
                    </select>
                </div>

                <div className={styles.filterGroup}>
                    <label htmlFor="grade">Coin Grade</label>
                    <select
                        id="grade"
                        value={searchData.grade}
                        onChange={(e) => updateSearchData("grade", e.target.value)}
                    >
                        <option value="">Select</option>
                        {
                            grades.length
                                ?
                                grades.map((grade, key) => (
                                    <option value={grade} key={key}>{grade}</option>
                                ))
                                :
                                <></>
                        }
                    </select>
                </div>
            </div>

            <div className={styles.row}>
                <div className={styles.filterGroup}>
                    <label htmlFor="priceFrom">Price Range</label>
                    <div className={styles.rangeInputs}>
                        <div className="flex a-center g10">
                            <label htmlFor="priceFrom">From</label>
                            <input
                                type="number"
                                id="priceFrom"
                                placeholder="From"
                                value={searchData.priceFrom}
                                onChange={(e) => updateSearchData("priceFrom", e.target.value)}
                            />
                        </div>
                        <div className="flex a-center g10">
                            <label htmlFor="priceTo">To</label>
                            <input
                                type="number"
                                id="priceTo"
                                placeholder="To"
                                value={searchData.priceTo}
                                onChange={(e) => updateSearchData("priceTo", e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.filterGroup}>
                    <label htmlFor="yearFrom">Year of Issue</label>
                    <div className={styles.rangeInputs}>
                        <div className="flex a-center g10">
                            <label htmlFor="yearFrom">From</label>
                            <input
                                type="number"
                                id="yearFrom"
                                placeholder="From"
                                value={searchData.yearFrom}
                                onChange={(e) => updateSearchData("yearFrom", e.target.value)}
                            />
                        </div>
                        <div className="flex a-center g10">
                            <label htmlFor="yearTo">To</label>
                            <input
                                type="number"
                                id="yearTo"
                                placeholder="To"
                                value={searchData.yearTo}
                                onChange={(e) => updateSearchData("yearTo", e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomFilterOptions;
