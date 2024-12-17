import React from 'react';
import { Line } from 'react-chartjs-2';
import styles from '../styles/SellInPDF.module.css';

const SellInPDF = ({
	sellInData,
	growthPercentage,
	chartData,
	chartOptions,
}) => {
	return (
		<div className={styles.pdfContainer}>
			{/* Encabezado */}
			<header className={styles.header}>
				<h1>Reporte Ejecutivo - Sell In</h1>
				<p>Generado el: {new Date().toLocaleDateString()}</p>
			</header>

			{/* Resumen ejecutivo */}
			<section className={styles.summary}>
				<h2>Resumen Ejecutivo</h2>
				<p>
					Total 2023:{' '}
					{sellInData.unidades2023.reduce((acc, curr) => acc + curr, 0)}
				</p>
				<p>
					Total 2024:{' '}
					{sellInData.unidades2024.reduce((acc, curr) => acc + curr, 0)}
				</p>
				<p>
					Crecimiento:{' '}
					<span style={{ color: growthPercentage > 0 ? 'green' : 'red' }}>
						{growthPercentage.toFixed(2)}%
					</span>
				</p>
			</section>

			{/* Gráfica */}
			<section className={styles.chart}>
				<h2>Gráfica Comparativa</h2>
				<Line data={chartData} options={chartOptions} />
			</section>
		</div>
	);
};

export default SellInPDF;
