import React from 'react';
import { Search, ZoomControl, CasesCard } from './';
import PropTypes from 'prop-types';

import './Layout.css';

const Layout = ({ data, setSelectedCountry, mapZoom, setMapZoom }) => {
	return (
		<div className='layout__root'>
			<ZoomControl mapZoom={mapZoom} setMapZoom={setMapZoom} />
			<Search data={data} setSelectedCountry={setSelectedCountry} />
			<CasesCard />
		</div>
	);
};

Layout.propTypes = {
	data: PropTypes.array,
	setSelectedCountry: PropTypes.func,
	mapZoom: PropTypes.object,
	setMapZoom: PropTypes.func
};

export default Layout;
