import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import './dashboard.styles.scss';
import Sidebar from '../../components/side-nav/sidenav.component';
import { Redirect } from 'react-router';
import { Switch, Route } from 'react-router-dom';

import NewsFeed from '../../screens/sub/newsfeed.screen';
import ChatScreen from '../sub/chat.screen';
import PatientsList from '../sub/patientListView';
import DrugRequest from '../sub/drugRequest';

let socket = io('https://medicare-server.herokuapp.com/');
class Dashboard extends React.Component {
	state = {
		patients: [],
		chatHistory: [],
	};

	componentDidMount() {
		if (!this.props.currentUser) {
			this.props.history.push('/');
		} else {
			if (this.props.currentUser.patient) {
				socket.emit('patientOnline', {
					details: this.props.currentUser.patient,
				});
			} else if (this.props.currentUser.doctor) {
				socket.emit('doctorOnline', {
					details: this.props.currentUser.doctor,
				});
				if (this.props.currentUser && this.props.token) {
					this.fetchPatient();
				}
			} else {
				return;
			}

			socket.on('message', (message) => {
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
		let patients = await axios.get(
			`https://medicare-server.herokuapp.com/api/v1/doctor/${this.props.currentUser.doctor.id}/patients`,
			{
				headers: { Authorization: `Bearer ${this.props.token}` },
			},
		);
		this.setState(
			{
				...this.state,
				patients: patients.data,
			},
			(state) => {
				console.log(this.state);
			},
		);
	};

	__Submit = ({ newMessage, id }) => {
		if (this.props.currentUser.patient) {
			socket.emit('patientMessage', {
				message: newMessage,
				details: this.props.currentUser.patient,
			});
		} else {
			socket.emit('doctorMessage', {
				message: newMessage,
				to: id,
			});
		}
	};

	render() {
		return (
			<div className="landing">
				<div className="landing__top-background"></div>
				<div className="mainscreen">
					<Sidebar
						url={this.props.match.url}
						currentUser={this.props.currentUser}
					/>
					<Switch>
						<Route exact path={`${this.props.match.path}/`}>
							<NewsFeed />
						</Route>
						<Route path={`${this.props.match.path}/drugrequest`}>
							<DrugRequest />
						</Route>
						<Route path={`${this.props.match.path}/patients`}>
							<PatientsList patients={this.state.patients} />
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
