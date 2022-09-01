import React from 'react';
//import Contacts from './Contact'
import { Link } from "react-router-dom";

class Home extends React.Component {
	render() {
		return (
			<div style={{color: "#223f57"}}>
				<img style={style.header} src="https://res.cloudinary.com/dafkjtajd/image/upload/v1576967434/ecommerce/circular-economy_header_znkaed.jpg" alt="Circular Economy"/>
				<div className="intro"> 
					<h1 className="introTitle">Circular Economy</h1>
					<h4> Our current economy is based on the model 'take-make-use-dispose'. We exploit natural resources, create new products and when we do not use them anymore we simply throw them away. Circular economy movement is trying to change the current prevailing linear economy practices
					and aims to redefine growth, focusing on positive society-wide benefits. It entails gradually decoupling economic activity from the consumption of finite resources, and designing waste out of the system. Underpinned by a transition to renewable energy sources, the circular model builds economic, natural, and social capital. It is based on three principles:
					</h4>
					<ul style={style.list}>
						<li>Design out waste and pollution</li>
						<li>Keep products and materials in use</li>
						<li>Regenerate natural systems</li>
					</ul>
					
					<h4> With our projects we are helping companies and local economies flourish in the field of Circular economy.</h4>
					<h3>Waste is not a waste, it is a resource!</h3>
					<div style={{textAlign: "center"}}>
						<h2 className="invitation">Join us in changing the world</h2>
						<Link to={`/login`}>
							<button style={style.join}>Our Projects</button>
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

export default Home;


const style={
	header: {
    marginTop: '0',
    width: '100%',
    marginBottom: '2em',
    borderRadius: '0px'
  },
	join: {
	  backgroundColor: '#6772e5',
	  color: 'white',
	  height: '3em',
	  width: '6em',
	  marginTop: '1em',
	  //margin-left: 3em;
	  marginBottom: '3em',
	  fontSize: '16px'
 	},
 	list: {
 		listStyleType: 'disc'
 	}
}