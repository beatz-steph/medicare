import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

import styled from 'styled-components';

const PatientMessage = styled.div`
	padding: 1rem 2rem;
	background-color: rgba(0, 0, 0, 0.35);
	border-radius: 5px;
	align-self: flex-start;
	font-size: 1.4rem;
	max-width: 70%;
	margin-top: 5px;
`;

const DoctorMessage = styled.div`
	padding: 1rem 2rem;
	background-color: rgba(0, 0, 0, 0.05);
	border-radius: 5px;
	align-self: flex-end;
	font-size: 1.4rem;
	max-width: 70%;
	margin-top: 5px;
`;

const MessageBox = styled.form`
	background-color: rgba(0, 0, 0, 0.15);
	min-height: 7rem;
	padding: 1rem;
	position: absolute;
	bottom: 0;
	width: 100%;
	left: 0;
	justify-content: center;
	align-items: center;
	display: flex;
`;

const MessageInput = styled.input`
	width: 90%;
	height: 100%;
	font-size: 2rem;
	padding: 1rem 1rem;
	margin-left: 3rem;
	border-radius: 30px;
	border: none;
	flex-wrap: wrap;

	&:active,
	&:focus {
		border: none;
		outline: none;
	}
`;

const Button = styled.button`
	border: none;
	background-color: transparent;

	&:focus,
	&:active {
		border: none;
		outline: none;
	}
`;

const ChatContainer = styled.div`
	overflow-y: scroll;
	width: 82%;
	height: 100%;
	padding: 3% 10%;
	display: flex;
	flex-direction: column;
	position: relative;
`;

const DocChatContainer = styled.div`
	overflow-y: scroll;
	width: 82%;
	height: 100%;
	display: flex;
	flex-direction: row;
	position: relative;
`;

const OnlinePatientsList = styled.div`
	width: 25%;
	background-color: rgba(0, 0, 0, 0.05);
	height: 100%;
`;

const DocConvo = styled.div`
	position: relative;
	width: 82%;
	display: flex;
	flex-direction: column;
	padding: 2rem;
`;

const UserListItem = styled.div`
	padding: 1rem 2rem;
	background-color: ${props => props.color};
	align-self: flex-start;
	font-size: 1.6rem;
	margin-top: 2px;
	color: 000;
	font-weight: '800';
	text-overflow: ellipsis;
	cursor: pointer;
`;

const Heading = styled.div`
	background-color: #172d4f;
	color: #fff;
	font-weight: 1.8rem;
	display: flex;
	height: 4rem;
	justify-content: center;
	align-items: center;
	margin-bottom: 1.7rem;
`;

class ChatScreen extends React.Component {
	// let [message, setMessage] = useState('');

	//  { chatHistory, __submit, patients } = this.props

	state = {
		message: '',
		selectedChatId: '',
	};

	// componentWillUpdate() {
	// 	this.filterByPatient();
	// }

	filterByPatient = () => {
		if (this.props.currentUser.patient) {
			return;
		}
		let list = this.props.chatHistory.filter(
			chat => chat.details.id === this.state.selectedChatId,
		);

		this.setState({
			...this.state,
			filteredList: list,
		});
	};

	selectPatient = details => {
		if (this.props.currentUser.patient) {
			return;
		}
		this.setState(
			{
				...this.state,
				selectedChatId: details.id,
			},
			() => {
				this.filterByPatient();
			},
		);

		console.log(this.state);
	};

	__onSubmitPatient = e => {
		e.preventDefault();
		this.props.__submit({ newMessage: this.state.message });
		this.setState({
			...this.state,
			message: '',
		});
	};

	__onSubmitDoctor = e => {
		e.preventDefault();
		this.props.__submit({
			newMessage: this.state.message,
			id: this.state.selectedChatId,
		});
		this.setState({
			...this.state,
			message: '',
		});
	};

	__onChange = e => {
		this.setState({
			...this.state,
			message: e.target.value,
		});
	};

	render() {
		return this.props.currentUser && this.props.currentUser.patient ? (
			<ChatContainer>
				{this.props.chatHistory &&
					this.props.chatHistory.length > 0 &&
					this.props.chatHistory.map((chat, index) => {
						if (chat.profession === 'patient') {
							return <DoctorMessage key={index}>{chat.message}</DoctorMessage>;
						} else {
							return (
								<PatientMessage key={index}>{chat.message}</PatientMessage>
							);
						}
					})}
				<MessageBox onSubmit={this.__onSubmitPatient}>
					<MessageInput
						type="text"
						value={this.state.message}
						onChange={this.__onChange}
					/>
					<Button>
						<ion-icon name="send"></ion-icon>
					</Button>
				</MessageBox>
			</ChatContainer>
		) : (
			<DocChatContainer>
				<OnlinePatientsList>
					<Heading>
						<span
							style={{
								fontSize: '2rem',
							}}
						>
							Patients list
						</span>
					</Heading>
					{this.props.patients.map(patient => {
						return (
							<UserListItem
								color={
									patient.id === this.state.selectedChatId ? 'blue' : 'white'
								}
								key={patient._id}
								onClick={() =>
									this.setState({
										...this.state,
										selectedChatId: patient._id,
									})
								}
							>{`${patient.firstname} ${patient.surname}`}</UserListItem>
						);
					})}
				</OnlinePatientsList>
				<DocConvo>
					{this.props.chatHistory
						.filter(msg => msg.details.id === this.state.selectedChatId)
						.map((chat, index) => {
							if (chat.profession === 'doctor') {
								return (
									<DoctorMessage key={index}>{chat.message}</DoctorMessage>
								);
							} else {
								return (
									<PatientMessage key={index}>{chat.message}</PatientMessage>
								);
							}
						})}
					<MessageBox onSubmit={this.__onSubmitDoctor}>
						<MessageInput
							type="text"
							value={this.state.message}
							onChange={this.__onChange}
						/>
						<Button>
							<ion-icon name="send"></ion-icon>
						</Button>
					</MessageBox>
				</DocConvo>
			</DocChatContainer>
		);
	}
}

export default ChatScreen;
