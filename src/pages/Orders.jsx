import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import styles from '../styles/Orders.module.css';

const Orders = () => {
	const [sellInRiveraData, setSellInRiveraData] = useState([]);
	const [fechaInicial, setFechaInicial] = useState('');
	const [fechaFinal, setFechaFinal] = useState('');
	const [searchFolio, setSearchFolio] = useState('');
	const [searchSucursal, setSearchSucursal] = useState('');
	const [searchEstatus, setSearchEstatus] = useState(''); // Filtro por estatus
	const [searchPedidoSAP, setSearchPedidoSAP] = useState(''); // Filtro por Pedido SAP
	const [filteredData, setFilteredData] = useState([]);
	const [totalesGenerales, setTotalesGenerales] = useState({
		ordenado: 0,
		surtido: 0,
		fillRatePromedio: 0,
		foliosUnicos: 0,
	});

	// Configurar las fechas por defecto
	useEffect(() => {
		const today = new Date();
		const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

		setFechaInicial(firstDayOfMonth.toISOString().split('T')[0]);
		setFechaFinal(today.toISOString().split('T')[0]);
	}, []);

	// Traer los datos filtrados por fechas
	const fetchSellInRivera = async () => {
		if (!fechaInicial || !fechaFinal) return;

		try {
			const response = await fetch(
				`http://localhost:5001/api/sell-in-rivera?fechaInicial=${fechaInicial}&fechaFinal=${fechaFinal}`,
			);
			const data = await response.json();

			// Agrupar datos por folio
			const groupedData = {};
			let totalOrdenado = 0;
			let totalSurtido = 0;
			const uniqueFolios = new Set();

			data.forEach((pedido) => {
				if (!groupedData[pedido.Folio]) {
					groupedData[pedido.Folio] = {
						Folio: pedido.Folio,
						Nombre: pedido.Nombre || 'Desconocido',
						CantOrd: 0,
						CantSurt: 0,
						PedidoSAP: pedido['Pedido SAP'] || 'N/A',
						Estatus: pedido.Estatus || 'Sin Estatus',
					};
				}
				groupedData[pedido.Folio].CantOrd += pedido['Cant. Ord.'] || 0;
				groupedData[pedido.Folio].CantSurt += pedido['Cant. Surt.'] || 0;

				// Sumar totales generales
				totalOrdenado += pedido['Cant. Ord.'] || 0;
				totalSurtido += pedido['Cant. Surt.'] || 0;

				// Agregar folio al set de únicos
				uniqueFolios.add(pedido.Folio);
			});

			// Calcular Fill Rate Promedio
			const fillRatePromedio =
				totalOrdenado > 0 ? (totalSurtido / totalOrdenado) * 100 : 0;

			setSellInRiveraData(Object.values(groupedData));
			setTotalesGenerales({
				ordenado: totalOrdenado,
				surtido: totalSurtido,
				fillRatePromedio,
				foliosUnicos: uniqueFolios.size,
			});
		} catch (error) {
			console.error('Error fetching sell_in_rivera data:', error);
		}
	};

	useEffect(() => {
		fetchSellInRivera();
	}, [fechaInicial, fechaFinal]);

	// Filtrar datos por folio, sucursal, estatus y pedido SAP
	useEffect(() => {
		let data = [...sellInRiveraData];

		if (searchFolio) {
			data = data.filter((item) =>
				item.Folio.toString().includes(searchFolio.toString()),
			);
		}

		if (searchSucursal) {
			data = data.filter((item) =>
				item.Nombre.toLowerCase().includes(searchSucursal.toLowerCase()),
			);
		}

		if (searchEstatus) {
			data = data.filter((item) =>
				item.Estatus.toLowerCase().includes(searchEstatus.toLowerCase()),
			);
		}

		if (searchPedidoSAP) {
			data = data.filter((item) =>
				item.PedidoSAP.toString().includes(searchPedidoSAP.toString()),
			);
		}

		setFilteredData(data);
	}, [
		sellInRiveraData,
		searchFolio,
		searchSucursal,
		searchEstatus,
		searchPedidoSAP,
	]);

	return (
		<>
			<Header />
			<div className={styles.container}>
				<h1 className={styles.title}>Órdenes de Compra</h1>

				{/* Filtro de fechas */}
				<div className={styles.filterContainer}>
					<label>
						Fecha Inicial:
						<input
							type="date"
							value={fechaInicial}
							onChange={(e) => setFechaInicial(e.target.value)}
						/>
					</label>
					<label>
						Fecha Final:
						<input
							type="date"
							value={fechaFinal}
							onChange={(e) => setFechaFinal(e.target.value)}
						/>
					</label>
				</div>

				{/* Filtros de búsqueda */}
				<div className={styles.searchContainer}>
					<div className={styles.searchInput}>
						<label>
							Folio:
							<input
								type="text"
								placeholder="Número de folio"
								value={searchFolio}
								onChange={(e) => setSearchFolio(e.target.value)}
							/>
						</label>
					</div>
					<div className={styles.searchInput}>
						<label>
							Sucursal:
							<input
								type="text"
								placeholder="Nombre de la sucursal"
								value={searchSucursal}
								onChange={(e) => setSearchSucursal(e.target.value)}
							/>
						</label>
					</div>
					<div className={styles.searchInput}>
						<label>
							Estatus:
							<input
								type="text"
								placeholder="Estatus"
								value={searchEstatus}
								onChange={(e) => setSearchEstatus(e.target.value)}
							/>
						</label>
					</div>
					<div className={styles.searchInput}>
						<label>
							Pedido SAP:
							<input
								type="text"
								placeholder="Pedido SAP"
								value={searchPedidoSAP}
								onChange={(e) => setSearchPedidoSAP(e.target.value)}
							/>
						</label>
					</div>
				</div>

				{/* Totales generales */}
				<div className={styles.totalesContainer}>
					<p>
						<strong>Cajas Ordenadas:</strong>{' '}
						{totalesGenerales.ordenado.toLocaleString('en-US')}
					</p>
					<p>
						<strong>Cajas Surtidas:</strong>{' '}
						{totalesGenerales.surtido.toLocaleString('en-US')}
					</p>
					<p>
						<strong>Fill Rate Promedio:</strong>{' '}
						<span
							style={{
								color:
									totalesGenerales.fillRatePromedio < 60
										? 'red'
										: totalesGenerales.fillRatePromedio < 80
										? 'orange'
										: 'green',
							}}
						>
							{totalesGenerales.fillRatePromedio.toFixed(2)}%
						</span>
					</p>
					<p>
						<strong>Total Folios:</strong> {totalesGenerales.foliosUnicos}
					</p>
				</div>

				{/* Tabla de resultados */}
				<table className={styles.table}>
					<thead>
						<tr>
							<th>Folio</th>
							<th>Sucursal</th>
							<th>Total Ordenado</th>
							<th>Total Surtido</th>
							<th>Fill Rate (%)</th>
							<th>Pedido SAP</th>
							<th>Estatus</th>
						</tr>
					</thead>
					<tbody>
						{filteredData.map((pedido) => {
							const fillRate =
								pedido.CantOrd > 0
									? (pedido.CantSurt / pedido.CantOrd) * 100
									: 0;

							return (
								<tr key={pedido.Folio}>
									<td>{pedido.Folio}</td>
									<td>{pedido.Nombre}</td>
									<td>{pedido.CantOrd.toLocaleString('en-US')}</td>
									<td>{pedido.CantSurt.toLocaleString('en-US')}</td>
									<td
										style={{
											color:
												fillRate < 60
													? 'red'
													: fillRate < 80
													? 'orange'
													: 'green',
										}}
									>
										{fillRate.toFixed(2)}
									</td>
									<td>{pedido.PedidoSAP}</td>
									<td>{pedido.Estatus}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default Orders;
