// src/ProductForm.js
import React, { useState } from 'react';
import axios from 'axios';

const ProductForm = ({ onAddProduct }) => {
    const [product, setProduct] = useState({
        name: '',
        genre: '',
        description: '',
        price: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://node-api-tau-gray.vercel.app/products', product);
            onAddProduct(response.data);  // Call the parent component's method to add the new product
            setProduct({
                name: '',
                genre: '',
                description: '',
                price: ''
            });
        } catch (error) {
            console.error('There was an error creating the product!', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Name:
                    <input type="text" name="name" value={product.name} onChange={handleChange} required />
                </label>
            </div>
            <div>
                <label>
                    Genre:
                    <input type="text" name="genre" value={product.genre} onChange={handleChange} required />
                </label>
            </div>
            <div>
                <label>
                    Description:
                    <input type="text" name="description" value={product.description} onChange={handleChange} required />
                </label>
            </div>
            <div>
                <label>
                    Price:
                    <input type="number" name="price" value={product.price} onChange={handleChange} required />
                </label>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default ProductForm;



