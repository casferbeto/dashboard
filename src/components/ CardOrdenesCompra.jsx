import React, { useState, useEffect } from 'react';
import styles from '../styles/CardOrdenesCompra.module.css';

const CardOrdenesCompra = () => {
	const today = new Date();
	const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

	const [sellInRiveraData, setSellInRiveraData] = useState([]);
	const [fechaInicial, setFechaInicial] = useState(
		firstDayOfMonth.toISOString().split('T')[0],
	);
	const [fechaFinal, setFechaFinal] = useState(
		today.toISOString().split('T')[0],
	);
	const [ordenesGeneradas, setOrdenesGeneradas] = useState(0);
	const [cajasTotales, setCajasTotales] = useState({});
	const [cantidadSurtida, setCantidadSurtida] = useState({});
	const [fillRate, setFillRate] = useState(0);
	const [totalOrdenadas, setTotalOrdenadas] = useState(0);
	const [totalSurtidas, setTotalSurtidas] = useState(0);

	// Fetch datos de sell_in_rivera
	const fetchSellInRivera = async () => {
		if (!fechaInicial || !fechaFinal) return;

		try {
			const response = await fetch(
				`http://localhost:5001/api/sell-in-rivera?fechaInicial=${fechaInicial}&fechaFinal=${fechaFinal}`,
			);
			const data = await response.json();
			setSellInRiveraData(data);
		} catch (error) {
			console.error('Error fetching sell_in_rivera data:', error);
		}
	};

	// Fetch data on date change
	useEffect(() => {
		fetchSellInRivera();
	}, [fechaInicial, fechaFinal]);

	// Procesar datos al cambiar los datos filtrados
	useEffect(() => {
		if (sellInRiveraData.length) {
			const uniqueFolios = new Set();
			let totalCajas = {};
			let totalSurtido = {};
			let sumOrdenadas = 0;
			let sumSurtidas = 0;

			sellInRiveraData.forEach((pedido) => {
				uniqueFolios.add(pedido.Folio);

				const sucursal = pedido.Nombre || 'Desconocido';
				if (!totalCajas[sucursal]) totalCajas[sucursal] = 0;
				if (!totalSurtido[sucursal]) totalSurtido[sucursal] = 0;

				const cantidadOrdenada = pedido['Cant. Ord.'] || 0;
				const cantidadSurtida = pedido['Cant. Surt.'] || 0;

				totalCajas[sucursal] += cantidadOrdenada;
				totalSurtido[sucursal] += cantidadSurtida;

				sumOrdenadas += cantidadOrdenada;
				sumSurtidas += cantidadSurtida;
			});

			setOrdenesGeneradas(uniqueFolios.size);
			setCajasTotales(totalCajas);
			setCantidadSurtida(totalSurtido);
			setTotalOrdenadas(sumOrdenadas);
			setTotalSurtidas(sumSurtidas);

			// Calcular el Fill Rate global correctamente
			const globalFillRate =
				sumOrdenadas > 0 ? (sumSurtidas / sumOrdenadas) * 100 : 0;
			setFillRate(globalFillRate);
		}
	}, [sellInRiveraData]);

	// Ajustar el color del Fill Rate
	const fillRateColor =
		fillRate < 60 ? 'red' : fillRate < 80 ? '#007BFF' : 'green';

	return (
		<div className={styles.card}>
			<h3>Órdenes de Compra (Rivera)</h3>
			<div className={styles.filterRow}>
				<div>
					<label>Fecha Inicial:</label>
					<input
						type="date"
						value={fechaInicial}
						onChange={(e) => setFechaInicial(e.target.value)}
					/>
				</div>
				<div>
					<label>Fecha Final:</label>
					<input
						type="date"
						value={fechaFinal}
						onChange={(e) => setFechaFinal(e.target.value)}
					/>
				</div>
			</div>
			<div>
				<p>Órdenes de compra generadas: {ordenesGeneradas}</p>
				<p>
					Total Cant Ordenada: {totalOrdenadas.toLocaleString('en-US')} cajas
				</p>
				<p>Total Cant Surtida: {totalSurtidas.toLocaleString('en-US')} cajas</p>
			</div>
			<div className={styles.row}>
				<div className={styles.column}>
					<h4>Cantidad Ordenada</h4>
					<ul>
						{Object.entries(cajasTotales).map(([sucursal, total]) => (
							<li key={sucursal}>
								<span>{sucursal}:</span>
								<span>{total.toLocaleString('en-US')} cajas</span>
							</li>
						))}
					</ul>
				</div>
				<div className={styles.column}>
					<h4>Cantidad Surtida</h4>
					<ul>
						{Object.entries(cantidadSurtida).map(([sucursal, total]) => (
							<li key={sucursal}>
								<span>{sucursal}:</span>
								<span>{total.toLocaleString('en-US')} cajas</span>
							</li>
						))}
					</ul>
				</div>
			</div>
			<div>
				<p style={{ backgroundColor: '#f1f1f1', color: fillRateColor }}>
					Fill Rate Promedio: {fillRate.toFixed(2)}%
				</p>
			</div>
		</div>
	);
};

export default CardOrdenesCompra;
