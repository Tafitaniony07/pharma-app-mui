/* eslint-disable react/prop-types */

import { createContext, useEffect, useState } from "react";
import { stockInRupte } from "../api/product";

export const OutOfStockContext = createContext();

export const OutOfStockProvider = ({ children }) => {
	const [products, setProducts] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadData = async () => {
			try {
				const response = await stockInRupte();
				setProducts(response.data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		loadData();
	}, []);
	return <OutOfStockContext.Provider value={{ products, error, loading }}>{children}</OutOfStockContext.Provider>;
};
