import React, { useState } from 'react';

import './top-nav.styles.scss';

const TopNav = () => {
	const [showDrop, setShowDrop] = useState(false);

	const _toggleDrop = () => {
		setShowDrop(!showDrop);
	};

	const __logout = () => {
		console.log('log out');
	};

	return (
		<div className="search-bar">
			<ion-icon name="ios-search"></ion-icon>
			<input
				type="text"
				placeholder="Search..."
				className="search-bar__input"
			/>
		</div>
	);
};

export default TopNav;
