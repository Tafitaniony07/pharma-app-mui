import { getTodayDate } from "../../functions/getDateToday.js";

const Familles = [
	{ value: "Medicaments", label: "Medicaments" },
	{ value: "Accessoires", label: "Accessoires" },
];
const Classes_Medic = [
	{ value: "comprimé", label: "comprimé" },
	{ value: "sirop", label: "sirop" },
	{ value: "crème", label: "crème" },
	{ value: "pommade", label: "pommade" },
	{ value: "injection", label: "injection" },
	{ value: "gélule", label: "gélule" },
	{ value: "poudre", label: "poudre" },
	{ value: "suppositoire", label: "suppositoire" },
	{ value: "ampoule", label: "ampoule" },
];

const Type_Uniter = [
	{ value: "plaquette", label: "plaquette" },
	{ value: "sachet", label: "sachet" },
	{ value: "flacon", label: "flacon" },
];
const Type_Gros = [
	{ value: "boites", label: "boites" },
	{ value: "paquet", label: "paquet" },
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
	{ label: "Classe", name: "classe", type: "select", defaultValue: "comprimé", options: Classes_Medic },
	{ label: "Marque", name: "marque" },
	{ label: "Type Uniter", name: "type_uniter", type: "select", defaultValue: "plaquette", options: Type_Uniter },
	{ label: "Type Gros", name: "type_gros", type: "select", defaultValue: "boites", options: Type_Gros },
	{ label: "Prix Uniter", name: "prix_uniter", type: "number" },
	{ label: "Prix Gros", name: "prix_gros", type: "number" },
	{ label: "Quantité Uniter", name: "qte_uniter", type: "number", defaultValue: "0" },
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
