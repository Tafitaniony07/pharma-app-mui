import React, { createContext, useState } from "react";

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
    const [transactions, setTransactions] = useState([]);
    const updateTransaction = (index, updatedTransaction) => {
        const newTransactions = [...transactions];
        newTransactions[index] = updatedTransaction;
        setTransactions(newTransactions);
    };

    const deleteTransaction = (index) => {
        const newTransactions = transactions.filter((_, i) => i !== index);
        setTransactions(newTransactions);
    };

    return (
        <TransactionContext.Provider value={{ transactions, setTransactions, updateTransaction, deleteTransaction }}>
        {children}
    </TransactionContext.Provider>
    );
};
