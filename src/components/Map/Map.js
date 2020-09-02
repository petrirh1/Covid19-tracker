import React, { useState, useEffect } from 'react';
import { InfoPopup } from './';
import { Map as LeafletMap, TileLayer, Circle } from 'react-leaflet';
import PropTypes from 'prop-types';

import 'leaflet/dist/leaflet.css';
import './Map.css';

const Map = ({ data, selectedCountry, mapZoom, setMapZoom }) => {
	const [popup, setPopup] = useState(null);
	const [viewport, setViewport] = useState({
		center: [50, 31]
	});

	useEffect(() => {
		if (selectedCountry) {
			const { lat, long } = selectedCountry.countryInfo;

			setPopup(selectedCountry);
			setMapZoom({ ...mapZoom, zoom: mapZoom.minZoom });
			setViewport({
				center: [lat, long]
			});
		}
	}, [selectedCountry]);

	const handlePopupClose = () => {
		setPopup(null);
	};

	const handleViewportChange = viewport => {
		if (viewport.zoom === mapZoom.zoom) return;
		setMapZoom({ ...mapZoom, zoom: viewport.zoom });
	};

	useEffect(() => {
		console.log('viewport: ', viewport.zoom);
	}, [viewport]);

	const handleClick = country => {
		const { lat, long } = country.countryInfo;

		setPopup(country);
		setViewport({
			...viewport,
			center: [lat, long]
		});
	};

	return (
		<div className='map__root'>
			<LeafletMap
				maxBoundsViscosity={1}
				maxBounds={[[-180, -Infinity], [180, Infinity]]}
				worldCopyJump={true}
				zoomControl={false}
				onViewportChange={viewport => handleViewportChange(viewport)}
				center={viewport.center}
				minZoom={mapZoom.minZoom}
				maxZoom={mapZoom.maxZoom}
				zoom={mapZoom.zoom}
				animate={true}>
				<TileLayer
					url='https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png'
					attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
				/>
				{data?.map(country => (
					<Circle
						onClick={() => {
							handleClick(country);
						}}
						color={'#F66D55'}
						key={country.country}
						center={[country.countryInfo.lat, country.countryInfo.long]}
						fillOpacity={0.5}
						radius={Math.sqrt(country.cases * 6000 * 50)}></Circle>
				))}
				{popup && <InfoPopup data={popup} handlePopupClose={handlePopupClose} />}
			</LeafletMap>
		</div>
	);
};

Map.propTypes = {
	data: PropTypes.array,
	setSelectedCountry: PropTypes.func,
	mapZoom: PropTypes.object,
	setMapZoom: PropTypes.func
};

export default Map;
