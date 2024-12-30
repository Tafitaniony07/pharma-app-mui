import { useContext } from "react";
import { ListMedicamentsContext } from "./listMedicamentsContext";

export const useListMedicaments = () => {
	const context = useContext(ListMedicamentsContext);
	if (!context) {
		throw new Error("useListMedicaments doit etre utilisé dans un MedicamentsProvider");
	}
	return context;
};
