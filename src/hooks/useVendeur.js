import { useEffect, useState } from "react";
import { listAccount } from "../api/account";

const useVendeur = () => {
	const [listVendeur, setListVendeur] = useState([]);

	const fetchVendeurs = async () => {
		try {
			const res = await listAccount();
			if (res.status === 200) {
				setListVendeur(res.data.filter((item) => item.account_type === "vendeur"));
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchVendeurs();
	}, []);

	return listVendeur;
};

export default useVendeur;
