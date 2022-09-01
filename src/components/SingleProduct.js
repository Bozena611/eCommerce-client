import React from 'react';
import {Link} from 'react-router-dom';
import baseURL from "../baseURL";
import axios from 'axios';
//import DeleteProduct from "./DeleteProduct";
import AddToCart from './AddToCart';
import '../index.css';

class SingleProduct extends React.Component {
	state = {
		product: '',
		error: '',
	};

	componentDidMount() {
		this.showProductId()
	}

	
	async showProductId () {
		try {
			//const {_id} = this.props.match.params.id;
			const url = (`${baseURL}/products/product_id/`);
			const response = await axios.get(url + this.props.match.params.id);
			this.setState({ product: response.data });
			//console.log(response.data);
    } catch (error) {
       		this.setState({error:'Something went wrong'})      
      }
    }



    render() { 
    	const { product } = this.state;
    	//console.log('****product******');
    	console.log(product._id);
    	//const { _id, name, imgURL, description, price } = this.state;    	
    	return (
    		<div className='single' style={{textAlign: "center", marginBottom: "1.5em", marginTop: "2em"}}>
					<h2 style={style.title}>{product.name}</h2>
					<div>
						<span><Link  to={`/products/update/${product._id}`}><button>Edit</button></Link>
						</span>
						<span>

						<Link to={`/products/delete/${product._id}`}> 
							<button style={style.delete}>
								Delete
							</button>
						</Link>
						</span>
					</div>
					<br />
					<div>
						<img style={style.image} src= {product.imgURL} alt='product'/>
					</div>
					<p style={style.description}>{product.description}</p>
					<h4>Price: €{product.price}</h4>
					{product.name ?
					<AddToCart 
						product_id ={product._id}
						name={product.name}
						price={product.price}
					/> : null}
					<br />
				</div>  

			)

	};

}


export default SingleProduct;

const style={
	link: {
		marginLeft: '1em'
	},
	delete: {
		marginLeft: '1.8em',
		backgroundColor: 'red',
		color: 'white',
		height: '1.7em'
	},
	description: {
		marginTop: '2em',
		marginLeft: '1.5em',
		marginRight: '1.5em'
	},
	title: {
    marginTop: '1.8em',
    marginBottom: '1.5em'
  },
  image: {
  	marginTop: '1em',
  	border: '1px solid #D3D3D3'
  }	
}