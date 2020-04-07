import React, { useState } from 'react';
import { connect } from 'react-redux';
import { signOutStart } from '../../redux/user/user.action';

import './top-nav.styles.scss';

const TopNav = ({ dispatch }) => {
	const [showDrop, setShowDrop] = useState(false);

	const _toggleDrop = () => {
		setShowDrop(!showDrop);
	};

	const __logout = () => {
		dispatch(signOutStart());
	};

	return (
		<div className="top-navigation">
			<div className="search-bar">
				<ion-icon name="ios-search"></ion-icon>
				<input
					type="text"
					placeholder="Search..."
					className="search-bar__input"
				/>
			</div>
			<div className="top-navigation__noification">
				{/* <ion-icon name="ios-notifications"></ion-icon> */}
				<div className="top-navigation__noification--icon">
					<ion-icon name="ios-notifications-outline"></ion-icon>
				</div>
			</div>
			<div className="top-navigation__dropdown">
				<div
					className="top-navigation__dropdown--main"
					onClick={_toggleDrop}
				></div>
				{showDrop ? (
					<div className="top-navigation__dropdown--sub">
						<span onClick={__logout} className="Log-out__button">
							Log out
						</span>
					</div>
				) : null}
			</div>
		</div>
	);
};

export default connect(null)(TopNav);
