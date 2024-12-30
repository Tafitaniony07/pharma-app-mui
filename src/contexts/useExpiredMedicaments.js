import { useContext } from "react";
import { ExpiredMedicamentsContext } from "./expiredMedicamentsContext";

export const useExpiredMedicaments = () => {
	const context = useContext(ExpiredMedicamentsContext);
	if (!context) {
		throw new Error("useExpiredMedicaments doit etre utilisé dans un ExpiredMedicamentsProvider");
	}
	return context;
};
