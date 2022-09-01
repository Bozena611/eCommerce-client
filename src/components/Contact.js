import React from 'react'
import axios from 'axios'
import ReactDom from 'react-dom';
import baseURL from "../baseURL";



var subject= "Here is the message: "
// const Calendar = () => (
class Contacts extends React.Component {

	constructor() {
		super()
		this.state = {
			title: "How can we help you?"
		}
	}


	handleSubmit(event) {
		var that = this
		event.preventDefault()
		const nameInput = event.target.elements.name
		const emailInput = event.target.elements.email
		const messageInput = event.target.elements.message
		//const subject = that.props.subject || subject
		const subjectInput = event.target.elements.subject
		var data = { name: nameInput.value, email: emailInput.value, message: messageInput.value, subject: subjectInput.value }
		// console.log("--data--", name: event.target.elements.name.value, event.target.elements.email.value, event.target.elements.message.value)

		// sending request to localhost, in production could be just /sendEmail
		axios.post(`${baseURL}/sendEmail`, data)
		.then((response) => {
			nameInput.value = ""
			emailInput.value = ""
			messageInput.value = ""
			subjectInput.value = ""
			alert("Your message has been sent, thank you.")
		})
		.catch(function (error) {
			console.log(error);
		})
		console.log("--SeNd!--")
	}

	render() {
		return (
			<div>

			<h1 style={style.title}>{this.props.title || this.state.title}</h1>
			<form onSubmit={this.handleSubmit.bind(this)}>
			<input required={true} style={{
				border: '1px solid grey',
				width: "50%",
				height: "6vh",
				paddingLeft: "0.5em",
				display: "block",
				margin: "0 auto",
				marginBottom: "1em"
			}}
			type="text" placeholder="Subject" name="subject" />
			<textarea required={true} style={{
				border: '1px solid grey',
				width: "50%",
				paddingLeft: "0.5em",
				paddingTop: "0.5em",
				display: "block",
				margin: "0 auto",
				minHeight: "20vh",
				marginBottom: "1em"
			}}
			placeholder="Please write your message"
			name="message"
			/>
			<input required={true} style={{
				border: '1px solid grey',
				width: "50%",
				height: "5vh",
				paddingLeft: "0.5em",
				display: "block",
				margin: "0 auto",
				marginBottom: "1em"
			}}
			type="text" placeholder="What is your name?" name="name" />

			<input required={true}
			style={{
				border: '1px solid grey',
				width: "50%",
				height: "5vh",
				paddingLeft: "0.5em",
				display: "block",
				margin: "0 auto",
				marginBottom: "1em"
			}}
			type="email" placeholder="Your contact email?" name="email" />
			<div style={{textAlign: "center"}}>
				<button className="primary" type="submit" label="Send" >Send</button>
			</div>
			</form>

			</div>
			)
	}
}
// )

export default Contacts;

const style={
  title: {
    marginTop: '1.5em',
    marginBottom: '1em'
  }
}
