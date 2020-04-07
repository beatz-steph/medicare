import React, { useState } from 'react';
import Downshift from 'downshift';
import TopNav from '../../components/top-nav/top-nav.component';
import Search from '../../components/Searchbar';

const PatientList = ({ patients }) => {
	const items = patients.map((item) => ({
		...item,
		value: `${item.firstname.toLowerCase()} ${item.surname.toLowerCase()}`,
	}));

	const [filtered, setFiltered] = useState('');

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				width: '82%',
				padding: '3rem',
			}}
		>
			<div className="search-bar">
				<ion-icon name="ios-search"></ion-icon>
				<input
					type="text"
					placeholder="Search..."
					className="search-bar__input"
					value={filtered}
					onChange={(e) => {
						setFiltered(e.target.value);
					}}
				/>
			</div>
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
						<th scope="col">Firstname</th>
						<th scope="col">Surname</th>
						<th scope="col">Email</th>
						<th scope="col">Phone number</th>
					</tr>
				</thead>
				<tbody>
					{patients
						.filter(
							(patient) =>
								patient.surname.toLowerCase().includes(filtered) ||
								patient.firstname.toLowerCase().includes(filtered) ||
								patient.email.toLowerCase().includes(filtered),
						)
						.map((patient, index) => {
							return (
								<tr key={index}>
									<th scope="row">{index + 1}</th>
									<td>{patient.firstname}</td>
									<td>{patient.surname}</td>
									<td>{patient.email}</td>
									<td>+234 7054 485 648</td>
								</tr>
							);
						})}
				</tbody>
			</table>
		</div>
	);
};

export default PatientList;
