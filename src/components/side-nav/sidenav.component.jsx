import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/logo.svg';

import './sidenav.styles.scss';

const SidenavComponent = ({ url, currentUser }) => {
	const [route, setRoute] = useState('Home');

	const [showMobile, setShowMobile] = useState(false);

	return (
		<div className="sidenav">
			<div className="sidenav__top">
				<Logo className="sidenav__logo" />
				<div className="sidenav__title">BLABBER!</div>
				<ion-icon
					onClick={() => setShowMobile(!showMobile)}
					name="menu"
				></ion-icon>
			</div>

			{showMobile ? (
				<ul className="sidenav__routes__mobile ">
					<Link
						to={`${url}`}
						className={`sidenav__routes--option  ${
							route === 'news' ? 'active' : null
						}`}
						onClick={() => {
							setRoute('news');
							setShowMobile(!showMobile);
						}}
					>
						<ion-icon
							name="ios-paper"
							className="sidenav__routes--option_icons"
						></ion-icon>
						<span className="sidenav__routes--option_text">News feed</span>
					</Link>
					<Link
						to={`${url}/chat`}
						className={`sidenav__routes--option  ${
							route === 'chat' ? 'active' : null
						}`}
						onClick={() => {
							setRoute('chat');
							setShowMobile(!showMobile);
						}}
					>
						<ion-icon
							name="ios-chatboxes"
							className="sidenav__routes--option_icons"
						></ion-icon>
						<span className="sidenav__routes--option_text">Chat</span>
					</Link>
					{currentUser.doctor ? (
						<>
							<Link
								to={`${url}/patients`}
								className={`sidenav__routes--option  ${
									route === 'patients' ? 'active' : null
								}`}
								onClick={() => {
									setRoute('patients');
									setShowMobile(!showMobile);
								}}
							>
								<ion-icon
									name="ios-people"
									className="sidenav__routes--option_icons"
								></ion-icon>
								<span className="sidenav__routes--option_text">Patients</span>
							</Link>
							<Link
								to={`${url}/drugrequest`}
								className={`sidenav__routes--option  ${
									route === 'drugrequest' ? 'active' : null
								}`}
								onClick={() => {
									setRoute('drugrequest');
									setShowMobile(!showMobile);
								}}
							>
								<ion-icon
									name="ios-cart"
									className="sidenav__routes--option_icons"
								></ion-icon>
								<span className="sidenav__routes--option_text">
									Drug request
								</span>
							</Link>
						</>
					) : null}
					<Link
						to={`${url}/emergencyrequest`}
						className={`sidenav__routes--option  ${
							route === 'emergencyrequest' ? 'active' : null
						}`}
						onClick={() => {
							setRoute('emergencyrequest');
							setShowMobile(!showMobile);
						}}
					>
						<ion-icon
							name="ios-pulse"
							className="sidenav__routes--option_icons"
						></ion-icon>
						<span className="sidenav__routes--option_text">
							Emergency request
						</span>
					</Link>
					<Link
						to={`${url}/profile`}
						className={`sidenav__routes--option  ${
							route === 'profile' ? 'active' : null
						}`}
						onClick={() => {
							setRoute('profile');
							setShowMobile(!showMobile);
						}}
					>
						<ion-icon
							name="ios-person"
							className="sidenav__routes--option_icons"
						></ion-icon>
						<span className="sidenav__routes--option_text">Profile</span>
					</Link>
				</ul>
			) : null}

			<ul className="sidenav__routes  ">
				<Link
					to={`${url}`}
					className={`sidenav__routes--option  ${
						route === 'news' ? 'active' : null
					}`}
					onClick={() => {
						setRoute('news');
						setShowMobile(!showMobile);
					}}
				>
					<ion-icon
						name="ios-paper"
						className="sidenav__routes--option_icons"
					></ion-icon>
					<span className="sidenav__routes--option_text">News feed</span>
				</Link>
				<Link
					to={`${url}/chat`}
					className={`sidenav__routes--option  ${
						route === 'chat' ? 'active' : null
					}`}
					onClick={() => {
						setRoute('chat');
						setShowMobile(!showMobile);
					}}
				>
					<ion-icon
						name="ios-chatboxes"
						className="sidenav__routes--option_icons"
					></ion-icon>
					<span className="sidenav__routes--option_text">Chat</span>
				</Link>
				{currentUser.doctor ? (
					<>
						<Link
							to={`${url}/patients`}
							className={`sidenav__routes--option  ${
								route === 'patients' ? 'active' : null
							}`}
							onClick={() => {
								setRoute('patients');
								setShowMobile(!showMobile);
							}}
						>
							<ion-icon
								name="ios-people"
								className="sidenav__routes--option_icons"
							></ion-icon>
							<span className="sidenav__routes--option_text">Patients</span>
						</Link>
						<Link
							to={`${url}/drugrequest`}
							className={`sidenav__routes--option  ${
								route === 'drugrequest' ? 'active' : null
							}`}
							onClick={() => {
								setRoute('drugrequest');
								setShowMobile(!showMobile);
							}}
						>
							<ion-icon
								name="ios-cart"
								className="sidenav__routes--option_icons"
							></ion-icon>
							<span className="sidenav__routes--option_text">Drug request</span>
						</Link>
					</>
				) : null}
				<Link
					to={`${url}/emergencyrequest`}
					className={`sidenav__routes--option  ${
						route === 'emergencyrequest' ? 'active' : null
					}`}
					onClick={() => {
						setRoute('emergencyrequest');
						setShowMobile(!showMobile);
					}}
				>
					<ion-icon
						name="ios-pulse"
						className="sidenav__routes--option_icons"
					></ion-icon>
					<span className="sidenav__routes--option_text">
						Emergency request
					</span>
				</Link>
				<Link
					to={`${url}/profile`}
					className={`sidenav__routes--option  ${
						route === 'profile' ? 'active' : null
					}`}
					onClick={() => {
						setRoute('profile');
						setShowMobile(!showMobile);
					}}
				>
					<ion-icon
						name="ios-person"
						className="sidenav__routes--option_icons"
					></ion-icon>
					<span className="sidenav__routes--option_text">Profile</span>
				</Link>
			</ul>
		</div>
	);
};

export default SidenavComponent;
