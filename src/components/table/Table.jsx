import React, { useState, useEffect } from 'react';
import './Table.css'; // Importe o CSS da tabela aqui
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const Table = ({ columns, data }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10); // Número de contratos por página

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

    return (
        <div className="table-container">
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
            <table className="table">
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
                                        column.render(contract[column.field], contract) // Chama a função de renderização com o dado e o contrato completo
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

            {/* Renderiza a paginação abaixo da tabela */}
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
