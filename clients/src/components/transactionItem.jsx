import { ChevronRight } from "@mui/icons-material";
import {
	Box,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ListFacture } from "../api/facture";

const TransactionItem = () => {
	const [listTransactions, setListTransaction] = useState([])
	// const listTransactions = [
	// 	{
	// 		id: 1,
	// 		client: "John Doe",
	// 		date_transaction: "12-08-24",
	// 		total: 15000,
	// 		state: "payé",
	// 		listeMedicaments: [
	// 			{
	// 				NomMedicament: "paracetamol 500mg",
	// 				marque: "DESKA",
	// 				qte_uniter: 5,
	// 				qte_gros: 10,
	// 				totalprix: 1200,
	// 			},
	// 			{
	// 				NomMedicament: "ibuprofen 200mg",
	// 				marque: "Advil",
	// 				qte_uniter: 3,
	// 				qte_gros: 8,
	// 				totalprix: 800,
	// 			},
	// 		],
	// 	},
	// 	{
	// 		id: 2,
	// 		client: "Jane Smith",
	// 		date_transaction: "14-09-24",
	// 		total: 20000,
	// 		state: "non payé",
	// 		listeMedicaments: [
	// 			{
	// 				NomMedicament: "amoxicillin 500mg",
	// 				marque: "Moxatag",
	// 				qte_uniter: 10,
	// 				qte_gros: 5,
	// 				totalprix: 3000,
	// 			},
	// 			{
	// 				NomMedicament: "cetirizine 10mg",
	// 				marque: "Zyrtec",
	// 				qte_uniter: 7,
	// 				qte_gros: 3,
	// 				totalprix: 1500,
	// 			},
	// 		],
	// 	},
	// 	{
	// 		id: 3,
	// 		client: "Alice Johnson",
	// 		date_transaction: "15-10-24",
	// 		total: 18000,
	// 		state: "payé",
	// 		listeMedicaments: [
	// 			{
	// 				NomMedicament: "metformin 500mg",
	// 				marque: "Glucophage",
	// 				qte_uniter: 8,
	// 				qte_gros: 6,
	// 				totalprix: 2500,
	// 			},
	// 			{
	// 				NomMedicament: "lisinopril 10mg",
	// 				marque: "Prinivil",
	// 				qte_uniter: 9,
	// 				qte_gros: 4,
	// 				totalprix: 2100,
	// 			},
	// 		],
	// 	},
	// ];
	useEffect(()=>{
		const fetch = async()=>{
			const res = await ListFacture()
			console.log(res.data);
			setListTransaction(res.data)
		}
		fetch()
	}, [])
	return (
		<>
			<Stack spacing={3} direction="row" alignItems="center" justifyContent="space-between">
				<Typography component="h2" sx={{ fontSize: "25px" }} color="primary">
					Tous les Transactions
					<Typography component="p" color="black">
						Il y a {listTransactions.length} total de transactions
					</Typography>
				</Typography>
			</Stack>
			{listTransactions.map((item) => (
				<Box
					display="flex"
					flexDirection="column"
					key={item.id}
					p={2}
					sx={{
						background: "#045D5D03",
						borderRadius: 3,
						border: "1px solid transparent",
					}}
					my={2}
				>
					<Stack spacing={3} direction="row" alignItems="center" justifyContent="space-between">
						<Box display={"flex"} alignItems={"center"}>
							<Typography
								component="div"
								sx={{
									borderRadius: "0px 20px 20px 0px",
									color: "#fff",
									mr: 2,
									ml: "-20px",
									bgcolor: "primary.main",
									px: 3,
									py: 0.5,
								}}
							>
								# {item.id}
							</Typography>
							<ChevronRight />
							<Typography component="h4">{item.client}</Typography>
						</Box>
						<Typography component="div">Montant total à payer : {item.prix_total} Ar</Typography>
						<Typography component="div">Etat : {item.type_transaction}</Typography>

						<Typography
							component="div"
							color="white"
							bgcolor="secondary.main"
							px={3}
							py={0.5}
							borderRadius={10}
						>
							Date {item.date}
						</Typography>
					</Stack>
					<TableContainer sx={{ mt: 2, overflow: "hidden", borderRadius: 3 }}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Nom Medicament</TableCell>
									<TableCell>Marque</TableCell>
									<TableCell>Quantité (unité)</TableCell>
									<TableCell>Quantité (gros)</TableCell>
									<TableCell>Prix (Ar)</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{item.produits.map((medicament, index) => (
									<TableRow key={index}>
										<TableCell>{medicament.product}</TableCell>
										<TableCell>{medicament.marque}</TableCell>
										<TableCell>{medicament.qte_uniter_transaction}</TableCell>
										<TableCell>{medicament.qte_gros_transaction}</TableCell>
										<TableCell>{medicament.prix_total}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Box>
			))}
		</>
	);
};

export default TransactionItem;
