import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchData, fetchCategories } from "../actions/index";
import CategorySearch from "./categorySearch";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import PriceQuery from "../componnents/priceQuery";
import Pagination from "../componnents/pagination";


const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const products = useSelector((state) => state.data.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchData(currentPage, category, price, searchQuery));
  }, [dispatch, currentPage, category, price, searchQuery]);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    dispatch(fetchData(pageNumber, category, price, searchQuery));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    dispatch(fetchData(currentPage, category, price, e.target.value));
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    dispatch(fetchData(currentPage, e.target.value, price, searchQuery));
  };

  return (
    <div className="App container">
      <div className="search-container my-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            style={{ flex: "2" }}
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <div style={{ marginRight: '10px' }}></div>
          <CategorySearch handleCategoryChange ={handleCategoryChange} />
          <div style={{ marginRight: '10px' }}></div>
          <PriceQuery handlePriceChange={handlePriceChange} />
        </div>
      </div>

      <div className="products-grid row justify-content-center">
        {products.map((product) => (
          <div key={product._id} className="product-item col-md-3 m-4">
            <div className="product-category">Category: <b>{product.category}</b></div>
            <div className="product-price">${product.price}</div>
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
          </div>
        ))}
      </div>
      <Pagination/>
    </div>
  );
};

export default App;
