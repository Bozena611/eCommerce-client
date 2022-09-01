import React, { Component } from 'react';
import Axios from 'axios';
import baseURL from "../baseURL";
import { Link } from "react-router-dom";


class Register extends Component {
	
	state = {
		email: '',
		password: '',
		password2: '',
		message: ''
	}

	handleChange = e => {
		this.setState({[e.target.name] : e.target.value});
	}

	handleSubmit = async e => {
		let {email, password, password2, message} = this.state;
		e.preventDefault();
		try {
			const response = await Axios.post(`${baseURL}/admin/register`, {
				email: email,
				password: password,
				password2: password2
			})
			this.setState({
				message: response.data.message,
				});
			
			//console.log(response);
			if (response.data.ok) return setTimeout(()=> {this.props.history.push('/login')}, 1000);
			const res = await Axios.post(`${baseURL}/sendEmail`, {
					email: email,
					subject: "Your new account",
					header: "Message from Circular Economy",
					message: "Thank you for registering"
				})
		}
		catch(e){
			console.log(e);
		}
	}

	
	render(){
		return(
			<div style={{textAlign: "center"}}>
				<h2 style={style.title}>Register</h2>
						<div>
          		<p>Already registered? <Link to={"Login"}> - Login here</Link>
					    </p>
					  </div>
						<div style={{textAlign: "center"}}>
							<form onSubmit={this.handleSubmit}>
								<input
									className="input"
									placeholder="Email address"
									onChange={this.handleChange}
									type="email"
									name="email"
									value={this.state.email}
								/>
								<br />
								<input
									className="input"
									placeholder="Password"
									onChange={this.handleChange}
									type="password"
									name="password"
									value={this.state.password}
								/>
								<br />
								<input
									className="input"
									placeholder="Confirm password"
									onChange={this.handleChange}
									type="password"
									name="password2"
									value={this.state.password2}
								/>
								<br />
								<button className="primary">Register</button>
								<br />
								<div style={style.message}><h4>{this.state.message}</h4></div>
							</form>
							<br />
						</div>
					
			</div>
		)
	}
}

export default Register;


const style={
  message: {
  	marginTop: ' 1em',
 	},
 	title: {
 		marginTop: '1em'
 	}
}

