import React from 'react';
import { TextField, Card } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import PropTypes from 'prop-types';

import './Search.css';

const Search = ({ data, setSelectedCountry }) => {
	const handleOnChange = (e, newValue) => {
		setSelectedCountry(newValue);
	};

	return (
		<Card className='search__root'>
			<Autocomplete
				className='search__autocomplete'
				options={data || []}
				onChange={(e, newValue) => handleOnChange(e, newValue)}
				autoHighlight
				getOptionLabel={option => option.country || ''}
				renderOption={option => option.country}
				renderInput={params => (
					<TextField
						{...params}
						margin='dense'
						label='Choose a country'
						variant='outlined'
						inputProps={{
							...params.inputProps,
							autoComplete: 'new-password'
						}}
					/>
				)}
			/>
		</Card>
	);
};

Search.propTypes = {
	data: PropTypes.array,
	setSelectedCountry: PropTypes.func
};

export default Search;
