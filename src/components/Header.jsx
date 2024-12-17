import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from '../styles/Header.module.css';

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const navigate = useNavigate();

	const handleLogout = () => {
		console.log('Cerrando sesión y redirigiendo al login...');
		localStorage.removeItem('authToken');
		navigate('/login'); // Redirige a /login
	};

	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<div className={styles.logoLeft}>
					<img
						src="/logoelectrolit.svg"
						alt="Logo Electrolit"
						className={styles.logo}
					/>
				</div>
				<nav className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : ''}`}>
					<ul>
						<li>
							<NavLink to="/dashboard">Dashboard</NavLink>
						</li>
						<li>
							<NavLink to="/dashboard/sell-in">Sell In</NavLink>
						</li>
						<li>
							<NavLink to="/dashboard/sell-out">Sell Out</NavLink>
						</li>
						<li>
							<NavLink to="/dashboard/orders">Órdenes de Compra</NavLink>
						</li>
						<li>
							<NavLink to="/dashboard/admin">Admin</NavLink>
						</li>
						<li>
							<NavLink to="/">Salir</NavLink>
						</li>
					</ul>
				</nav>
				<div className={styles.logoRight}>
					<img src="/gbLogo.png" alt="Logo Cliente" className={styles.logo} />
				</div>
			</div>
		</header>
	);
};

export default Header;
