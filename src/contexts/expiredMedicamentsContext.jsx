/* eslint-disable react/prop-types */

import { createContext, useEffect, useState } from "react";
import { stockInExpired } from "../api/product";

export const ExpiredMedicamentsContext = createContext();

export const ExpiredMedicamentsProvider = ({ children }) => {
	const [productExpired, setProductExpired] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadData = async () => {
			try {
				const response = await stockInExpired();
				setProductExpired(response.data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		loadData();
	}, []);
	return (
		<ExpiredMedicamentsContext.Provider value={{ productExpired, loading, error }}>
			{children}
		</ExpiredMedicamentsContext.Provider>
	);
};
