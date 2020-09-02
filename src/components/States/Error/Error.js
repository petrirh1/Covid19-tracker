import React from 'react';
import { Backdrop, Typography } from '@material-ui/core';

const Error = ({ status }) => {
	return (
		<Backdrop
			style={{ zIndex: 9000, display: 'flex', flexDirection: 'column' }}
			open={status === 'error' ? true : false}>
			<div>
				<Typography align='left' variant='h3' style={{ color: 'white' }}>
					Aw, snap!
				</Typography>
				<Typography variant='h6' style={{ color: 'white' }}>
					Something went wrong while displaying this site
				</Typography>
			</div>
		</Backdrop>
	);
};

export default Error;
