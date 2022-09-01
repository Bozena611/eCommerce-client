import React, { Component } from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "./CheckoutForm.js";
import pk_test from "../config.js";

class Checkout extends Component {

  render() {
    return (
      <StripeProvider apiKey={pk_test}>
        <div className="example">
          <Elements>
            <CheckoutForm />
          </Elements>
        </div>
      </StripeProvider>
    );
  }
}

export default Checkout;
