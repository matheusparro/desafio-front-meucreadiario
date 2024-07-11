import React, { useState, useEffect } from 'react';
import ContractDetails from './ContractDetail/ContractDetailPage';
import Table from '../components/table/Table';
import Card from '../components/Card/Card';
import './Grid.css';
import { render } from 'react-dom';

const Contracts = () => {
    const [contracts, setContracts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedContract, setSelectedContract] = useState(null);

    useEffect(() => {
        fetchContracts();
    }, [currentPage, pageSize]);

    const fetchContracts = async () => {
        try {
            const response = await fetch(`http://localhost:3000/contract?page=${currentPage}&size=${pageSize}`);
            if (!response.ok) {
                throw new Error('Falha ao buscar contratos');
            }
        
            const data = await response.json();
            console.log('Contratos recebidos:', data.contracts);
            setContracts(data.contracts);
            setTotalPages(data.totalPage);
        } catch (error) {
            console.error('Erro ao buscar contratos:', error);
        }
    };

    const handlePageChange = newPage => {
        setCurrentPage(newPage);
    };

    const handlePageSizeChange = event => {
        setPageSize(Number(event.target.value));
        setCurrentPage(1); // Resetar para a primeira página ao mudar o tamanho da página
    };

    const handleContractClick = contract => {
        console.log('Contrato selecionado:', contract);
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
    if(selectedContract && selectedContract.id) console.log('selectedContract atual:', selectedContract.id); // Adicione este console log para debug
   

    return (
        <div className="contracts-container">
            <h2>Contratos</h2>

            {!selectedContract ? (
                <div>
                    <div className="pagination-controls">
                        <label>
                            Tamanho da página:
                            <select value={pageSize} onChange={handlePageSizeChange}>
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                            </select>
                        </label>
                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                            Anterior
                        </button>
                        <span>
                            Página {currentPage} de {totalPages}
                        </span>
                        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                            Próxima
                        </button>
                    </div>
                    <div className="desktop-only">
                        <Table columns={columns} data={contracts} />
                    </div>
                    <div className="mobile-only">
                        {contracts.map((contract, index) => (
                            <Card key={index} data={contract} onClick={() => handleContractClick(contract)} />
                        ))}
                    </div>
                </div>
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
