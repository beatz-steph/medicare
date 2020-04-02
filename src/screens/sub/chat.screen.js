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
`;

const UserListItem = styled.div`
	padding: 1rem 2rem;
	background-color: rgba(0, 0, 0, 0.15);
	border-radius: 5px;
	align-self: flex-start;
	font-size: 1.6rem;
	margin-top: 5px;
	color: 000;
	font-weight: '800';
	text-overflow: ellipsis;
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

const ChatScreen = ({ currentUser, chatHistory, __submit, patients }) => {
	let [message, setMessage] = useState('');

	const __onSubmit = e => {
		e.preventDefault();
		__submit(message);
		setMessage('');
	};

	const __onChange = e => {
		setMessage(e.target.value);
	};

	return currentUser && currentUser.patient ? (
		<ChatContainer>
			{chatHistory.map(chat => {
				return <PatientMessage key={chat.text}>{chat.text}</PatientMessage>;
			})}
			<MessageBox onSubmit={__onSubmit}>
				<MessageInput type="text" value={message} onChange={__onChange} />
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
				{patients.map(patient => {
					return (
						<UserListItem
							key={patient.id}
						>{`${patient.firstname} ${patient.surname}`}</UserListItem>
					);
				})}
			</OnlinePatientsList>
			<DocConvo>
				<MessageBox onSubmit={__onSubmit}>
					<MessageInput type="text" value={message} onChange={__onChange} />
					<Button>
						<ion-icon name="send"></ion-icon>
					</Button>
				</MessageBox>
			</DocConvo>
		</DocChatContainer>
	);
};

export default ChatScreen;
