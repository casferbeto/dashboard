import React from 'react';
import styles from '../styles/CardAvanceMeta.module.css';

const CardAvanceMeta = ({
	sellInData,
	pedidosData,
	currentYear,
	currentMonth,
}) => {
	// Lista de nombres de meses
	const monthNames = [
		'Enero',
		'Febrero',
		'Marzo',
		'Abril',
		'Mayo',
		'Junio',
		'Julio',
		'Agosto',
		'Septiembre',
		'Octubre',
		'Noviembre',
		'Diciembre',
	];

	// Obtener el nombre del mes
	const nombreMes = monthNames[currentMonth - 1]; // currentMonth viene de la base de datos (1 a 12)

	// Acceso a meta según el año
	const metas =
		currentYear === 2024
			? sellInData.metas2024 || Array(12).fill(0) // Asegúrate de tener un arreglo válido
			: sellInData.metas2025 || Array(12).fill(0);

	const metaActual = metas[currentMonth - 1] || 0; // Confirma que estás accediendo al índice correcto

	// Obtener valores del mes actual de pedidos
	const pedidosMesActual = pedidosData.find(
		(item) => item.year === currentYear && item.month === currentMonth,
	);

	const facturado = pedidosMesActual?.facturado || 0;
	const pendienteCita = pedidosMesActual?.pendiente_cita || 0;

	// Calcular el avance y color del porcentaje
	const avance = metaActual > 0 ? (facturado / metaActual) * 100 : 0;
	let colorAvance = '';
	if (avance < 50) {
		colorAvance = 'red';
	} else if (avance < 80) {
		colorAvance = 'yellow';
	} else {
		colorAvance = 'green';
	}

	// Aseguramos que los valores sean numéricos y válidos
	const facturadoNumber = parseFloat(facturado) || 0;
	const pendienteCitaNumber = parseFloat(pendienteCita) || 0;
	const metaActualNumber = parseFloat(metaActual) || 0;

	// Calcular cierre proyectado
	const cierreProyectado = facturadoNumber + pendienteCitaNumber;

	// Calcular porcentaje de cierre proyectado
	const porcentajeCierreProyectado =
		metaActualNumber > 0 ? (cierreProyectado / metaActualNumber) * 100 : 0;

	// Consolas para verificar los valores
	console.log('Facturado:', facturadoNumber);
	console.log('Pendiente Cita:', pendienteCitaNumber);
	console.log('Meta Actual:', metaActualNumber);
	console.log('Cierre Proyectado:', cierreProyectado);
	console.log('Porcentaje Cierre Proyectado:', porcentajeCierreProyectado);

	return (
		<div className={styles.card}>
			<h2 className={styles.cardTitle}>Avance Mensual: {nombreMes}</h2>
			<p className={styles.cardText}>
				<strong>Meta:</strong> {metaActual.toLocaleString('en-US')} unidades
			</p>
			<p className={styles.cardText}>
				<strong>Facturado:</strong>{' '}
				{parseInt(facturado).toLocaleString('en-US')} unidades
			</p>
			<p className={styles.cardText}>
				<strong>Avance:</strong>{' '}
				<span style={{ color: colorAvance }}>{avance.toFixed(2)}% </span>
			</p>
			<p className={styles.cardText}>
				<strong>Pendiente con cita:</strong>{' '}
				{parseInt(pendienteCita).toLocaleString('en-US')} unidades
			</p>
			<p className={styles.cardText}>
				<strong>Cierre Proyectado:</strong>{' '}
				<span
					style={{
						color: porcentajeCierreProyectado >= 100 ? 'green' : 'orange',
					}}
				>
					{porcentajeCierreProyectado.toFixed(2)}%{' '}
				</span>
			</p>
		</div>
	);
};

export default CardAvanceMeta;
