import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif'
import { useHistory } from 'react-router-dom';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const history = useHistory();

    const handleProceedCheckOut = () => {
       history.push('/shipment');
    }

    const removeProduct = (productKey) => {        
        const newCart = cart.filter(pd => pd.key !== productKey)
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(() => {
        //cart data
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        fetch('https://peaceful-brushlands-13507.herokuapp.com/productsByKeys', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data))

       
    }, [])
    let thankYou;
    if(orderPlaced) {
        thankYou = orderPlaced && <img src={happyImage} alt=""/>
    } 
    return (
        <div className="twin-container" >           
            <div className="product-container">
            {
                cart.map(pd => <ReviewItem
                    key={pd.key}
                    removeProduct = {removeProduct}
                    product={pd}></ReviewItem>)
            }
            {thankYou}            
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button className="main-button" onClick={handleProceedCheckOut}>Proceed Check out</button>
                </Cart>

            </div>
            
        </div>
    );
};

export default Review;