import styled from 'styled-components';

const btn = styled.input`
	align-self: center;
	position: relative;
	text-transform: uppercase;
	letter-spacing: 0.025em;
	font-size: 1.3rem;
	border-radius: 0.5rem;
	line-height: 1.5;
	border: 1px solid transparent;
	padding: 1rem 2.5rem;
	box-shadow: 0 0.5rem 1.5rem rgba($color: #000000, $alpha: 0.15);
	margin: 1rem 0 0 0;
	cursor: pointer;
	transition: all 0.3s ease-in-out;

	&:active {
		transform: translate(0, 2px);
		outline: none;
		box-shadow: 0 0.3rem 1rem rgba($color: #000000, $alpha: 0.15);
	}
`;

export const BtnMain = styled(btn).attrs(props => ({
	type: 'submit',
	placeholder: props.placeholder,
}))`
	color: #ffffff;
	background-color: #1b82c7;
	transition: all 0.3s ease-in-out;

	&:hover {
		background-color: rgb(21, 96, 146);
	}
`;
