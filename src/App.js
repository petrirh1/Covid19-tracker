import React, { useState } from 'react';
import { Map, Layout, Loading, Error } from './components';
import { useQuery } from 'react-query';

import './App.css';

const fetchData = async () => {
	const res = await fetch('https://disease.sh/v3/covid-19/countries');
	return res.json();
};

function App() {
	const [selectedCountry, setSelectedCountry] = useState(null);
	const [mapZoom, setMapZoom] = useState({ zoom: 3, minZoom: 3, maxZoom: 18 });
	const { data, status } = useQuery('countries', fetchData, { refetchOnWindowFocus: false });

	return (
		<div className='app__root'>
			<Loading status={status} />
			<Error status={status} />
			<Layout
				data={data}
				setSelectedCountry={setSelectedCountry}
				mapZoom={mapZoom}
				setMapZoom={setMapZoom}
			/>
			<Map
				data={data}
				selectedCountry={selectedCountry}
				mapZoom={mapZoom}
				setMapZoom={setMapZoom}
			/>
		</div>
	);
}

export default App;
