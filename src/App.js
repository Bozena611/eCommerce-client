import React, { useState , useEffect } from "react";
import axios from 'axios';
import baseURL from "./baseURL";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Products from "./components/Products";
import AddProducts from "./components/AddProducts";
import SingleProduct from "./components/SingleProduct";
import EditProduct from "./components/EditProduct";
import DeleteProduct from "./components/DeleteProduct";
import Cart from "./components/Cart";
import Register from "./components/Register";
import Login from "./components/Login";
import Contacts from "./components/Contact";
import Checkout from "./components/Checkout";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Footer from './components/Footer';
import "./index.css";


function App() {
  const [isLoggedIn,setIsLoggedIn] = useState(false)
  const token = JSON.parse(localStorage.getItem('token'))

  useEffect( () => {
     verify_token(); 
  },[]);    // page not working at all when original version [verify_token]

  const verify_token = async () => {
   if( token === null )return setIsLoggedIn(false)
     try{
          const response = await axios.post(`${baseURL}/admin/verify_token`,{token})
          return response.data.ok ? setIsLoggedIn(true) : setIsLoggedIn(false)
     }
     catch(error){
        console.log(error)
     }
  }

  const login  = (token) => {
     localStorage.setItem('token',JSON.stringify(token)) 
     setIsLoggedIn(true)
     //console.log(this.state);
  }
  const logout = () => {
     localStorage.removeItem('token');
     setIsLoggedIn(false)
     //console.log(isLoggedIn);
  }


    return (
      
      <Router>
        <div>
        {/*}
          <Navbar loggedIn={isLoggedIn}/>
        */}
          <Navbar/>
          <Route exact path="/" component={Home} />
          <Route exact path="/products" component={Products} />
          <Route exact path="/products/add" component={AddProducts} />
          <Route exact path="/product/:id" component={SingleProduct} />
          <Route exact path="/products/update/:id" component={EditProduct} />
          <Route exact path="/products/delete/:id" component={DeleteProduct} />
         
       {/*
          <Route exact path="/cart" render={ props => {
                                            return !isLoggedIn 
                                            ? <Redirect to={'/login'}/>
                                            : <Cart />   
          }}/>
      */}
          
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" render={ props => <Login login={login} {...props}/>} />
          <Route exact path="/contact" component={Contacts} />
          <Route exact path="/payment" component={Checkout} />
          <Footer />
        </div>
      </Router>

    );
}

export default App;