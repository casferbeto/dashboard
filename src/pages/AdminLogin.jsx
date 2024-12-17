import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/AdminLogin.module.css';

const AdminLogin = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();

		console.log('Iniciando sesión con:', username, password); // Log para verificar credenciales

		try {
			const response = await fetch('http://localhost:5001/api/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, password }),
			});

			console.log('Respuesta del servidor:', response); // Log para verificar respuesta del servidor

			const data = await response.json();
			console.log('Datos recibidos:', data); // Log para verificar datos recibidos

			if (response.ok) {
				if (data.role === 'admin') {
					console.log('Redirigiendo a Admin Dashboard');
					navigate('/dashboard/admin');
				} else if (data.role === 'user') {
					console.log('Redirigiendo a User Dashboard');
					navigate('/dashboard');
				}
			} else {
				setError(data.error || 'Error al iniciar sesión');
				console.error('Error en login:', data.error);
			}
		} catch (error) {
			console.error('Error al conectar con el servidor:', error);
			setError('Error al conectar con el servidor.');
		}
	};

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Acceso Admin</h1>
			<form onSubmit={handleLogin} className={styles.form}>
				<div className={styles.formGroup}>
					<label htmlFor="username">Usuario:</label>
					<input
						type="text"
						id="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</div>
				<div className={styles.formGroup}>
					<label htmlFor="password">Contraseña:</label>
					<input
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				{error && <p className={styles.error}>{error}</p>}
				<button type="submit" className={styles.button}>
					Iniciar Sesión
				</button>
			</form>
		</div>
	);
};

export default AdminLogin;
