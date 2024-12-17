import React, { createContext, useContext, useState, useEffect } from 'react';

// Crear el contexto
const GlobalContext = createContext();

// Hook para usar el contexto global
export const useGlobalContext = () => useContext(GlobalContext);

// Proveedor de contexto
export const GlobalProvider = ({ children }) => {
	const [sellInData, setSellInData] = useState({
		unidades2023: [],
		unidades2024: [],
		unidades2025: [],
		metas2024: [],
		metas2025: [],
	});

	const [pedidosData, setPedidosData] = useState([]); // Nuevo estado para datos de pedidos

	// Función para cargar los datos desde el backend
	const fetchSellInData = async () => {
		try {
			const response = await fetch('http://localhost:5001/api/sell-in');
			const data = await response.json();

			const formattedData = {
				unidades2023: data
					.filter((item) => item.year === 2023)
					.map((item) => item.value),
				unidades2024: data
					.filter((item) => item.year === 2024)
					.map((item) => item.value),
				unidades2025: data
					.filter((item) => item.year === 2025)
					.map((item) => item.value),
				metas2024: data
					.filter((item) => item.year === 2024)
					.map((item) => item.meta || 0),
				metas2025: data
					.filter((item) => item.year === 2025)
					.map((item) => item.meta || 0),
			};

			setSellInData(formattedData);
		} catch (error) {
			console.error('Error fetching sell_in data:', error);
		}
	};

	// Nueva función para cargar datos de pedidos
	const fetchPedidosData = async () => {
		try {
			const response = await fetch('http://localhost:5001/api/pedidos');
			const data = await response.json();
			setPedidosData(data);
		} catch (error) {
			console.error('Error fetching pedidos data:', error);
		}
	};

	// Cargar datos cuando el componente se monte
	useEffect(() => {
		fetchSellInData();
		fetchPedidosData();
	}, []);

	return (
		<GlobalContext.Provider
			value={{ sellInData, pedidosData, fetchSellInData, fetchPedidosData }}
		>
			{children}
		</GlobalContext.Provider>
	);
};
