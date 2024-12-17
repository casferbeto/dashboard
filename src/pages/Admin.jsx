import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Admin.module.css';
import UpdateAvanceForm from '../components/UpdateAvanceForm'; // Ajusta la ruta según sea necesario
import Header from '../components/Header.jsx';
import UploadCSV from '../components/UploadCSV.jsx'; // Asegúrate de que esta ruta sea correcta
import UploadSellIn from '../components/UploadSellIn'; // Componente para cargar CSV de sell_in
import UploadSellInCash from '../components/UploadSellInCash';

const Admin = () => {
	const [isFormOpen, setIsFormOpen] = useState(false); // Estado para abrir/cerrar el formulario de Sell In
	const [isMetaFormOpen, setIsMetaFormOpen] = useState(false); // Estado para abrir/cerrar el formulario de Meta
	const [isAvanceFormOpen, setIsAvanceFormOpen] = useState(false); // Estado para abrir/cerrar el formulario de avance mensual
	const [year, setYear] = useState(''); // Estado para el año
	const [month, setMonth] = useState(''); // Estado para el mes
	const [value, setValue] = useState(''); // Estado para el valor
	const [metaValue, setMetaValue] = useState(''); // Estado para el valor meta
	const [message, setMessage] = useState(''); // Mensaje de éxito o error
	const navigate = useNavigate();

	// Función para manejar el envío del formulario de Sell In
	const handleSellInSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch('http://localhost:5001/api/sell-in', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					year: parseInt(year),
					month: parseInt(month),
					value: parseInt(value),
				}),
			});

			if (response.ok) {
				setMessage('¡Datos de Sell In actualizados correctamente!');
			} else {
				const errorData = await response.json();
				setMessage(`Error al actualizar Sell In: ${errorData.error}`);
			}
		} catch (error) {
			console.error('Error al conectar con el servidor:', error);
			setMessage('Error al conectar con el servidor.');
		}
	};

	// Función para manejar el envío del formulario de Meta
	const handleMetaSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch('http://localhost:5001/api/sell-in', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					year: parseInt(year),
					month: parseInt(month),
					meta: parseInt(metaValue),
				}),
			});

			if (response.ok) {
				setMessage('¡Meta actualizada correctamente!');
			} else {
				const errorData = await response.json();
				setMessage(`Error al actualizar Meta: ${errorData.error}`);
			}
		} catch (error) {
			console.error('Error al conectar con el servidor:', error);
			setMessage('Error al conectar con el servidor.');
		}
	};

	return (
		<div className={styles.container}>
			<Header />

			<div className={styles.buttonRow}>
				{/* Botón para abrir/cerrar el formulario de Sell In */}
				<button
					className={styles.toggleFormButton}
					onClick={() => setIsFormOpen(!isFormOpen)}
				>
					{isFormOpen ? 'Cerrar Formulario Sell In' : 'Actualizar Sell In Data'}
				</button>

				{/* Botón para abrir/cerrar el formulario de Meta */}
				<button
					className={styles.toggleFormButton}
					onClick={() => setIsMetaFormOpen(!isMetaFormOpen)}
				>
					{isMetaFormOpen ? 'Cerrar Formulario Meta' : 'Actualizar Meta'}
				</button>

				{/* Botón para abrir/cerrar el formulario de Avance Mensual */}
				<button
					className={styles.toggleFormButton}
					onClick={() => setIsAvanceFormOpen(!isAvanceFormOpen)}
				>
					{isAvanceFormOpen
						? 'Cerrar Avance Mensual'
						: 'Actualizar Avance Mensual'}
				</button>
			</div>

			{/* Formulario de Sell In */}
			{isFormOpen && (
				<form onSubmit={handleSellInSubmit} className={styles.form}>
					<div className={styles.formGroup}>
						<label htmlFor="year">Año:</label>
						<select
							id="year"
							value={year}
							onChange={(e) => setYear(e.target.value)}
							required
						>
							<option value="">Selecciona un año</option>
							<option value="2023">2023</option>
							<option value="2024">2024</option>
							<option value="2025">2025</option>
						</select>
					</div>

					<div className={styles.formGroup}>
						<label htmlFor="month">Mes:</label>
						<select
							id="month"
							value={month}
							onChange={(e) => setMonth(e.target.value)}
							required
						>
							<option value="">Selecciona un mes</option>
							<option value="1">Enero</option>
							<option value="2">Febrero</option>
							<option value="3">Marzo</option>
							<option value="4">Abril</option>
							<option value="5">Mayo</option>
							<option value="6">Junio</option>
							<option value="7">Julio</option>
							<option value="8">Agosto</option>
							<option value="9">Septiembre</option>
							<option value="10">Octubre</option>
							<option value="11">Noviembre</option>
							<option value="12">Diciembre</option>
						</select>
					</div>

					<div className={styles.formGroup}>
						<label htmlFor="value">Valor:</label>
						<input
							type="number"
							id="value"
							value={value}
							onChange={(e) => setValue(e.target.value)}
							placeholder="Ingrese el valor"
						/>
					</div>

					<button type="submit" className={styles.submitButton}>
						Enviar
					</button>
				</form>
			)}

			{/* Formulario de Meta */}
			{isMetaFormOpen && (
				<form onSubmit={handleMetaSubmit} className={styles.form}>
					<div className={styles.formGroup}>
						<label htmlFor="year">Año:</label>
						<select
							id="year"
							value={year}
							onChange={(e) => setYear(e.target.value)}
							required
						>
							<option value="">Selecciona un año</option>
							<option value="2023">2023</option>
							<option value="2024">2024</option>
							<option value="2025">2025</option>
						</select>
					</div>

					<div className={styles.formGroup}>
						<label htmlFor="month">Mes:</label>
						<select
							id="month"
							value={month}
							onChange={(e) => setMonth(e.target.value)}
							required
						>
							<option value="">Selecciona un mes</option>
							<option value="1">Enero</option>
							<option value="2">Febrero</option>
							<option value="3">Marzo</option>
							<option value="4">Abril</option>
							<option value="5">Mayo</option>
							<option value="6">Junio</option>
							<option value="7">Julio</option>
							<option value="8">Agosto</option>
							<option value="9">Septiembre</option>
							<option value="10">Octubre</option>
							<option value="11">Noviembre</option>
							<option value="12">Diciembre</option>
						</select>
					</div>

					<div className={styles.formGroup}>
						<label htmlFor="metaValue">Valor Meta:</label>
						<input
							type="number"
							id="metaValue"
							value={metaValue}
							onChange={(e) => setMetaValue(e.target.value)}
							placeholder="Ingrese el valor meta"
							required
						/>
					</div>

					<button type="submit" className={styles.submitButton}>
						Enviar
					</button>
				</form>
			)}
			{/* Nuevo Formulario de Avance Mensual */}
			{isAvanceFormOpen && <UpdateAvanceForm />}

			{/* Fila para los componentes de carga */}
			<div className={styles.uploadRow}>
				<div className={styles.uploadCard}>
					<UploadCSV />
				</div>
				<div className={styles.uploadCard}>
					<UploadSellIn />
				</div>
				<div className={styles.uploadCard}>
					<UploadSellInCash />
				</div>
			</div>
		</div>
	);
};

export default Admin;
