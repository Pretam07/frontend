import React, { useState } from 'react';
import './App.css';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import axios from 'axios';

function App() {
    const [newProduct, setNewProduct] = useState(null);

    const handleAddProduct = (product) => {
        setNewProduct(product);
    };

    const handleShowJsonPage = () => {
        window.open('https://node-api-tau-gray.vercel.app/products', '_blank');
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>BookStore API</h1>
                <button className="json-button" onClick={handleShowJsonPage}>
                    View Products JSON
                </button>
                <div className="container">
                    <div className="row">
                        <div className="left-side">
                            <h2>Add Product</h2>
                            <ProductForm onAddProduct={handleAddProduct} />
                        </div>
                        <div className="right-side">
                            <h2>Product List</h2>
                            <ProductList newProduct={newProduct} />
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default App;






