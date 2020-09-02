import React from 'react';
import NumberFormat from 'react-number-format';
import { Typography } from '@material-ui/core';
import { Popup } from 'react-leaflet';
import PropTypes from 'prop-types';

import './InfoPopup.css';

const InfoPopup = ({ data, handlePopupClose }) => {
	return (
		<Popup
			autoPan={false}
			className='infoPopup__popup'
			position={[data.countryInfo.lat, data.countryInfo.long]}
			onClose={handlePopupClose}>
			<div className='InfoPopup__popupContent'>
				<div className='infoPopup__header'>
					<img src={data.countryInfo.flag} alt='country flag' width={24}></img>
					<Typography variant='h6'>{data.country}</Typography>
				</div>
				<div className='infoPopup__row'>
					<Typography variant='subtitle2'>Cases</Typography>
					<Typography variant='subtitle2'>
						<NumberFormat value={data.cases} displayType={'text'} thousandSeparator={true} />
					</Typography>
				</div>
				<div className='infoPopup__row'>
					<Typography variant='subtitle2'>Recovered</Typography>
					<Typography variant='subtitle2'>
						<NumberFormat value={data.recovered} displayType={'text'} thousandSeparator={true} />
					</Typography>
				</div>
				<div className='infoPopup__row'>
					<Typography variant='subtitle2'>Deaths</Typography>
					<Typography variant='subtitle2'>
						<NumberFormat value={data.deaths} displayType={'text'} thousandSeparator={true} />
					</Typography>
				</div>
			</div>
		</Popup>
	);
};

InfoPopup.propTypes = {
	data: PropTypes.array,
	handlePopupClose: PropTypes.func
};

export default InfoPopup;
