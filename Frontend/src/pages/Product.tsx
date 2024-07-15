import React, { useState, FormEvent, useEffect } from 'react';
import axios from 'axios';
import { FaShoppingCart } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

interface Product {
  _id: string;
  productName: string;
  category: string;
  price: number;
}
const Product: React.FC = () => {
  const { id } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [productName, setProductName] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [price, setPrice] = useState<number | ''>('');



  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await axios.post('http://localhost:3001/product', {
        productName,
        category,
        price
      });


    } catch (error) {
      console.error('Error:', error);
    }

    setProductName('');
    setCategory('');
    setPrice('');
  };

  const handleSend = async (productId: String, productName: String, category: String, price: Number) => {
    try {
      const response= await axios.post('http://localhost:3003/cart/add', {
        id,
        productId,
        productName,
        category,
        price
      });
      console.log(response); 
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>('http://localhost:3001/product/details');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="productName"></label>
          <input
            placeholder='Product Name'
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="category"></label>
          <input
            placeholder='Category'
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="price"></label>
          <input
          placeholder='Price'
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
            required
          />
        </div>
        <button type="submit">Add Product</button>
      </form>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {products.map(product => (
          <div key={product._id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', width: '200px' }}>
            <h3>Name: {product.productName}</h3>
            <p>Category: {product.category}</p>
            <p>Price: ${product.price}</p>
            <button onClick={() => handleSend(product._id, product.productName, product.category, product.price)}>Add to cart</button>
          </div>
        ))}
      </div>


      <Link to={`/cart/${id}`}>
      <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1000 }}>
        <FaShoppingCart size={32} color="black" />
      </div>
    </Link>

    </div>
  );
};

export default Product;
