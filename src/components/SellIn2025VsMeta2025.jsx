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
} from 'chart.js';
import styles from '../styles/SellIn.module.css'; // Usa el CSS existente para consistencia

// Registrar los componentes de Chart.js
ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
);

const SellIn2025VsMeta2025 = ({ sellInData }) => {
	const [isExpanded, setIsExpanded] = useState(false); // Estado para expandir la gráfica

	// Datos para la gráfica
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
				label: 'Sell In 2025',
				data: sellInData.unidades2025 || Array(12).fill(0),
				backgroundColor: 'rgba(255, 0, 0, 0.6)', // Rojo para Sell In 2025
			},
			{
				label: 'Meta 2025',
				data: sellInData.metas2025 || Array(12).fill(0),
				backgroundColor: 'rgba(0, 191, 255, 0.6)', // Azul claro para Meta 2025
			},
		],
	};

	// Opciones para la gráfica
	const chartOptions = {
		responsive: true,
		plugins: {
			title: {
				display: true,
				text: 'Comparación de Sell In 2025 vs Meta 2025',
			},
			tooltip: {
				mode: 'index',
				intersect: false,
			},
		},
	};

	return (
		<div
			className={`${styles.chartContainer} ${
				isExpanded ? styles.expanded : ''
			}`}
			onClick={() => setIsExpanded(!isExpanded)} // Cambiar el estado para expandir/reducir la gráfica
		>
			<Bar data={chartData} options={chartOptions} />
		</div>
	);
};

export default SellIn2025VsMeta2025;
