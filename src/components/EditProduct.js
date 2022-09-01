import React, { Component } from 'react';
import axios from 'axios';
import baseURL from "../baseURL";

class EditProduct extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      imgURL: "",
      description: "",
      price: "",
      stock: "",
      SKU: ""
    };
  }

  componentDidMount() {
    // console.log("Print id: " + this.props.match.params.id);
    axios
      .get(`${baseURL}/products/product_id/`+this.props.match.params.id)
      .then(res => {
        
        this.setState({
          name: res.data.name,
          imgURL: res.data.imgURL,
          description: res.data.description,
          price: res.data.price,
          stock: res.data.stock,
          SKU: res.data.SKU
        })
      })
      .catch(err => {
        console.log("Error!!");
      })
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    //const { id } = this.props.match.params.id;
    const {name, imgURL, description, price, stock, SKU} = this.state;
    try {
      const res = await axios.post(`${baseURL}/products/update/`, {
        _id: this.props.match.params.id,
        newName: name,
        newImgURL: imgURL,
        newDescription: description,
        newPrice: price,
        newStock: stock,
        newSKU: SKU
      })
      //console.log(this.props.match.params.id);
      //console.log(res);
                  
    }
    catch(e){
      console.log(e);
    }
    alert('Product updated!');
    window.location = '/products';
  }

  render () {
    
    return (
      <div>
          <div style={{textAlign: "center"}}>
            <h2 style={style.title}>Edit Product</h2>
          </div>
          <form onSubmit={this.handleSubmit} style={{textAlign: "center"}}>
          <ul style={{listStyle: "none"}}>
            <li className="add-product">Item name: <input 
              className="input"
              placeholder="item name"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            /></li>
            <li>Image URL: <input 
              className="input"
              placeholder="image URL"
              name="imgURL"
              value={this.state.imgURL}
              onChange={this.handleChange}
            /></li>
            <li>Item description: <textarea 
              className="description"
              placeholder="description"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
            /></li>
            <li>Item price: <input 
              className="input"
              placeholder="price"
              name="price"
              value={this.state.price}
              onChange={this.handleChange}
            /></li>
            <li>Item stock: <input 
              className="input"
              placeholder="stock"
              name="stock"
              value={this.state.stock}
              onChange={this.handleChange}
            /></li>
            <li>Item SKU: <input 
              className="input"
              placeholder="SKU"
              name="SKU"
              value={this.state.SKU}
              onChange={this.handleChange}
            /></li>
                      
          </ul>
          <div style={{textAlign: "center"}}>
            <button className="primary">Save changes</button>
          </div>
          </form>
          <br />
        </div>
          
            
    );
  }
}

export default EditProduct;

const style={
  title: {
    marginTop: '1.8em',
    marginBottom: '0.8em'
  }
}