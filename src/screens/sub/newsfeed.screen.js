import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import axios from 'axios';

import Card from '../../components/card/card.component';

const View = styled.div`
	width: 82%;
	padding: 2rem 3%;
	overflow-y: scroll;
`;

const NewsFeed = ({ dispatch }) => {
	let [newsfeed, setNewsfeed] = useState([]);

	useEffect(() => {
		let fetch = async () => {
			try {
				let news = await (await axios.get('http://localhost:8081/api/v1/news'))
					.data;
				console.log(news);
				setNewsfeed(news);
			} catch (err) {
				console.log(err);
			}
		};
		fetch();
	}, []);
	return (
		<View>
			{newsfeed.map(feed => {
				return <Card key={feed._id} feed={feed} />;
			})}
		</View>
	);
};

export default connect(null)(NewsFeed);
