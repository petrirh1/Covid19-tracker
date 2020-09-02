import React from 'react';
import { Card, IconButton, Divider, Hidden } from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';

import './ZoomControl.css';

const ZoomControl = ({ mapZoom, setMapZoom }) => {
	const handleZoomIn = () => {
		setMapZoom({ ...mapZoom, zoom: mapZoom.zoom + 1 });
	};

	const handleZoomOut = () => {
		setMapZoom({ ...mapZoom, zoom: mapZoom.zoom - 1 });
	};

	return (
		<Hidden xsDown>
			<Card className='zoomControl__root'>
				<IconButton
					disabled={mapZoom.zoom === mapZoom.maxZoom}
					onClick={handleZoomIn}
					aria-label='zoom in'
					size='small'>
					<AddIcon />
				</IconButton>
				<Divider />
				<IconButton
					disabled={mapZoom.zoom === mapZoom.minZoom}
					onClick={handleZoomOut}
					aria-label='zoom out'
					size='small'>
					<RemoveIcon />
				</IconButton>
			</Card>
		</Hidden>
	);
};

ZoomControl.propTypes = {
	mapZoom: PropTypes.object,
	setMapZoom: PropTypes.func
};

export default ZoomControl;
