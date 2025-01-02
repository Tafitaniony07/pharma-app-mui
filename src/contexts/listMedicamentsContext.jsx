/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { stock } from "../api/product";

export const ListMedicamentsContext = createContext();

export const MedicamentsProvider = ({ children }) => {
	const [medicaments, setMedicaments] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	// useEffect(() => {
	// 	const loadData = async () => {
	// 		try {
	// 			const response = await stock();
	// 			setMedicaments(response.data);
	// 		} catch (err) {
	// 			setError(err.message);
	// 		} finally {
	// 			setLoading(false);
	// 		}
	// 	};

	// 	loadData();
	// }, []);

	// Fonction pour charger les médicaments
	const loadData = async () => {
		setLoading(true);
		try {
			const response = await stock();
			setMedicaments(response.data);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	// Fonction pour rafraîchir les médicaments
	const refreshMedicaments = async () => {
		await loadData(); // Recharge les médicaments
	};

	// Charger les données au premier rendu
	useEffect(() => {
		loadData();
	}, []);
	return (
		<ListMedicamentsContext.Provider value={{ medicaments, error, loading, refreshMedicaments, setMedicaments }}>
			{children}
		</ListMedicamentsContext.Provider>
	);
};
