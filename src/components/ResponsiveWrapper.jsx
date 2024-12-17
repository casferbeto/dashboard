import React, { useState, useEffect } from 'react';
import styles from './ResponsiveWrapper.module.css';

const ResponsiveWrapper = ({ children }) => {
	const [isScreenSmall, setIsScreenSmall] = useState(false);

	// Detectar el tamaño de la pantalla
	useEffect(() => {
		const handleResize = () => {
			setIsScreenSmall(window.innerWidth < 1024); // Menos de 1024px
		};

		// Configurar el evento
		handleResize(); // Ejecutarlo al cargar
		window.addEventListener('resize', handleResize);

		// Limpiar el evento al desmontar
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	// Mostrar mensaje si la pantalla es muy pequeña
	if (isScreenSmall) {
		return (
			<div className={styles.messageContainer}>
				<h1 className={styles.messageText}>
					Por favor, haz más grande la pantalla para visualizar el dashboard.
				</h1>
			</div>
		);
	}

	// Mostrar el contenido si la pantalla es lo suficientemente grande
	return <>{children}</>;
};

export default ResponsiveWrapper;
