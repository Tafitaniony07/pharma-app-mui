import { useContext } from "react";
import { OutOfStockContext } from "./outOfStockContext";

export const useOutOfStock = () => {
	const context = useContext(OutOfStockContext);
	if (!context) {
		throw new Error("UseOutOfStock doit etre utilisé dans un OutOfStockProvider");
	}
	return context;
};
