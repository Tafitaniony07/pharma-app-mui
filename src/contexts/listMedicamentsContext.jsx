/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { stock } from "../api/product";

export const ListMedicamentsContext = createContext();

export const MedicamentsProvider = ({ children }) => {
	const [medicaments, setMedicaments] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const loadData = async () => {
			try {
				const response = await stock();
				setMedicaments(response.data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		loadData();
	}, []);
	return (
		<ListMedicamentsContext.Provider value={{ medicaments, error, loading, setMedicaments }}>
			{children}
		</ListMedicamentsContext.Provider>
	);
};
