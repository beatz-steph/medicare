import React, { useState } from 'react';
import styled from 'styled-components';
import FormInput from '../form-input/form-input.component';
import { Modal } from 'reactstrap';

//redux part

const FormBody = styled.form`
	display: flex;
	flex-direction: column;
	margin: 1rem auto 0 auto;
	padding-bottom: 2rem;
	position: relative;
	width: 100%;
`;

const FormTitle = styled.h2`
	font-size: 2rem;
	font-weight: 400;
	color: #1b82c7;
	text-align: center;
	margin: 2rem 0 1rem 0;
`;

const FormButton = styled.button`
	padding: 1rem 2.5rem;
	border: none;
	color: #fff;
	background-color: #1b82c7;
	align-self: center;
	border-radius: 5px;
	font-size: 1.7rem;
	margin-top: 1rem;

	&:disabled {
		opacity: 0.5;
	}
`;

const CancelButton = styled.div`
	position: absolute;
	top: 1rem;
	right: 1rem;
	height: 2rem;
	width: 2rem;
	cursor: pointer;

	&& ion-icon {
		font-size: 1.7rem;
		color: #172b4d;
	}
`;

const FormPlaceholder = styled.div`
	width: 40rem;
	height: 5rem;
	border-radius: 5px;
	border: 1px dashed rgba(0, 0, 0, 0.3);
	margin: 1rem auto;
	display: flex;
	text-align: center;
	justify-content: center;
	align-items: center;
	font-size: 1.3rem;
	cursor: pointer;
`;

const Form = () => {
	const [formContent, setFormContent] = useState({
		name: '',
	});

	const [formShow, setFormShow] = useState(false);

	const __handleChange = (event) => {
		const { name, value } = event.target;
		setFormContent({
			...formContent,
			[name]: value,
		});
	};

	const toggle = () => {
		setFormShow(!formShow);
	};

	const __handleSubmit = async (e) => {
		e.preventDefault();
		dispatch(createCollectionStart(formContent));
	};

	return (
		<>
			<Modal style={{ marginTop: '10rem' }} isOpen={formShow}>
				<FormBody onSubmit={__handleSubmit}>
					<CancelButton onClick={toggle}>
						<ion-icon name="close"></ion-icon>
					</CancelButton>

					<FormTitle>Create a collection</FormTitle>
					<FormInput
						name="name"
						placeholder="Collection name"
						handleChange={__handleChange}
						type="text"
						value={formContent.name}
					/>
					<FormButton disabled={isCreating}>
						{isCreating ? 'Creating collection' : 'Create'}
					</FormButton>
				</FormBody>
			</Modal>
			<FormPlaceholder
				onClick={() => {
					setFormShow(true);
				}}
			>
				Click here to add a new collection
			</FormPlaceholder>
		</>
	);
};

export default Form;
