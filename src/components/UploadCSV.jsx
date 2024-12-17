import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/UploadCSV.module.css';

const UploadCSV = () => {
	const [file, setFile] = useState(null);
	const [message, setMessage] = useState('');

	const handleFileChange = (e) => {
		setFile(e.target.files[0]);
	};

	const handleUpload = async (e) => {
		e.preventDefault();

		if (!file) {
			setMessage('Por favor selecciona un archivo.');
			return;
		}

		const formData = new FormData();
		formData.append('file', file);

		try {
			const response = await axios.post(
				'http://localhost:5001/api/upload-sell-in-rivera',
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				},
			);

			setMessage(response.data.message);
			setFile(null); // Resetea el archivo después de subirlo
		} catch (error) {
			console.error('Error al subir el archivo:', error);
			setMessage('Error al subir el archivo. Por favor intenta de nuevo.');
		}
	};

	return (
		<div className={styles.uploadContainer}>
			<h3>Subir archivo CSV (sell_in_rivera)</h3>
			<form onSubmit={handleUpload}>
				<input type="file" accept=".csv" onChange={handleFileChange} />
				<button type="submit">Cargar Archivo</button>
			</form>
			{message && <p>{message}</p>}
		</div>
	);
};

export default UploadCSV;
