/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

// Création du contexte pour gérer les transactions
export const TransactionContext = createContext();

// Composant Provider qui va englober l'application pour fournir le contexte
export const TransactionProvider = ({ children }) => {
	// État pour stocker la liste des transactions
	const [transactions, setTransactions] = useState([]);

	// Fonction pour mettre à jour une transaction spécifique
	// @param {number} index - L'index de la transaction à mettre à jour
	// @param {object} updatedTransaction - Les nouvelles données de la transaction
	const updateTransaction = (index, updatedTransaction) => {
		const newTransactions = [...transactions];
		newTransactions[index] = updatedTransaction;
		setTransactions(newTransactions);
	};

	// Fonction pour supprimer une transaction
	// @param {number} index - L'index de la transaction à supprimer
	const deleteTransaction = (index) => {
		const newTransactions = transactions.filter((_, i) => i !== index);
		setTransactions(newTransactions);
	};

	// Fournit le contexte avec les valeurs et fonctions nécessaires
	return (
		<TransactionContext.Provider value={{ transactions, setTransactions, updateTransaction, deleteTransaction }}>
			{children}
		</TransactionContext.Provider>
	);
};
