import React, { useState } from 'react';
import styles from '../styles/UploadSellIn.module.css';

const UploadSellIn = () => {
	const [file, setFile] = useState(null);
	const [message, setMessage] = useState('');

	// Manejar la selección de archivo
	const handleFileChange = (e) => {
		setFile(e.target.files[0]);
	};

	// Enviar archivo al servidor
	const handleUpload = async (e) => {
		e.preventDefault();

		if (!file) {
			setMessage('Por favor selecciona un archivo CSV.');
			return;
		}

		const formData = new FormData();
		formData.append('file', file);

		try {
			const response = await fetch('http://localhost:5001/api/upload-sell-in', {
				method: 'POST',
				body: formData,
			});

			if (response.ok) {
				setMessage('Archivo cargado y datos actualizados correctamente.');
			} else {
				const errorData = await response.json();
				setMessage(`Error al cargar el archivo: ${errorData.message}`);
			}
		} catch (error) {
			console.error('Error al cargar el archivo:', error);
			setMessage('Error al cargar el archivo. Inténtalo de nuevo más tarde.');
		}
	};

	return (
		<div className={styles.container}>
			<h3 className={styles.title}>Subir archivo CSV (Sell In)</h3>
			<form onSubmit={handleUpload} className={styles.form}>
				<input
					type="file"
					accept=".csv"
					onChange={handleFileChange}
					className={styles.fileInput}
				/>
				<button type="submit" className={styles.submitButton}>
					Cargar Archivo
				</button>
			</form>
			{message && <p className={styles.message}>{message}</p>}
		</div>
	);
};

export default UploadSellIn;
