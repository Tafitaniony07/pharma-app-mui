const getTodayDate = () => {
	const today = new Date();
	const yyyy = today.getFullYear();
	const mm = String(today.getMonth() + 1).padStart(2, "0"); // Mois avec deux chiffres
	const dd = String(today.getDate() + 1).padStart(2, "0"); // Jour avec deux chiffres
	return `${yyyy}-${mm}-${dd}`;
};

const Familles = [
	{ value: "Medicaments", label: "Medicaments" },
	{ value: "Accessoires", label: "Accessoires" },
];

const FieldAddProduct = [
	{
		label: "Famille",
		name: "famille",
		type: "select",
		defaultValue: "Medicaments",
		options: Familles,
	},
	{ label: "Designation", name: "designation" },
	{ label: "Classe", name: "classe" },
	{ label: "Marque", name: "marque" },
	{ label: "Type Uniter", name: "type_uniter" },
	{ label: "Type Gros", name: "type_gros" },
	{ label: "Prix Uniter", name: "prix_uniter", type: "number" },
	{ label: "Prix Gros", name: "prix_gros", type: "number" },
	{ label: "Quantité Uniter", name: "qte_uniter", type: "number", defaultValue: "1" },
	{ label: "Quantité Gros", name: "qte_gros", type: "number", defaultValue: "1" },
	{ label: "Quantité Max", name: "qte_max", type: "number", defaultValue: "1" },
	{
		label: "Date de peremption",
		name: "date_peremption",
		type: "date",
		autoFocus: true,
		defaultValue: getTodayDate(),
	},
	{ label: "Nom Fournisseur", name: "fournisseur" },
	{ label: "Adresse Fournisseur", name: "adresse" },
	{ label: "N° Téléphone Fournisseur", name: "contact", type: "tel" },
];

export default FieldAddProduct;
