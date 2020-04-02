import React from 'react';

import styled from 'styled-components';

const CardBody = styled.div`
	background-color: #fff;
	border-bottom: 1px solid rgba(0, 0, 0, 0.15);
	width: 100%;
	margin-top: 2rem;
`;

const CardTitle = styled.h2`
	color: #c1c1c1;
	font-size: 2rem;
	font-weight: '800';
	margin-left: 2rem;
`;

const CardContent = styled.p`
	color: #c1c1c1;
	font-size: 1.4rem;
	font-weight: '300';
	overflow: hidden;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
`;

const CardAuthor = styled.h3`
	color: #c1c1c1;
	font-size: 1.4rem;
	font-weight: '800';
`;

const Holder = styled.div`
	justify-content: space-between;
	align-items: center;
	display: flex;
	flex-direction: row;
`;

const Button = styled.div`
	align-self: center;
	position: relative;
	letter-spacing: 0.025em;
	font-size: 1.3rem;
	line-height: 1.5;
	padding: 0.3rem 2.5rem;
	box-shadow: 0 0.5rem 1.5rem rgba($color: #000000, $alpha: 0.15);
	margin: 1rem 0 0 0;
	cursor: pointer;
	transition: all 0.3s ease-in-out;
	color: #a1a1a1;

	&:active {
		transform: translate(0, 2px);
		outline: none;
		box-shadow: 0 0.3rem 1rem rgba($color: #000000, $alpha: 0.15);
	}
`;

const Card = ({ feed }) => {
	return (
		<CardBody>
			<CardTitle>{feed.title}</CardTitle>
			<CardContent>{feed.content}</CardContent>
			<Holder>
				<CardAuthor>
					by: {`${feed.writer.surname} ${feed.writer.firstname}`}
				</CardAuthor>
				<Button>Learn more</Button>
			</Holder>
		</CardBody>
	);
};

export default Card;
