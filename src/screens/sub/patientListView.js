import React from 'react';
import Downshift from 'downshift';
import TopNav from '../../components/top-nav/top-nav.component';

const PatientList = ({ patients }) => {
	const items = patients.map((item) => ({
		...item,
		value: `${item.firstname.toLowerCase()} ${item.surname.toLowerCase()}`,
	}));
	return (
		<Downshift
			onChange={(selection) => console.log(selection)}
			itemToString={(item) => (item ? item.value : '')}
		>
			{({
				getInputProps,
				getItemProps,
				getLabelProps,
				getMenuProps,
				isOpen,
				inputValue,
				highlightedIndex,
				selectedItem,
				getRootProps,
			}) => (
				<div className="search-bar">
					<ion-icon name="ios-search"></ion-icon>
					<div
						style={{ display: 'inline-block' }}
						{...getRootProps({}, { suppressRefError: true })}
					>
						<input
							placeholder="Enter patient name"
							{...getInputProps()}
							className="search-bar__input"
						/>
					</div>
					<ul {...getMenuProps()} className="list-group">
						{isOpen
							? items
									.filter(
										(item) => !inputValue || item.value.includes(inputValue),
									)
									.map((item, index) => (
										<li
											className="list-group-item"
											{...getItemProps({
												key: item.value,
												index,
												item,
												style: {
													backgroundColor:
														highlightedIndex === index ? 'lightgray' : 'white',
													fontWeight: selectedItem === item ? 'bold' : 'normal',
												},
											})}
										>
											<span style={{ fontSize: '1.6rem' }}>{item.value}</span>
										</li>
									))
							: null}
					</ul>
				</div>
			)}
		</Downshift>
	);
};

export default PatientList;
