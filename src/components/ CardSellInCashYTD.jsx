import React, { useEffect, useState } from 'react';
import styles from '../styles/CardSellInCash.module.css';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const CardSellInCashYTD = () => {
	const currentDate = new Date();
	const [data, setData] = useState({
		ventaActual: 0,
		ventaAnterior: 0,
		compraMXNActual: 0,
		compraMXNAnterior: 0,
		compraCajaActual: 0,
		compraCajaAnterior: 0,
		ventaCajaActual: 0,
		ventaCajaAnterior: 0,
		compraPiezasActual: 0,
		compraPiezasAnterior: 0,
		ventaPiezasActual: 0,
		ventaPiezasAnterior: 0,
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const currentYear = currentDate.getFullYear();
				const currentMonth =
					new Date()
						.toLocaleString('default', { month: 'long' })
						.charAt(0)
						.toUpperCase() +
					new Date().toLocaleString('default', { month: 'long' }).slice(1);

				// Función para obtener totales acumulados por año
				const fetchTotals = async (year) => {
					const response = await fetch(
						`http://localhost:5001/api/sell-in-cash-accumulated?year=${year}&month=${currentMonth}`,
					);
					const result = await response.json();
					return result.totals || {}; // Asegura que siempre regrese un objeto
				};

				// Obtener totales del año actual y anterior
				const totalsActual = await fetchTotals(currentYear);
				const totalsAnterior = await fetchTotals(currentYear - 1);

				// Asignar valores seguros a state
				setData({
					ventaActual: totalsActual.totalVentaMXN || 0,
					ventaAnterior: totalsAnterior.totalVentaMXN || 0,
					compraMXNActual: totalsActual.totalCompraMXN || 0,
					compraMXNAnterior: totalsAnterior.totalCompraMXN || 0,
					compraCajaActual: totalsActual.totalCompraCaja || 0,
					compraCajaAnterior: totalsAnterior.totalCompraCaja || 0,
					ventaCajaActual: totalsActual.totalVentaCaja || 0,
					ventaCajaAnterior: totalsAnterior.totalVentaCaja || 0,
					compraPiezasActual: totalsActual.totalCompraPiezas || 0,
					compraPiezasAnterior: totalsAnterior.totalCompraPiezas || 0,
					ventaPiezasActual: totalsActual.totalVentaPiezas || 0,
					ventaPiezasAnterior: totalsAnterior.totalVentaPiezas || 0,
				});
			} catch (error) {
				console.error('Error fetching sell_in_cash data:', error);
			}
		};

		fetchData();
	}, []);

	// Función para renderizar cada card
	const renderCard = (title, actual, anterior, formatAsCurrency = true) => {
		const safeActual = actual || 0;
		const safeAnterior = anterior || 0;
		const growth =
			safeAnterior !== 0
				? ((safeActual - safeAnterior) / safeAnterior) * 100
				: 0;

		// Formato numérico con separador de comas
		const formatNumber = (value, asCurrency = true) => {
			return asCurrency
				? `$${Number(value).toLocaleString('en-US')}`
				: Number(value).toLocaleString('en-US');
		};

		return (
			<div className={styles.card}>
				<div className={styles.cardHeader}>
					<h3>{title}</h3>
				</div>
				<div className={styles.cardBody}>
					<p>
						<strong>Acumulado Actual:</strong>{' '}
						{formatNumber(safeActual, formatAsCurrency)}
					</p>
					<p>
						<strong>Acumulado AA:</strong>{' '}
						{formatNumber(safeAnterior, formatAsCurrency)}
					</p>
					<p className={styles.resultText}>
						<strong>Resultado:</strong>{' '}
						<span className={growth >= 0 ? styles.green : styles.red}>
							{growth.toFixed(2)}%{' '}
							{growth >= 0 ? <FaArrowUp /> : <FaArrowDown />}
						</span>
					</p>
				</div>
			</div>
		);
	};

	return (
		<div className={styles.cardContainer}>
			{renderCard('Venta MXN', data.ventaActual, data.ventaAnterior)}
			{renderCard('Compra MXN', data.compraMXNActual, data.compraMXNAnterior)}
			{renderCard(
				'Compra Caja',
				data.compraCajaActual,
				data.compraCajaAnterior,
				false,
			)}
			{renderCard(
				'Venta Caja',
				data.ventaCajaActual,
				data.ventaCajaAnterior,
				false,
			)}
			{renderCard(
				'Compra Piezas',
				data.compraPiezasActual,
				data.compraPiezasAnterior,
				false,
			)}
			{renderCard(
				'Venta Piezas',
				data.ventaPiezasActual,
				data.ventaPiezasAnterior,
				false,
			)}
		</div>
	);
};

export default CardSellInCashYTD;
