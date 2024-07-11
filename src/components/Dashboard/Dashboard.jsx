// Dashboard.js

import React from 'react';
import './Dashboard.css'; // Importe o CSS do grid aqui

const Dashboard = ({ monthYear, value }) => {
    return (
        <div className="dashboard">
            <div className="dashboard-item">
                <div className="dashboard-title">Mês/Ano</div>
                <div className="dashboard-value">{monthYear}</div>
            </div>
            <div className="dashboard-item">
                <div className="dashboard-title">Valor Total (R$)</div>
                <div className="dashboard-value">{value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
            </div>
        </div>
    );
};

export default Dashboard;
