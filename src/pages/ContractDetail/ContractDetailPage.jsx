import React, { useState, useEffect } from 'react';
import './ContractDetails.css'; // Estilos CSS personalizados
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const ContractDetails = ({ contract }) => {
    const [payments, setPayments] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContractDetails = async () => {
            try {
                const response = await fetch(`http://192.168.3.51:3000/contract/${contract.id}/payments`);
                if (!response.ok) {
                    throw new Error('Falha ao buscar detalhes do contrato');
                }
                const data = await response.json();
                setPayments(data);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao buscar detalhes do contrato:', error);
                setLoading(false);
            }
        };

        fetchContractDetails();
    }, [contract]);

    // Função para formatar a data no formato DD/MM/YYYY
    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('pt-BR', options);
    };

    if (loading) {
        return <div>Carregando detalhes do contrato...</div>;
    }

    if (!payments || payments.length === 0) {
        return <div>Não há pagamentos registrados para este contrato.</div>;
    }

    return (
        <div className="contract-details">
            <div className="contract-header">
                <h3>Detalhes do Contrato</h3>
                <ul>
                    <li><strong>Número do Documento:</strong> {contract.document_number}</li>
                    <li><strong>Data:</strong> {formatDate(contract.date)}</li>
                    <li><strong>Valor Total:</strong> R${contract.total_value.toFixed(2)}</li>
                </ul>
            </div>
            <div className="payments-list">
                <h4>Detalhes dos Pagamentos</h4>
                <ul>
                    {payments.map(payment => (
                        <li key={payment.id}>
                            {payment.total_paid === payment.due_amount ? (
                                <FontAwesomeIcon icon={faCheck} className="paid-icon" />
                            ) : (
                                <FontAwesomeIcon icon={faExclamationTriangle} className="unpaid-icon" />
                            )}
                            <strong>Valor devido:</strong> R${payment.due_amount.toFixed(2)},{' '}
                            <strong>Data de vencimento:</strong> {formatDate(payment.due_date)},{' '}
                            {payment.last_payment_date && (
                                <span>
                                    <strong>Data do último pagamento:</strong> {formatDate(payment.last_payment_date)},{' '}
                                </span>
                            )}
                            <strong>Total pago:</strong> R${payment.total_paid.toFixed(2)},{' '}
                            <strong>Principal em aberto:</strong> R${payment.outstanding_principal.toFixed(2)}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ContractDetails;
