import React , { useState } from 'react';
import { Link } from "react-router-dom";
import Axios from 'axios';
import baseURL from "../baseURL";;


const Login = (props) => {
	const [ form , setValues ] = useState({
		email    : '',
		password : ''
	})
	const [ message , setMessage ] = useState('')
	const handleChange = e => {
       setValues({...form,[e.target.name]:e.target.value})
	}
	const handleSubmit = async (e) => {
		e.preventDefault()
		try{
			    const response = await Axios.post(`${baseURL}/admin/login`,{
          	email:form.email,
          	password:form.password
          })
          setMessage(response.data.message)
          //console.log(response.data);
          if( response.data.ok ){
          	localStorage.setItem('user_id', response.data.user_id);
            setTimeout( ()=> {
				  props.login(response.data.token)
				  props.history.push('/products')
			  },1000)    
          }
          
		}
        catch(error){
        	console.log(error)
        }
	}
	 
			return(
			<div style={{textAlign: "center"}}>
				<h2 style={style.title}>Login</h2>
				<div>
          <p style={style.redirect}>New user? <Link to={"Register"}> - Register here</Link>
          </p>
        </div>
				<div>
					<form onSubmit={handleSubmit}
								onChange={handleChange}>
						<input
							className="input"
							onChange={handleChange}
							name="email"
							type="email"          
            	placeholder="Your email"
							//value={state.email}
							/><br />
						<input
							className="input"
							onChange={handleChange}
							name="password"
							type="password"          
            	placeholder="Your password"
							//value={this.state.password}
							/><br />
						<button className="primary">Login</button>
						<div className='message'><h3>{message}</h3></div>
					</form>
					<br />
				</div>
			</div>
		)
}

export default Login;


const style={
  title: {
 		marginTop: '1.8em',
 		marginBottom: '1em'
 	},
 	redirect: {
 		marginBottom: '1em'
 	}
}
