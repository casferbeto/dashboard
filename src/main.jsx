import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalContext'; // Importa el GlobalProvider
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminLogin from './pages/AdminLogin';
import SellIn from './pages/SellIn'; // Asegúrate de que este componente exista
import SellOut from './pages/SellOut'; // Asegúrate de que este componente exista
import Orders from './pages/Orders'; // Asegúrate de que este componente exista
import Admin from './pages/Admin'; // Asegúrate de que este componente exista
import './index.css'; // Importa tus estilos globales o CSS Modules aquí

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<GlobalProvider>
			<Router>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/dashboard/sell-in" element={<SellIn />} />
					<Route path="/dashboard/sell-out" element={<SellOut />} />
					<Route path="/dashboard/orders" element={<Orders />} />
					<Route path="/dashboard/admin" element={<Admin />} />
					<Route path="/dashboard/admin-login" element={<AdminLogin />} />
				</Routes>
			</Router>
		</GlobalProvider>
	</React.StrictMode>,
);
