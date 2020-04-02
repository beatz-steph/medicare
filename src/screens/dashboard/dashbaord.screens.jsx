import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import './dashboard.styles.scss';
import Sidebar from '../../components/side-nav/sidenav.component';
import { Redirect } from 'react-router';
import { Switch, Route } from 'react-router-dom';

import NewsFeed from '../../screens/sub/newsfeed.screen';
import ChatScreen from '../sub/chat.screen';

// const Dashboard = ({ currentUser, token }) => {
// 	let history = [];
// 	let [patients, setPatients] = useState([]);

// 	let [chatHistory, setChatHistory] = useState(history);

// 	let socket = io('http://localhost:8081');

// 	useEffect(() => {
// 		socket.emit('online', {
// 			details: currentUser,
// 		});
// 		// fetchPatient();

// 		// socket.on('message', message => {
// 		// 	// history.push(message);
// 		// 	console.log(message);
// 		// 	// console.log(chatHistory);
// 		// 	// // setChatHistory([...chatHistory]);
// 		// });
// 	}, ['.']);

// 	const fetchPatient = async () => {
// 		let patient = await axios.get(
// 			`http://localhost:8081/api/v1/doctor/${
// 				currentUser.doctor ? currentUser.doctor.id : null
// 			}/patients`,
// 			{
// 				headers: { Authorization: `Bearer ${token}` },
// 			},
// 		);
// 		setPatients(patient.data);
// 		console.log(patient.data);
// 	};

// 	const __Submit = newMessage => {
// 		socket.emit('chatMessage', {
// 			message: newMessage,
// 			details: currentUser,
// 		});
// 	};

// 	return (
// 		<div className="landing">
// 			<div className="landing__top-background"></div>
// 			<div className="mainscreen">
// 				<Sidebar url={url} />
// 				<Switch>
// 					<Route exact path={`${path}/`}>
// 						<NewsFeed />
// 					</Route>
// 					<Route path={`${path}/drugrequest`}>
// 						<div>drug request screen</div>
// 					</Route>
// 					<Route path={`${path}/emergencyrequest`}>
// 						<div>emergency request screen</div>
// 					</Route>
// 					<Route path={`${path}/chat`}>
// 						<ChatScreen
// 							__submit={__Submit}
// 							chatHistory={chatHistory}
// 							socket={socket}
// 							currentUser={currentUser}
// 							patients={patients}
// 						/>
// 					</Route>
// 				</Switch>
// 			</div>
// 		</div>
// 	);
// };

// export default Dashboard;
let socket = io('http://localhost:8081');
class Dashboard extends React.Component {
	state = {
		patients: [],
		chatHistory: [],
	};

	componentDidMount() {
		if (!this.props.currentUser) {
			this.props.history.push('/');
		}

		if (this.props.currentUser) {
			socket.emit('online', {
				details: this.props.currentUser,
			});
			this.fetchPatient();

			socket.on('message', message => {
				console.log(message);
				this.setState(
					{
						...this.state,
						chatHistory: [...this.state.chatHistory, message],
					},
					console.log(this.state),
				);
			});
		}
	}

	fetchPatient = async () => {
		if (this.props.currentUser && this.props.currentUser.doctor) {
			let patients = await axios.get(
				`http://localhost:8081/api/v1/doctor/${this.props.currentUser.doctor.id}/patients`,
				{
					headers: { Authorization: `Bearer ${this.props.token}` },
				},
			);
			this.setState({
				...this.state,
				patients,
			});
			console.log(patients.data);
		}
	};

	__Submit = newMessage => {
		socket.emit('chatMessage', {
			message: newMessage,
			details: this.props.currentUser,
		});
	};

	render() {
		return (
			<div className="landing">
				<div className="landing__top-background"></div>
				<div className="mainscreen">
					<Sidebar url={this.props.match.url} />
					<Switch>
						<Route exact path={`${this.props.match.path}/`}>
							<NewsFeed />
						</Route>
						<Route path={`${this.props.match.path}/drugrequest`}>
							<div>drug request screen</div>
						</Route>
						<Route path={`${this.props.match.path}/emergencyrequest`}>
							<div>emergency request screen</div>
						</Route>
						<Route path={`${this.props.match.path}/chat`}>
							<ChatScreen
								__submit={this.__Submit}
								chatHistory={this.state.chatHistory}
								socket={socket}
								currentUser={this.props.currentUser}
								patients={this.state.patients}
							/>
						</Route>
					</Switch>
				</div>
			</div>
		);
	}
}

export default Dashboard;
