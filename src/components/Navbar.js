import React from "react";
import { NavLink } from "react-router-dom";
import "../index.css";

export default class Navbar extends React.Component {


state = {
    //user_id: localStorage.getItem('user_id')
    
  }

//const {user_id} = localStorage.getItem('user_id');

  handleClick = e => {
    localStorage.clear();
    window.location = '/login';
    this.props.history.push('/');
  }
  

  render() {
  //const loggedIn = this.props.login;
  const user_id = localStorage.getItem('user_id')
 // console.log(this.state);
 //const user_id = this.state;

    return (

      <ul
        style={{
          marginTop: 0,
          marginBottom: 0,
          paddingLeft: 0,
          height: "60px",
          background: "#7d9cb6",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          listStyle: "none",
        }}
      >
        <li> {/*float right*/}
          <NavLink exact to="/" style={{color: "purple"}} activeStyle={activeStyle}> 
            Home
          </NavLink>
        </li>
        {user_id ? (
        <>
        <li>
          <NavLink exact to="/products" style={{color: "purple"}} activeStyle={activeStyle}>
            Shop
          </NavLink>
        </li>
        

        <li>
          <NavLink exact to="/products/add" style={{color: "purple"}} activeStyle={activeStyle}>
            Add Products
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/cart" style={{color: "purple"}} activeStyle={activeStyle}>
            Cart
          </NavLink>
        </li>
        
        <li>
        
          <div>
          <NavLink exact to="/" 
          onClick={this.handleClick} 
          style={{color: "white"}}
          >
            Logout
          </NavLink>
          </div>
        
         </li>
        </>
        )
        :
        (  
        <>
        <li>
          <NavLink exact to="/login" style={{color: "white"}} activeStyle={activeStyle}>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/register" style={{color: "white"}} activeStyle={activeStyle}>
            Register
          </NavLink>
        </li>
        </>
        )
      }

         </ul>
    );
  }
}
let activeStyle = {
  color: "white",
  display: "block",
  backgroundColor: "purple",
  padding: "1.2em"
};


