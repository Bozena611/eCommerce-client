import React, { Component } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe,
  StripeProvider,
  Elements
} from "react-stripe-elements";
import baseURL from "../baseURL";
import axios from "axios";

class CheckoutForm extends Component {
  
  state = {
    errorMessage: "",
    cardNumber: false,
    cardExpiry: false,
    cardCvc: false,
    amount: localStorage.getItem('amount'),
    user_id: localStorage.getItem('user_id')
    //amount: 20
  };

  handleChange = ({ elementType, complete, error }) => {
    if (error) return this.setState({ errorMessage: error.code });
    return this.setState({ [elementType]: complete });
  };

  handleInputChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = async e => {
    e.preventDefault();
    const { cardNumber, cardCvc, cardExpiry } = this.state;
    if (!cardNumber || !cardCvc || !cardExpiry) return alert("Please fill all the fields");
    const fullname = this.state.name + this.state.lastname;
    const { name, lastname, email, phone, pc, amount } = this.state;
    if (this.props.stripe) {
      const { token } = await this.props.stripe.createToken({ name:fullname, email });
      //console.log('token ====>',token)
      const response = await axios.post(`${baseURL}/payment`, {
        token_id: token.id,
        amount,
        name,
        lastname,
        email,
        phone,
        pc
      });
      console.log('response ====>',response.data)
      response.data.status === "succeeded" ? alert("Payment successful. Thank you for your purchase.") : alert("Payment error");
      const {user_id} = this.state;
      const res = await axios.post(`${baseURL}/cart/clear`, {
        user_id: user_id
      });
      window.location = '/cart';
    } else {
      alert("Stripe.js hasn't loaded yet.");
    }
  };

  render() {
    return (
      <div>
        <div style={{textAlign: "center"}}>
          <h2 style={style.title}>Checkout</h2>
        </div>
        <form className="checkout" style={{textAlign: "center"}} onSubmit={this.handleSubmit}>
          {/*************************** FIRST ROW ****************************/}
          <div className="split-form">
            <label>
              Name
              <input className="stripe-input" required name="name" type="text" placeholder="Jane" onChange={this.handleInputChange} />
            </label>
            <label>
              Lastname
              <input className="stripe-input" required name="lastname" type="text" placeholder="Doe" onChange={this.handleInputChange} />
            </label>
          </div>
          {/*************************** SECOND ROW ****************************/}
          <div className="split-form">
            <label>
              Email
              <input
                className="stripe-input"
                required
                name="email"
                type="email"
                placeholder="jane.doe@example.com"
                onChange={this.handleInputChange}
              />
            </label>
            <label>
              Phone number
              <input className="stripe-input" required name="phone" type="number" placeholder="+34 816463723" onChange={this.handleInputChange} />
            </label>
          </div>
          {/***************************** THIRD ROW *****************************/}
          <div className="split-form" style={{textAlign: "center"}}>
            <label>
              Card number
              <CardNumberElement onChange={this.handleChange} />
            </label>
            <label>
              Expiration date
              <CardExpiryElement onChange={this.handleChange} />
            </label>
          </div>
          {/*************************** FOURTH ROW ****************************/}
          <div className="split-form">
            <label>
              CVC
              <CardCVCElement onChange={this.handleChange} />
            </label>
            <label>
              Postal code
              <input
                name="pc"
                type="text"
                placeholder="94115"
                className="StripeElement"
                onChange={this.handleChangeInput}
              />
            </label>
          </div>
          <div className="error" role="alert">
            {this.state.errorMessage}
          </div>
          {console.log(this.props.cartAmount)}
          <button>Pay € {this.state.amount}</button>
        </form>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);

const style={
  title: {
    marginTop: '1.5em',
    marginBottom: '0.8em'
  }
}


