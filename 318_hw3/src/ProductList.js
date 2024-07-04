// src/ProductList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = ({ newProduct }) => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://node-api-tau-gray.vercel.app/products');
                setProducts(response.data);
                setFilteredProducts(response.data);
            } catch (error) {
                console.error('There was an error fetching the products!', error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        if (newProduct) {
            setProducts((prevProducts) => [...prevProducts, newProduct]);
            setFilteredProducts((prevProducts) => [...prevProducts, newProduct]);
        }
    }, [newProduct]);

    useEffect(() => {
        const results = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(results);
    }, [searchTerm, products]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://node-api-tau-gray.vercel.app/products/${id}`);
            setProducts(products.filter(product => product._id !== id));
        } catch (error) {
            console.error('There was an error deleting the product!', error);
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
    };

    const handleSave = async (id, updatedProduct) => {
        try {
            const response = await axios.put(`https://node-api-tau-gray.vercel.app/products/${id}`, updatedProduct);
            setProducts(products.map(product => product._id === id ? response.data : product));
            setEditingProduct(null);
        } catch (error) {
            console.error('There was an error updating the product!', error);
        }
    };

    return (
        <div className="product-list">
            <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={handleSearch}
            />
            {filteredProducts.length ? (
                <ul>
                    {filteredProducts.map((product) => (
                        <li key={product._id}>
                            {editingProduct && editingProduct._id === product._id ? (
                                <div>
                                    <input
                                        type="text"
                                        name="name"
                                        value={editingProduct.name}
                                        onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        name="genre"
                                        value={editingProduct.genre}
                                        onChange={(e) => setEditingProduct({ ...editingProduct, genre: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        name="description"
                                        value={editingProduct.description}
                                        onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                                    />
                                    <input
                                        type="number"
                                        name="price"
                                        value={editingProduct.price}
                                        onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                                    />
                                    <button onClick={() => handleSave(product._id, editingProduct)}>Save</button>
                                    <button onClick={() => setEditingProduct(null)}>Cancel</button>
                                </div>
                            ) : (
                                <div>
                                    <h3>{product.name}</h3>
                                    <p>Genre: {product.genre}</p>
                                    <p>Description: {product.description}</p>
                                    <p>Price: ${product.price}</p>
                                    <button onClick={() => handleDelete(product._id)}>Delete</button>
                                    <button onClick={() => handleEdit(product)}>Edit</button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No products available.</p>
            )}
        </div>
    );
};

export default ProductList;


