import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import axios from 'axios';

import Card from '../../components/card/card.component';

const baseurl = process.env.REACT_APP_BASE_URL;

const View = styled.div`
	width: 82%;
	padding: 2rem 3%;
	overflow-y: scroll;

	@media (max-width: 500px) {
		width: 100vw;
	}
`;

const NewsFeed = () => {
	let [newsfeed, setNewsfeed] = useState([]);

	useEffect(() => {
		let fetch = async () => {
			try {
				let news = await (await axios.get(`${baseurl}/api/v1/news`)).data;
				console.log(news);
				setNewsfeed(news);
			} catch (err) {
				console.log(err);
			}
		};
		fetch();

		return () => {
			setNewsfeed([]);
		};
	}, []);
	return (
		<View>
			{newsfeed &&
				newsfeed.map((feed) => {
					return <Card key={feed._id} feed={feed} />;
				})}
		</View>
	);
};

export default NewsFeed;
