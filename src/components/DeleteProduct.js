import React from 'react';
import {Link} from 'react-router-dom';
import baseURL from "../baseURL";
import axios from 'axios';
import '../index.css';

class DeleteProduct extends React.Component {
	

async removeProduct () {
	try {
			const url = (`${baseURL}/products/delete/`);
			await axios.delete(url + this.props.match.params.id);
			console.log('success');
			//this.setState({message: 'Product deleted.'});
			
    } catch (error) {
    	console.log(error);
       		//this.setState({error:'Something went wrong'})      
      }
    }


render () {
		return (
			<div style={{textAlign: "center"}}>
			<h3 style={style.text}>Product deleted</h3>
				<Link  to={`/products`}>
					<button onClick={this.removeProduct()} style={style.delete}>
						Back to Products
					</button>
				</Link>
			
			</div>
		);
	}

  }  

export default DeleteProduct;

const style={
	delete: {
		marginLeft: '1em',
		marginBottom: '3em',
		backgroundColor: 'purple',
		color: 'white',
		height: '3em',
  	width: '9em'
	},
	text: {
		marginTop: '3em',
		marginBottom: '2em'
	}
}