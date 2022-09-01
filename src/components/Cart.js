import React, { Component } from 'react';
import { Segment, Button, Divider } from "semantic-ui-react";
import CartTotal from "./CartTotal";
import baseURL from "../baseURL";
import axios from 'axios';
import { Link } from "react-router-dom";

class Cart extends Component {
	
		state = {
			products: [],
			cartProducts: [],
			product_id: '',
			user_id: '',
			isLoading: true,
			error: null
		};
	
	componentDidMount() {
		this.showCartItems();
	}

	async showCartItems() {
		try {
			const user_id = localStorage.getItem('user_id');
			const response = await axios.get(`${baseURL}/cart/${user_id}`);
			console.log('****response********');
			//console.log(response.data.products.product.name); breaks the code, nothing gets rendered
			console.log(response.data);
			//localStorage.setItem('cart_id', response.data._id);
			this.setState({
				products: response.data.products,
				isLoading: false
			});
		} catch (error) {
			this.setState({error, isLoading: false });
		}
	}


 async removeFromCart (product_id) {
 	try {
 	 	const url = `${baseURL}/cart/remove`;
 	 	const user_id = localStorage.getItem('user_id');
 	 	
 	 	const response = await axios.delete(url, {
 	 		data: {
 	 			user_id: user_id,
 	 			product_id:product_id
 	 		} 
 	 	});
 	 		console.log('success');
 	 		
 	 		this.setState({
					cartProducts: response.data
				});
				
 	 		console.log('****response****');
 	 		console.log(response.data);
 	 		//alert('Product removed, please choose another one or go back to your cart!');
			window.location = '/cart';
 	} catch (error) {
	    	console.log(error);
	    }
  }
 	 		
	
  async clearCart () {
    try {
      const url = `${baseURL}/cart/clear`;
      const user_id = localStorage.getItem('user_id');
      const response = await axios.post(url, {
          user_id: user_id
        });
      //alert('Cart cleared, you can choose another product.');
      window.location = '/cart';
			//window.location.reload(); //reloads the page
    } catch (error) {
      console.log(error);
      }
  }


	render(){
		const { isLoading, products, quantity} = this.state;
			//console.log('****products********');
			//console.log(products);
		
		return(
			<div>
				<div>
					<h1 style={style.title}>Your shopping cart</h1>
					{!isLoading ? (
						products.map(product =>{
						const {quantity} = product.quantity;
						const { _id, name, imgURL, price } = product.product;
							//console.log('****product.product********');
							//console.log(product.product._id); //giving product_id
							return (
								<div key={_id}>
									<div style={{textAlign: "center"}}>
									<div>
									<span>
										<h2 style={style.name}>
											<Link to={`/product/${_id}`}>
												{name}
											</Link>
										</h2>
										</span>
										<span>
										<Button style={style.remove}
						          basic
						          icon="remove"
						          /*color="red"*/
						          /*floated="right"*/
						          onClick={(e) => {this.removeFromCart(_id);}}
						          //onClick={(e) => console.log(_id)} //****giving correct id***
						        />
						        
						        </span>
						        </div>
										<img style={style.image}src= {imgURL} alt='product'/>
										<div>
											<h4 style={style.price}>
											{product.quantity} x €{price}
											</h4>
										</div>
										<div class="ui divider">
										</div>
									</div>
								</div>
							);
						})
						) : (
						<p>Loading...</p>
					)}
				</div>
				<CartTotal products={this.state.products}/>
				<div style={{textAlign: "center"}}>
					<h4> OR </h4>
          <button onClick={(e) => {this.clearCart()}} style={style.clear}>Clear cart</button>
        </div>
        </div>
			
		);
	}
}

export default Cart; 


const style={
	clear: {
    marginLeft: '1em',
    marginBottom: '6em',
    marginTop: '2em',
    backgroundColor: 'grey',
    //color: 'white',
    height: '3em',
    width: '6em'
  },
  title: {
  	textAlign: 'center',
  	marginTop: '1.5em',
  	marginBottom: '1em',
  },
  price: {
  	marginTop: '1em'
  },
  image: {
  	marginLeft: '4em',
  	width: '30%',
		height: 'auto',
		border: '1px solid #D3D3D3'
  },
  remove: {
  	marginRight: '-25em',
  	marginBottom: '1.5em'
  },
  name: {
  	marginTop: '1.5em'
  }
  
}