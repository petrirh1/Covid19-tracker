import React from 'react';
import { Graph } from '.';
import { Card, CardContent, Typography, Hidden } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useQuery } from 'react-query';
import NumberFormat from 'react-number-format';
import ReactTimeAgo from 'react-time-ago';
import JavascriptTimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

import './CasesCard.css';
JavascriptTimeAgo.addLocale(en);

const fetchAll = async () => {
	const res = await fetch('https://disease.sh/v3/covid-19/all');
	return res.json();
};

const CasesCard = () => {
	const { data, status } = useQuery('all', fetchAll);

	return (
		<Hidden smDown>
			<Card className='casesCard__root'>
				<CardContent>
					<div className='casesCard__header'>
						<Typography variant='h5' color='textPrimary'>
							Cases worldwide
						</Typography>
						{status === 'loading' && <Skeleton />}
						{data && data.updated && (
							<Typography variant='body2' color='textSecondary' gutterBottom>
								Updated {<ReactTimeAgo date={new Date(data.updated)} />}
							</Typography>
						)}
					</div>
					<div className='casesCard__container'>
						<div className='casesCard__dataGroup'>
							<div>
								<Typography variant='h6' color='textPrimary'>
									{status === 'loading' && <Skeleton />}
									{data && (
										<NumberFormat
											value={data.cases}
											displayType={'text'}
											thousandSeparator={true}
										/>
									)}
									{status === 'error' && '-'}
								</Typography>
								<Typography variant='subtitle2' color='textSecondary'>
									{status === 'loading' ? <Skeleton /> : 'Cases total'}
								</Typography>
							</div>
							<div>
								<Typography variant='h6' color='textPrimary'>
									{status === 'loading' && <Skeleton />}
									{data && (
										<NumberFormat
											prefix={'+'}
											value={data.todayCases}
											displayType={'text'}
											thousandSeparator={true}
										/>
									)}
									{status === 'error' && '-'}
								</Typography>
								<Typography variant='subtitle2' color='textSecondary'>
									{status === 'loading' ? <Skeleton /> : 'Cases today'}
								</Typography>
							</div>
						</div>
						<div className='casesCard__dataGroup'>
							<div>
								<Typography variant='h6' color='textPrimary'>
									{status === 'loading' && <Skeleton />}
									{data && (
										<NumberFormat
											value={data.recovered}
											displayType={'text'}
											thousandSeparator={true}
										/>
									)}
									{status === 'error' && '-'}
								</Typography>
								<Typography variant='subtitle2' color='textSecondary'>
									{status === 'loading' ? <Skeleton /> : 'Recovered total'}
								</Typography>
							</div>
							<div>
								<Typography variant='h6' color='textPrimary'>
									{status === 'loading' && <Skeleton />}
									{data && (
										<NumberFormat
											prefix={'+'}
											value={data.todayRecovered}
											displayType={'text'}
											thousandSeparator={true}
										/>
									)}
									{status === 'error' && '-'}
								</Typography>
								<Typography variant='subtitle2' color='textSecondary'>
									{status === 'loading' ? <Skeleton /> : 'Recovered today'}
								</Typography>
							</div>
						</div>
						<div className='casesCard__dataGroup'>
							<div>
								<Typography variant='h6' color='textPrimary'>
									{status === 'loading' && <Skeleton />}
									{data && (
										<NumberFormat
											value={data.deaths}
											displayType={'text'}
											thousandSeparator={true}
										/>
									)}
									{status === 'error' && '-'}
								</Typography>
								<Typography variant='subtitle2' color='textSecondary'>
									{status === 'loading' ? <Skeleton /> : 'Deaths total'}
								</Typography>
							</div>
							<div>
								<Typography variant='h6' color='textPrimary'>
									{status === 'loading' && <Skeleton />}
									{data && (
										<NumberFormat
											prefix={'+'}
											value={data.todayDeaths}
											displayType={'text'}
											thousandSeparator={true}
										/>
									)}
									{status === 'error' && '-'}
								</Typography>
								<Typography variant='subtitle2' color='textSecondary'>
									{status === 'loading' ? <Skeleton /> : 'Deaths today'}
								</Typography>
							</div>
						</div>
					</div>
					<Graph />
				</CardContent>
			</Card>
		</Hidden>
	);
};

export default CasesCard;
