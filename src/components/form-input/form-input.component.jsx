import React from 'react';

import './form-input.styles.scss';

const FormInput = ({ type, value, handleChange, name, placeholder }) => (
	<label className="form-input">
		<input
			type={type}
			value={value}
			onChange={handleChange}
			name={name}
			className="form-input__field"
			required
		/>
		<span
			className={` ${value.length > 0 ? 'fixed-label' : 'form-input__label'}`}
		>{`${placeholder}`}</span>
	</label>
);

export default FormInput;
