import React, { useState } from 'react';

const UpdateAvanceForm = () => {
	const [formData, setFormData] = useState({
		year: '',
		month: '',
		facturado: '',
		pendiente_cita: '',
		pendiente_sin_cita: '',
	});

	// Manejador de cambios en los campos del formulario
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	// Manejador de envío del formulario
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch('http://localhost:5001/api/pedidos', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				alert('Datos actualizados correctamente');
				setFormData({
					year: '',
					month: '',
					facturado: '',
					pendiente_cita: '',
					pendiente_sin_cita: '',
				});
			} else {
				alert('Error al actualizar los datos');
			}
		} catch (error) {
			console.error('Error:', error);
			alert('Error al conectar con el servidor');
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<h2>Actualizar Avance Mensual</h2>
			<label>
				Año:
				<select
					name="year"
					value={formData.year}
					onChange={handleChange}
					required
				>
					<option value="">Selecciona el año</option>
					<option value="2023">2023</option>
					<option value="2024">2024</option>
					<option value="2025">2025</option>
				</select>
			</label>
			<label>
				Mes:
				<select
					name="month"
					value={formData.month}
					onChange={handleChange}
					required
				>
					<option value="">Selecciona el mes</option>
					{[
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
					].map((mes, index) => (
						<option value={index + 1} key={index}>
							{mes}
						</option>
					))}
				</select>
			</label>
			<label>
				Facturado:
				<input
					type="number"
					step="0.01"
					name="facturado"
					value={formData.facturado}
					onChange={handleChange}
				/>
			</label>
			<label>
				Pendiente con cita:
				<input
					type="number"
					step="0.01"
					name="pendiente_cita"
					value={formData.pendiente_cita}
					onChange={handleChange}
				/>
			</label>
			<label>
				Pendiente sin cita:
				<input
					type="number"
					step="0.01"
					name="pendiente_sin_cita"
					value={formData.pendiente_sin_cita}
					onChange={handleChange}
				/>
			</label>
			<button type="submit">Actualizar</button>
		</form>
	);
};

export default UpdateAvanceForm;
