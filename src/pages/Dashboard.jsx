import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import CardSellInCash from '../components/CardSellInCash';
import CardSellInCashYTD from '../components/ CardSellInCashYTD';
import styles from '../styles/Dashboard.module.css'; // Dashboard CSS
import '../styles/global.css';
import CompraPiezasBarChart from '../components/CompraPiezasBarChart';

const Dashboard = () => {
	const [isScreenSmall, setIsScreenSmall] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setIsScreenSmall(window.innerWidth < 1024);
		};

		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	if (isScreenSmall) {
		return (
			<div className={styles.messageContainer}>
				<h1 className={styles.messageText}>
					Por favor, haz más grande la pantalla para visualizar el dashboard.
				</h1>
			</div>
		);
	}

	return (
		<div className={styles.dashboardContainer}>
			<Header />
			<div className={styles.cardContainer}>
				<CardSellInCashYTD />

				<CardSellInCash />
			</div>

			<div>
				<CompraPiezasBarChart />
			</div>
		</div>
	);
};

export default Dashboard;
