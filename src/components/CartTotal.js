import React from 'react';
//import { Elements, StripeProvider } from "react-stripe-elements";
//import CheckoutForm from "./CheckoutForm.js";
import {Link} from 'react-router-dom';
//import baseURL from "../baseURL";
//import axios from 'axios';
//import pk_test from "../config.js";
import calculateCartTotal from "../Helpers/calculateCartTotal";

function CartTotal ({ products }) {
  const [cartAmount, setCartAmount] = React.useState(0);
  const [isCartEmpty, setCartEmpty] = React.useState(false);

  React.useEffect(() => {
    const { cartTotal, stripeTotal } = calculateCartTotal(products);
    setCartAmount(cartTotal);
    localStorage.setItem('amount', cartTotal);
    setCartEmpty(products.length === 0);
  }, [products]);


  

		return (
			//<StripeProvider apiKey={pk_test}>
			<div style={{textAlign: "center"}}>
				<h3 style={style.total}>Total: €{cartAmount}</h3>
				
        <div className="example">
          <span>
          <Link  to={`/payment`}><button style={style.pay}>Pay</button></Link>
          </span>  
         
        </div>
      </div>
      //</StripeProvider>
    );
}


export default CartTotal;

const style={
  pay: {
    marginLeft: '1em',
    marginBottom: '3em',
    marginTop: '2em',
    //backgroundColor: 'purple',
    //color: 'white',
    height: '3em',
    width: '6em'
  },
  total: {
    marginTop: '2em',
    color: 'red'
  }
}