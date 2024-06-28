export const getTodayDate = () => {
	const today = new Date();
	const yyyy = today.getFullYear();
	const mm = String(today.getMonth() + 1).padStart(2, "0"); // Mois avec deux chiffres
	const dd = String(today.getDate()).padStart(2, "0"); // Jour avec deux chiffres
	return `${yyyy}-${mm}-${dd}`;
};
