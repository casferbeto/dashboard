import React from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useLocation,
} from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import SellIn from './pages/SellIn';
import Orders from './pages/Orders';
import AdminLogin from './pages/AdminLogin';
import Admin from './pages/Admin';
import Login from './pages/Login';

const AppContent = () => {
	const location = useLocation();

	return (
		<>
			{/* Renderiza el Header excepto en la página de login */}
			{location.pathname !== '/login' && <Header />}
			<Routes>
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/dashboard/sell-in" element={<SellIn />} />
				<Route path="/dashboard/orders" element={<Orders />} />
				<Route path="/dashboard/admin-login" element={<AdminLogin />} />
				<Route path="/dashboard/admin" element={<Admin />} />
				<Route path="/login" element={<Login />} />
				<Route path="*" element={<h1>Página no encontrada</h1>} />
			</Routes>
		</>
	);
};

const App = () => {
	return (
		<Router>
			<AppContent />
		</Router>
	);
};

export default App;
