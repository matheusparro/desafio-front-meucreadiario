import React, { useState, useEffect } from 'react';
import './Table.css'; // Importe o CSS da tabela aqui
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const Table = ({ columns, data }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10); // Número de contratos por página
    const [isMobileView, setIsMobileView] = useState(true);

    // Efeito para determinar se está em modo móvel
    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth < 768); // Defina o limite de largura conforme necessário
        };

        // Executar uma vez para determinar o estado inicial
        handleResize();

        // Adicionar event listener para ajustar o estado em redimensionamentos
        window.addEventListener('resize', handleResize);

        // Limpeza do event listener no desmontamento do componente
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Total de páginas
    const totalPages = Math.ceil(data.length / pageSize);

    // Função para obter os contratos da página atual
    const getCurrentContracts = () => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return data.slice(startIndex, endIndex);
    };

    // Função para mudar de página
    const onPageChange = newPage => {
        setCurrentPage(newPage);
    };

    // Função para mudar o tamanho da página
    const handlePageSizeChange = event => {
        setPageSize(Number(event.target.value));
        setCurrentPage(1); // Resetar para a primeira página ao mudar o tamanho da página
    };

    // Função para lidar com a visualização detalhada de um contrato
    const handleViewDetails = contract => {
        // Lógica para visualizar detalhes do contrato
        console.log(`Visualizando detalhes do contrato ${contract.id}`);
    };

    return (
        <div className={`table-container ${isMobileView ? 'mobile-view' : ''}`}>
            {/* Controles de paginação */}
            <div className="pagination-controls">
                <label>
                    Itens por página:
                    <select value={pageSize} onChange={handlePageSizeChange}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                    </select>
                </label>
            </div>

            {/* Tabela para desktop */}
            <table className={`table ${isMobileView ? 'hidden' : ''}`}>
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index}>{column.header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {getCurrentContracts().map((contract, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((column, colIndex) => (
                                <td key={colIndex}>
                                    {typeof column.render === 'function' ? (
                                        column.render(contract[column.field], contract)
                                    ) : (
                                        column.field === 'actions' ? (
                                            <FontAwesomeIcon icon={faEye} className="icon" onClick={() => column.onClick(contract)} />
                                        ) : (
                                            contract[column.field]
                                        )
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className={`mobile-list ${isMobileView ? '' : 'hidden'}`}>
                {getCurrentContracts().map((contract, index) => (
                    <div key={index} className={`mobile-list-item card ${columns.length === 1 ? 'single-column' : ''}`}>
                        <div className="mobile-list-item-header">
                            Contrato {contract.id}
                        </div>
                        <div className="mobile-list-item-content">
                            {columns.map((column, colIndex) => (
                                <div key={colIndex} className="mobile-list-item-field">
                                    <span className="mobile-list-item-label">{column.header}:</span>
                                    {column.field === 'actions' ? (
                                        <FontAwesomeIcon icon={faEye} className="icon" onClick={() => column.onClick(contract)} />
                                    ) : (
                                        <span className="mobile-list-item-value">{contract[column.field]}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            {/* Renderiza a paginação abaixo da tabela ou lista */}
            <div className="pagination-controls">
                <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                    Anterior
                </button>
                <span>
                    Página {currentPage} de {totalPages}
                </span>
                <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    Próxima
                </button>
            </div>
        </div>
    );
};

export default Table;
