import  { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
type CartItem = {
    _id: string;
    productName: string;
    category: string;
    price: number;
  };


const Cart = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const { id } = useParams();
console.log("Working thanne",id);

  useEffect(() => {
    const fetchCartItems = async () => {
      console.log("working 2");
      
      try {
        console.log("working3");
        const response = await axios.get(`http://localhost:3003/cart/get/${id}`);
        console.log("working success");
        
        console.log('varanundoda',response);

        setCartItems(response.data.products);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  return (
    <div>
      <h2>Cart</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {cartItems.map(product => (
          <div key={product._id} style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', padding: '10px' }}>
            <div style={{ marginRight: '10px' }}>
              <p><strong>Product Name:</strong> {product.productName}</p>
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Price:</strong> ${product.price}</p>
            </div>
            {/* <button onClick={() => handleRemoveItem(product._id)}>Remove</button> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
