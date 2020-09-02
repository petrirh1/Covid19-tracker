import React from 'react';
import { Skeleton } from '@material-ui/lab';
import { useQuery } from 'react-query';
import { Line } from 'react-chartjs-2';
import { defaults } from 'react-chartjs-2';
import numeral from 'numeral';

import './Graph.css';

defaults.global.defaultFontFamily = 'Roboto';
defaults.global.defaultFontColor = 'Black';

const options = {
	legend: {
		display: false
	},
	elements: {
		point: {
			radius: 0
		}
	},
	maintainAspectRatio: true,
	tooltips: {
		mode: 'index',
		intersect: false,
		callbacks: {
			label: function(tooltipItem, data) {
				return numeral(tooltipItem.value).format('0a');
			}
		}
	},
	scales: {
		xAxes: [
			{
				gridLines: {
					display: false
				},
				type: 'time',
				time: {
					tooltipFormat: 'll',
					unitStepSize: 11,
					displayFormats: {
						day: 'DD MMM',
						week: 'DD MMM',
						month: 'DD MMM',
						quarter: 'DD MMM',
						year: 'DD MMM'
					}
				}
			}
		],
		yAxes: [
			{
				gridLines: {
					display: true
				},
				ticks: {
					callback: function(value, index) {
						if (index % 2 !== 0) {
							return numeral(value).format('0a');
						}
					}
				}
			}
		]
	}
};

const fethcGraphData = async () => {
	const res = await fetch('https://disease.sh/v3/covid-19/historical/all');
	const data = await res.json();

	if (data && data.message) return null;

	return {
		labels: Object.keys(data.cases || data.timeline.cases),
		datasets: [
			{
				data: Object.values(data.cases || data.timeline.cases),
				fill: true,
				backgroundColor: 'rgba(239,100,88,0.5)',
				borderColor: '#EF6458',
				borderCapStyle: 'butt',
				borderDash: [],
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10
			}
		]
	};
};

const Graph = () => {
	const { data, status } = useQuery('graphData', fethcGraphData);

	return (
		<div className='graph__root'>
			{status === 'loading' && <Skeleton variant='rect' width={'100%'} height={166} />}
			{data && <Line data={data || {}} options={options}></Line>}
		</div>
	);
};

export default Graph;
