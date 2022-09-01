import React from 'react';
import {Link} from 'react-router-dom';
import '../index.css';

class Footer extends React.Component {

	render() {
		return(
			<div>
				<footer>
					<Link  to={`/contact`}>
					<h2 style={style.link}>Contact us</h2>
					</Link>
					<p style={style.copy}>Copyright &copy; 2019 -  <a style={style.link} href="https://www.inovationpark.com/about-2/team/"> Bozena Vuckovic</a></p>
					<p>Final Project For - <a style={style.link} href="https://barcelonacodeschool.com/">Barcelona Code School</a></p>
				</footer>
			</div>
			)
	}
}


export default Footer;

const style={
	copy: {
		marginBottom: '1.5em',
		marginTop: '1.5em'
	},
	link: {
		color: 'white',
		textDecoration: 'underline'
	}
}