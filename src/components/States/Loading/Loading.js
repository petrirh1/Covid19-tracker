import React from 'react';
import { Backdrop, CircularProgress, Typography } from '@material-ui/core';

const Loading = ({ status }) => {
	return (
		<Backdrop
			style={{ zIndex: 9000, display: 'flex', flexDirection: 'column' }}
			open={status === 'loading' ? true : false}>
			<CircularProgress style={{ color: 'white' }} />
			<Typography variant='h6' style={{ color: 'white', marginTop: '2rem' }}>
				Loading goodies..
			</Typography>
		</Backdrop>
	);
};

export default Loading;
