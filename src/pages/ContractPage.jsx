import React, { useState, useEffect } from 'react';
import ContractDetails from './ContractDetail/ContractDetailPage';
import Table from '../components/table/Table';
import CustomButton from '../components/CustomButton/CustomButton';
import './ContractPage.css';

const Contracts = () => {
    const [contracts, setContracts] = useState([]);
    const [selectedContract, setSelectedContract] = useState(null);
    const [maxDebtHistory, setMaxDebtHistory] = useState(null);

    useEffect(() => {
        fetchContracts();
    }, []);

    const fetchContracts = async () => {
        try {
        const response = await fetch('http://192.168.3.51:3000/contract');
            if (!response.ok) {
                throw new Error('Falha ao buscar contratos');
            }
        
            const data = await response.json();
            console.log('Contratos recebidos:', data.contracts);
            setContracts(data.contracts);
        } catch (error) {
            console.error('Erro ao buscar contratos:', error);
        }
    };

    const fetchMaxDebtHistory = async () => {
        try {
            const response = await fetch('http://192.168.3.51:3000/contract/max-debt-history');
            if (!response.ok) {
                throw new Error('Falha ao buscar histórico de dívida máxima');
            }
        
            const data = await response.json();
            console.log('Histórico de dívida máxima:', data);
            setMaxDebtHistory(data);
        } catch (error) {
            console.error('Erro ao buscar histórico de dívida máxima:', error);
        }
    };

    const handleContractClick = contract => {
        console.log("ASDKJHASKJDAKSLJD")
        setSelectedContract(contract);
    };

    const handleBackToList = () => {
        setSelectedContract(null);
    };

    const columns = [
        { header: 'Ações', field: 'actions', onClick: handleContractClick }, // Coluna de ações com o ícone faEye
        { header: 'Número do Documento', field: 'document_number' },
        { header: 'Data', field: 'date', render: (date) => new Date(date).toLocaleDateString('pt-BR')},
        { header: 'Valor Total', field: 'total_value' },
        { header: 'Entrada', field: 'down_payment' },
        { header: 'Valor Financiado', field: 'financed_amount' },
    ];

    // Função para lidar com a seleção de contratos
    const handleRowSelect = (selectedIds) => {
        // Aqui você pode fazer algo com os IDs selecionados, como calcular a dívida
        console.log('IDs dos contratos selecionados:', selectedIds);
    };

    return (
        <div className="contracts-container">
            <h2>Contratos</h2>
            {!selectedContract ? (
                <>
                    <Table modelName="contracts" columns={columns} data={contracts} onRowSelect={handleRowSelect} />
                    <CustomButton onClick={() => fetchMaxDebtHistory()}>
                        Calcular Endividamento
                    </CustomButton>
                    <div className="dashboard-info">
                <div className="dashboard-item">
                    <div className="dashboard-title">{maxDebtHistory ? `Mês de maior dívida: ${maxDebtHistory.mesAno}` : ""}</div>
                    <div className="dashboard-value">Valor máximo da dívida: R$ {maxDebtHistory ? maxDebtHistory.valorMaximo.toFixed(2) : 0.00}</div>
                </div>
            </div>
                </>
            ) : (
                <div>
                    <button onClick={handleBackToList}>Voltar para a lista de contratos</button>
                    {selectedContract && <ContractDetails contract={selectedContract} />}
                </div>
            )}
             
        </div>
    );    
};

export default Contracts;
