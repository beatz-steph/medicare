import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-responsive-modal';

const PageHolder = styled.div`
	width: 82%;
	height: 100%;
	overflow-y: scroll;
	padding: 3%;
	display: flex;
	flex-direction: column;
	align-items: center;
	font-size: 1.6rem;
	position: relative;
`;

const Title = styled.div`
	font-size: 3rem;
	font-weight: 300;
	text-align: center;
	margin-bottom: 1rem;
`;

const Btn = styled.button`
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
	color: #ffffff;
	background-color: #1b82c7;
	transition: all 0.3s ease-in-out;

	&:active {
		transform: translate(0, 2px);
		outline: none;
		box-shadow: 0 0.3rem 1rem rgba($color: #000000, $alpha: 0.15);
		background-color: rgb(21, 96, 146);
	}
`;

const AddBtn = styled.div`
	width: 6rem;
	height: 6rem;
	border-radius: 50%;
	background-color: #172c4f;
	position: absolute;
	bottom: 10rem;
	right: 7rem;
`;

const DrugRequest = () => {
	const [description, setDescription] = useState('');

	const [showModal, setShowModal] = useState(false);
	const __handleChange = (e) => {
		setDescription(e.target.value);
	};

	const __handleSubmit = (e) => {
		e.preventDefault();
		console.log(description);
	};

	return (
		<PageHolder>
			<AddBtn
				onClick={() => {
					setShowModal(true);
				}}
			/>
			<Modal
				open={showModal}
				onClose={() => {
					setShowModal(false);
				}}
				center
			>
				<div style={{ width: '70rem' }}>
					<form
						style={{
							width: '90%',
							display: 'flex',
							alignItems: 'center',
							flexDirection: 'column',
							margin: '1rem auto',
						}}
						onSubmit={__handleSubmit}
					>
						<label className="form-input">
							<textarea
								onChange={__handleChange}
								value={description}
								className="form-input__field"
								style={{ height: '30rem', padding: '2rem' }}
							></textarea>
						</label>

						<Btn disabled={description.length < 1} type="submit">
							Make Drug Request
						</Btn>
					</form>
				</div>
			</Modal>
			<Title>Drug request page</Title>
			<span style={{ marginBottom: '1rem' }}>Request history</span>
			<table className="table" style={{ fontSize: '1.4rem' }}>
				<thead
					className="thead"
					style={{
						backgroundColor: '#DDECF7',
						color: 'rgba(0, 0, 0, 0.35)',
						marginTop: '1rem',
					}}
				>
					<tr>
						<th scope="col"></th>
						<th scope="col">Patient name</th>
						<th scope="col">Date</th>
						<th scope="col">Status</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row">1</th>
						<td>akinjiola babaniyi</td>
						<td>23/04/2020</td>
						<td>pending</td>
					</tr>
					<tr>
						<th scope="row">2</th>
						<td>samuel jhonson</td>
						<td>23/04/2020</td>
						<td>cancelled</td>
					</tr>
					<tr>
						<th scope="row">3</th>
						<td>ajala joseph</td>
						<td>23/04/2020</td>
						<td>confirmed</td>
					</tr>
				</tbody>
			</table>
		</PageHolder>
	);
};

export default DrugRequest;
