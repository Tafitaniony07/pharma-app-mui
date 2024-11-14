export const columns = [
	{ filter: "famille", label: "Famille" },
	{ filter: "designation", label: "Désignation" },
	{ filter: "classe", label: "Classe" },
	{ filter: "marque_product", label: "Marque" },
	{ filter: "prix_uniter", label: "P.U" },
	{ filter: "prix_gros", label: "P.G" },
	{ filter: "qte_gros", label: "Quantité" },
	{ filter: "date_peremption", label: "Date Exp" },
];

export const expiryColumn = [
	{ maxWidth: 80, filter: "family", label: "Famille" },
	{ maxWidth: 150, filter: "designation", label: "Designation" },
	{ maxWidth: 80, filter: "classe", label: "Classe" },
	{ maxWidth: 100, filter: "marque", label: "Marque" },
	{ maxWidth: 80, filter: "quantity", label: "Quantité" },
	{ maxWidth: 80, filter: "prix_uniter", label: "P.U" },
	{ maxWidth: 80, filter: "prix_gros", label: "P.G" },
	{ maxWidth: 80, filter: "fournisseur", label: "Fournisseur" },
	{ maxWidth: 100, filter: "date_peremption", label: "Date Exp" },
];
export const colVendeur = [
	{ minWidth: 100, label: "Designation", filter: "designation" },
	{ minWidth: 85, label: "Marque", filter: "marque" },
	{ minWidth: 85, label: "Classe", filter: "classe" },
	{ minWidth: 85, label: "Quantité", filter: "quantity" },
	{ minWidth: 85, label: "P U", filter: "prix_uniter" },
	{ minWidth: 85, label: "P G", filter: "prix_gros" },
	{ minWidth: 50, label: "Actions" },
];
