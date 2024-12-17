import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './../styles/Login.css';

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch('http://localhost:5001/api/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ username, password }),
			});

			if (response.ok) {
				const data = await response.json();
				if (data.message === 'Inicio de sesión exitoso.') {
					alert('¡Inicio de sesión exitoso!');
					// Redirige al dashboard
					navigate('/dashboard');
				} else {
					alert(data.error || 'Usuario o contraseña incorrectos.');
				}
			} else {
				alert('Error en el servidor. Intenta nuevamente.');
			}
		} catch (error) {
			console.error('Error al conectar con el servidor:', error);
			alert('No se pudo conectar con el servidor.');
		}
	};

	return (
		<div>
			{/* Video de fondo */}
			<video
				className="videoBackground"
				src="/videos/Hidratación total.mp4"
				autoPlay
				loop
				muted
			/>
			<div className="login-container">
				<h1>Iniciar Sesión</h1>
				<form onSubmit={handleLogin}>
					<input
						type="text"
						placeholder="Usuario"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<input
						type="password"
						placeholder="Contraseña"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button type="submit">Ingresar</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
