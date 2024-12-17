import React, { useEffect, useState } from 'react';
import styles from '../styles/CardSellInCash.module.css';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const CardSellInCash = () => {
    const currentDate = new Date();
    const [filters, setFilters] = useState({
        year: currentDate.getFullYear(),
        month: currentDate.toLocaleString('default', { month: 'long' }),
    });

    const [data, setData] = useState({
        ventaActual: 0, ventaAnterior: 0,
        compraMXNActual: 0, compraMXNAnterior: 0,
        compraCajaActual: 0, compraCajaAnterior: 0,
        ventaCajaActual: 0, ventaCajaAnterior: 0,
        compraPiezasActual: 0, compraPiezasAnterior: 0,
        ventaPiezasActual: 0, ventaPiezasAnterior: 0,
    });

    const months = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchDataForColumn = async (column) => {
                    const { year, month } = filters;

                    const response = await fetch(
                        `http://localhost:5001/api/sell-in-cash?year=${year}&month=${month}`
                    );
                    const dataActual = await response.json();

                    const responseAnterior = await fetch(
                        `http://localhost:5001/api/sell-in-cash?year=${year - 1}&month=${month}`
                    );
                    const dataAnterior = await responseAnterior.json();

                    const totalActual = dataActual.reduce((sum, item) => sum + item[column], 0);
                    const totalAnterior = dataAnterior.reduce((sum, item) => sum + item[column], 0);

                    return { totalActual, totalAnterior };
                };

                setData({
                    ventaActual: (await fetchDataForColumn('VentaMXN')).totalActual,
                    ventaAnterior: (await fetchDataForColumn('VentaMXN')).totalAnterior,
                    compraMXNActual: (await fetchDataForColumn('CompraMXN')).totalActual,
                    compraMXNAnterior: (await fetchDataForColumn('CompraMXN')).totalAnterior,
                    compraCajaActual: (await fetchDataForColumn('CompraCaja')).totalActual,
                    compraCajaAnterior: (await fetchDataForColumn('CompraCaja')).totalAnterior,
                    ventaCajaActual: (await fetchDataForColumn('VentaCaja')).totalActual,
                    ventaCajaAnterior: (await fetchDataForColumn('VentaCaja')).totalAnterior,
                    compraPiezasActual: (await fetchDataForColumn('CompraPiezas')).totalActual,
                    compraPiezasAnterior: (await fetchDataForColumn('CompraPiezas')).totalAnterior,
                    ventaPiezasActual: (await fetchDataForColumn('VentaPiezas')).totalActual,
                    ventaPiezasAnterior: (await fetchDataForColumn('VentaPiezas')).totalAnterior,
                });
            } catch (error) {
                console.error('Error fetching sell_in_cash data:', error);
            }
        };

        fetchData();
    }, [filters]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const renderCard = (title, actual, anterior, formatAsCurrency = true) => {
        const growth = anterior !== 0 ? ((actual - anterior) / anterior) * 100 : 0;

        return (
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <h3>{title}</h3>
                </div>
                <div className={styles.cardBody}>
                    <p><strong>Mes Actual:</strong> {formatAsCurrency ? `$${actual.toLocaleString('en-US')}` : actual.toLocaleString('en-US')}</p>
                    <p><strong>Mismo Mes AA:</strong> {formatAsCurrency ? `$${anterior.toLocaleString('en-US')}` : anterior.toLocaleString('en-US')}</p>
                    <p className={styles.resultText}>
                        <strong>Resultado:</strong>{' '}
                        <span className={growth >= 0 ? styles.green : styles.red}>
                            {growth.toFixed(2)}% {growth >= 0 ? <FaArrowUp /> : <FaArrowDown />}
                        </span>
                    </p>
                </div>
            </div>
        );
    };

    return (
        <div>
            {/* Filtros */}
            <div className={styles.filterContainer}>
                <select name="year" value={filters.year} onChange={handleFilterChange}>
                    {[2023, 2024, 2025].map((year) => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
                <select name="month" value={filters.month} onChange={handleFilterChange}>
                    {months.map((month) => (
                        <option key={month} value={month}>{month}</option>
                    ))}
                </select>
            </div>

            {/* Cards */}
            <div className={styles.cardContainer}>
                {renderCard('Venta MXN', data.ventaActual, data.ventaAnterior)}
                {renderCard('Compra MXN', data.compraMXNActual, data.compraMXNAnterior)}
                {renderCard('Compra Caja', data.compraCajaActual, data.compraCajaAnterior, false)}
                {renderCard('Venta Caja', data.ventaCajaActual, data.ventaCajaAnterior, false)}
                {renderCard('Compra Piezas', data.compraPiezasActual, data.compraPiezasAnterior, false)}
                {renderCard('Venta Piezas', data.ventaPiezasActual, data.ventaPiezasAnterior, false)}
            </div>
        </div>
    );
};

export default CardSellInCash;
