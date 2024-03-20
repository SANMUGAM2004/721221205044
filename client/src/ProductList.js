// ProductList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    companyName: '',
    categories: '',
    numberOfProducts: 0,
    minPrice: 0,
    maxPrice: 0
  });

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get('http://localhost:3001/products/categories');
//       setProducts(response.data);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:3001/products/categories', formData);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Product List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Company Name"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Category"
          name="categories"
          value={formData.categories}
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="Number of Products"
          name="numberOfProducts"
          value={formData.numberOfProducts}
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="Min Price"
          name="minPrice"
          value={formData.minPrice}
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="Max Price"
          name="maxPrice"
          value={formData.maxPrice}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {products.map((product, index) => (
          <div key={index}>
            <h3>{product.productName}</h3>
            <p>Price: {product.price}</p>
            <p>Rating: {product.rating}</p>
            <p>Discount: {product.discount}</p>
            <p>Availability: {product.availability}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
