import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import html2pdf from 'html2pdf.js';
import styles from '../styles/SellIn.module.css';
import SellInVsMeta2024 from '../components/SellInVsMeta2024';
import SellIn2025VsMeta2025 from '../components/SellIn2025VsMeta2025';
import CardAvanceMeta from '../components/CardAvanceMeta.jsx';
import CardOrdenesCompra from '../components/ CardOrdenesCompra.jsx';
import '../styles/global.css';
import Header from '../components/Header.jsx';
import SellInPDF from '../components/SellInPDF.jsx';

// Registrar componentes de Chart.js
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
);

const SellIn = () => {
	const { sellInData, pedidosData, fetchSellInData } = useGlobalContext(); // Traer datos del contexto global
	const navigate = useNavigate();
	const [growthPercentage, setGrowthPercentage] = useState(0);
	const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); // Mes actual
	const [isExpanded, setIsExpanded] = useState(false); // Estado para expandir la gráfica

	// Cargar datos desde el backend al montar el componente
	useEffect(() => {
		fetchSellInData();
	}, []);

	if (!pedidosData) {
		return <p>Cargando datos de pedidos...</p>;
	}

	// Calcular el crecimiento entre 2023 y 2024
	useEffect(() => {
		if (
			sellInData.unidades2023.length > 0 &&
			sellInData.unidades2024.length > 0
		) {
			const total2023 = sellInData.unidades2023.reduce(
				(acc, curr) => acc + curr,
				0,
			);
			const total2024 = sellInData.unidades2024.reduce(
				(acc, curr) => acc + curr,
				0,
			);
			const growth = ((total2024 - total2023) / total2023) * 100;
			setGrowthPercentage(growth);
		}
	}, [sellInData]);

	// Calcular valores del mes actual vs mismo mes del año anterior
	const currentMonthValue2024 = sellInData.unidades2024[currentMonth] || 0;
	const currentMonthValue2023 = sellInData.unidades2023[currentMonth] || 0;
	const monthlyGrowth =
		currentMonthValue2023 > 0
			? ((currentMonthValue2024 - currentMonthValue2023) /
					currentMonthValue2023) *
			  100
			: 0;

	const monthlyGrowthIcon = monthlyGrowth > 0 ? '↑' : '↓';
	const monthlyGrowthColor = monthlyGrowth > 0 ? 'green' : 'red';

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
				label: '2023',
				data: sellInData.unidades2023,
				borderColor: 'blue',
				backgroundColor: 'rgba(0, 0, 255, 0.2)',
				fill: true,
			},
			{
				label: '2024',
				data: sellInData.unidades2024,
				borderColor: 'green',
				backgroundColor: 'rgba(0, 255, 0, 0.2)',
				fill: true,
			},
			{
				label: '2025',
				data: sellInData.unidades2025 || Array(12).fill(0),
				borderColor: 'red',
				backgroundColor: 'rgba(255, 0, 0, 0.2)',
				fill: true,
			},
		],
	};

	// Opciones de la gráfica
	const chartOptions = {
		responsive: true,
		plugins: {
			title: {
				display: true,
				text: 'Comparación de Sell In (2023-2025)',
			},
			tooltip: {
				mode: 'index',
				intersect: false, // Muestra los valores de los 3 años al pasar el mouse
			},
		},
		scales: {
			x: {
				ticks: {
					autoSkip: true,
				},
			},
		},
	};

	// Manejar el clic para expandir la gráfica
	const handleChartClick = () => {
		setIsExpanded(!isExpanded); // Cambiar el estado de expansión
	};

	// Manejar la descarga del reporte en PDF

	const handleDownloadPDF = async () => {
		const element = pdfRef.current; // Contenedor del PDF
		const options = {
			margin: [10, 10, 10, 10],
			filename: 'sell_in_report.pdf',
			html2canvas: { scale: 2 },
			jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
		};

		await html2pdf().from(element).set(options).save();
	};

	return (
		<div className={styles.pageContainer}>
			<Header />

			{/* Contenedor principal con cards y gráfica */}
			<div className={styles.row}>
				{/* Contenedor para las cards */}
				<div className={styles.cardsContainer}>
					{/* Primera card: Sell In acumulado */}
					<div className={styles.card}>
						<div className={styles.cardContent}>
							<h2 className={styles.cardTitle}>Sell In YTD</h2>
							<p className={styles.cardText}>
								Total 2023:{' '}
								{sellInData.unidades2023
									.reduce((acc, curr) => acc + curr, 0)
									.toLocaleString('en-US')}
							</p>
							<p className={styles.cardText}>
								Total 2024:{' '}
								{sellInData.unidades2024
									.reduce((acc, curr) => acc + curr, 0)
									.toLocaleString('en-US')}
							</p>
							<p className={styles.cardText}>
								Crecimiento:{' '}
								<span style={{ color: growthPercentage > 0 ? 'green' : 'red' }}>
									{growthPercentage.toFixed(2)}%{' '}
									{growthPercentage > 0 ? '↑' : '↓'}
								</span>
							</p>
						</div>
					</div>

					{/* Segunda card: Comparación mensual */}
					<div className={styles.card}>
						<div className={styles.cardContent}>
							<h2 className={styles.cardTitle}>Comparación Mensual</h2>
							<p className={styles.cardText}>
								Mes actual (
								{new Date().toLocaleString('default', { month: 'long' })}):
								{` ${currentMonthValue2024.toLocaleString('en-US')}`}
							</p>
							<p className={styles.cardText}>
								Mismo mes del año anterior:{' '}
								{` ${currentMonthValue2023.toLocaleString('en-US')}`}
							</p>
							<p className={styles.cardText}>
								Crecimiento:{' '}
								<span style={{ color: monthlyGrowthColor }}>
									{monthlyGrowth.toFixed(2)}% {monthlyGrowthIcon}
								</span>
							</p>
						</div>
					</div>
				</div>

				{/* Gráfica comparativa */}
				<div
					className={`${styles.chartContainer} ${
						isExpanded ? styles.expanded : ''
					}`}
					onClick={handleChartClick} // Expandir o reducir la gráfica al hacer clic
				>
					<Line data={chartData} options={chartOptions} />
				</div>
			</div>

			{/* Contenedor para las dos gráficas nuevas */}
			<div className={styles.row}>
				<SellInVsMeta2024 sellInData={sellInData} />
				<SellIn2025VsMeta2025 sellInData={sellInData} />
			</div>
			<div>
				<div></div>
			</div>

			<div className={styles.row}>
				{/* Card de Avance Mensual */}
				<CardAvanceMeta
					sellInData={sellInData}
					pedidosData={pedidosData}
					currentYear={new Date().getFullYear()}
					currentMonth={new Date().getMonth() + 1}
				/>
				<div className={styles.card}>
					<CardOrdenesCompra />
				</div>
			</div>
		</div>
	);
};

export default SellIn;
