import { Link } from 'react-router-dom';
import './HomePage2.css';

const FilterPage = () => {
    return (
        <div className="homepage-wrapper">
            <div className="header-container">
                <h1 className="catalog-title">
                    Homepage
                    <Link to="/login" className="login-link">Login</Link>
                    <Link to="/register" className="register-link">Register</Link>
                </h1>
                <div className="search-container">
                    <label className="search-label" htmlFor="inputfield">Input field</label>
                    <input className="search-field" id="inputfield" name="inputfield" type="text" />
                    <button className="search-button">Search</button>
                </div>
            <Link to="/home" className="back-to-home-link">Advanced Filter &#11164;</Link>
            </div>
            <div className="filter-options">
                <div className="filter-left">
                    <form>
                        <label htmlFor="countrySelect">Issuing Country:</label>
                        <select className="filter-select" id="countrySelect">
                            <option value="canada">Canada</option>
                            <option value="usa">USA</option>
                            <option value="mexico">Mexico</option>
                            <option value="azerbaijan">Azerbaijan</option>
                            <option value="russia">Russia</option>
                            <option value="germany">Germany</option>
                            <option value="france">France</option>
                            <option value="uk">United Kingdom</option>
                            <option value="china">China</option>
                            <option value="japan">Japan</option>
                        </select>
                    </form>
                    <form>
                        <label htmlFor="metalSelect">Metal:</label>
                        <select className="filter-select" id="metalSelect">
                            <option value="gold">Gold</option>
                            <option value="silver">Silver</option>
                            <option value="bronze">Bronze</option>
                        </select>
                    </form>
                    <form>
                        <label htmlFor="qualitySelect">Quality of the coin:</label>
                        <select className="filter-select" id="qualitySelect">
                            <option value="proof">Proof</option>
                            <option value="uncirculated">Brilliant Uncirculated</option>
                            <option value="mint-state">Mint State</option>
                        </select>
                    </form>
                </div>
                <div className="filter-right">
                    <div className="price-range">
                        <label>Price</label>
                        <div className="price-inputs">
                            <span>From</span>
                            <input type="number" className="range-input" placeholder="Min" />
                            <span>To</span>
                            <input type="number" className="range-input" placeholder="Max" />
                        </div>
                    </div>
                    <div className="issue-range">
                        <label>Year of Issue</label>
                        <div className="issue-inputs">
                            <span>From</span>
                            <input type="number" className="range-input" placeholder="From Year" />
                            <span>To</span>
                            <input type="number" className="range-input" placeholder="To Year" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterPage;
