import React, { useState } from 'react';
import styles from '../styles/UploadSellInCash.module.css'; // Archivo CSS independiente

const UploadSellInCash = () => {
	const [file, setFile] = useState(null); // Estado para almacenar el archivo
	const [message, setMessage] = useState(''); // Estado para el mensaje de resultado
	const [loading, setLoading] = useState(false); // Estado de carga

	// Manejar la selección del archivo
	const handleFileChange = (e) => {
		setFile(e.target.files[0]);
		setMessage('');
	};

	// Enviar el archivo al backend
	const handleUpload = async (e) => {
		e.preventDefault();
		if (!file) {
			setMessage('Por favor selecciona un archivo CSV.');
			return;
		}

		const formData = new FormData();
		formData.append('file', file);

		try {
			setLoading(true);
			setMessage('');
			const response = await fetch(
				'http://localhost:5001/api/upload-sell-in-cash',
				{
					method: 'POST',
					body: formData,
				},
			);

			const result = await response.json();

			if (response.ok) {
				setMessage('¡El archivo se ha subido y procesado correctamente!');
			} else {
				setMessage(`Error: ${result.message}`);
			}
		} catch (error) {
			console.error('Error al subir el archivo:', error);
			setMessage('Error al subir el archivo.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className={styles.container}>
			<h2>Cargar Archivo CSV - Sell In Cash</h2>
			<form onSubmit={handleUpload} className={styles.form}>
				<input
					type="file"
					accept=".csv"
					onChange={handleFileChange}
					className={styles.fileInput}
				/>
				<button type="submit" disabled={loading} className={styles.button}>
					{loading ? 'Subiendo...' : 'Subir Archivo'}
				</button>
			</form>
			{message && <p className={styles.message}>{message}</p>}
		</div>
	);
};

export default UploadSellInCash;
