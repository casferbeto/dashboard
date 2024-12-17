import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import styles from '../styles/BarChart.module.css';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
);

const CompraPiezasBarChart = () => {
	const [data, setData] = useState(null);
	const [showZoom, setShowZoom] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					'http://localhost:5001/api/compra-piezas-by-year',
				);
				if (!response.ok) throw new Error('Error en la respuesta del servidor');

				const result = await response.json();

				// Validar la estructura de los datos antes de asignarlos
				if (
					result.months &&
					result.data2023 &&
					result.data2024 &&
					result.data2025
				) {
					setData({
						labels: result.months,
						datasets: [
							{
								label: '2023',
								data: result.data2023,
								backgroundColor: 'rgba(255, 99, 132, 0.5)',
							},
							{
								label: '2024',
								data: result.data2024,
								backgroundColor: 'rgba(54, 162, 235, 0.5)',
							},
							{
								label: '2025',
								data: result.data2025,
								backgroundColor: 'rgba(75, 192, 192, 0.5)',
							},
						],
					});
				} else {
					console.error(
						'La respuesta no contiene la estructura esperada:',
						result,
					);
				}
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}, []);

	if (!data) return <p>Cargando datos...</p>;

	return (
		<div>
			{/* Gráfica normal */}
			<div
				style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}
				className={styles.chartContainer}
				onClick={() => setShowZoom(true)}
			>
				<Bar
					data={data}
					options={{
						responsive: true,
						plugins: {
							legend: { position: 'top' },
							title: {
								display: true,
								text: 'Comparativa SELL IN (2023-2025)',
							},
							tooltip: { enabled: true },
						},
						interaction: {
							mode: 'index',
							intersect: false,
						},
						scales: {
							y: { beginAtZero: true },
						},
					}}
				/>
			</div>

			{/* Gráfica con zoom */}
			{showZoom && (
				<div className={styles.zoomOverlay} onClick={() => setShowZoom(false)}>
					<div className={styles.zoomChart}>
						<Bar
							data={data}
							options={{
								responsive: true,
								plugins: {
									legend: { position: 'top' },
									title: {
										display: true,
										text: 'Comparativa de SELL IN (Zoom)',
									},
								},
								interaction: {
									mode: 'index',
									intersect: false,
								},
								scales: {
									y: { beginAtZero: true },
								},
							}}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default CompraPiezasBarChart;
