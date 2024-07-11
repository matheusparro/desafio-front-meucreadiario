// Table.js
import React from 'react';
import './Table.css'; // Importe o CSS da tabela aqui
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const Table = ({ columns, data }) => {
    return (
        <div className="table-container">
            <table className="table">
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index}>{column.header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((column, colIndex) => (
                                <td key={colIndex}>
                                    {typeof column.render === 'function' ? (
                                        column.render(row[column.field], row) // Chama a função de renderização com o dado e a linha completa
                                    ) : (
                                        column.field === 'actions' ? (
                                            <FontAwesomeIcon icon={faEye} className="icon" onClick={() => column.onClick(row)} />
                                        ) : (
                                            row[column.field]
                                        )
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
