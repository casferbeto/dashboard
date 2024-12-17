import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	Filler, // Registrar Filler si usas `fill`
} from 'chart.js';
import styles from '../styles/SellIn.module.css';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	Filler,
);

const SellInVsMeta2024 = ({ sellInData }) => {
	const [isExpanded, setIsExpanded] = useState(false); // Estado para expandir la gráfica

	// Datos de la gráfica
	const chartData = {
		labels: [
			'Ene',
			'Feb',
			'Mar',
			'Abr',
			'May',
			'Jun',
			'Jul',
			'Ago',
			'Sep',
			'Oct',
			'Nov',
			'Dic',
		],
		datasets: [
			{
				label: 'Sell In 2024',
				data: sellInData.unidades2024,
				backgroundColor: 'rgba(0, 255, 0, 0.6)',
			},
			{
				label: 'Meta 2024',
				data: sellInData.metas2024 || Array(12).fill(0),
				backgroundColor: 'rgba(255, 165, 0, 0.6)',
			},
		],
	};

	// Opciones de la gráfica
	const chartOptions = {
		responsive: true,
		plugins: {
			title: {
				display: true,
				text: 'Comparación de Sell In vs Meta 2024',
			},
			tooltip: {
				mode: 'index',
				intersect: false, // Mostrar todos los valores al pasar el mouse
			},
		},
		scales: {
			x: {
				ticks: {
					autoSkip: true,
				},
			},
			y: {
				beginAtZero: true,
			},
		},
	};

	return (
		<div
			className={`${styles.chartContainer} ${
				isExpanded ? styles.expanded : ''
			}`}
			onClick={() => setIsExpanded(!isExpanded)} // Expandir o reducir al hacer clic
		>
			<Bar data={chartData} options={chartOptions} />
		</div>
	);
};

export default SellInVsMeta2024;
