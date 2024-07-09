import { useEffect, useState } from "react";
import { Box, Fab, Stack, Typography } from "@mui/material";
import { ListFacture } from "../api/facture";
import { startOfDay, startOfWeek, startOfMonth, isWithinInterval } from "date-fns";
import { ArrowRight, CalendarMonth } from "@mui/icons-material";

const TransactionSummary = () => {
	const [listTransactions, setListTransaction] = useState([]);

	useEffect(() => {
		const fetchTransactions = async () => {
			const res = await ListFacture();
			setListTransaction(res.data);
		};
		fetchTransactions();
	}, []);

	const getTotalByPeriod = (periodStart) => {
		const now = new Date();
		return listTransactions
			.flatMap((item) => item.produits) // Accédez aux produits
			.filter((product) => {
				const transactionDate = new Date(product.date); // Utilisez la date dans le produit
				return isWithinInterval(transactionDate, { start: periodStart, end: now });
			})
			.reduce((sum, product) => sum + Number(product.prix_total), 0); // Convertissez prix_total en nombre
	};

	const todayTotal = getTotalByPeriod(startOfDay(new Date()));
	const weekTotal = getTotalByPeriod(startOfWeek(new Date()));
	const monthTotal = getTotalByPeriod(startOfMonth(new Date()));

	return (
		<Box>
			<Typography variant="h5" color="primary">
				Résumé des Transactions
			</Typography>
			<Typography variant="p">Découvrez tous le Total des transactions</Typography>

			<Stack direction="row" spacing={2} sx={{ mt: 3 }}>
				<Box bgcolor="secondary.main" color="white" p={2} borderRadius={2} flex={1}>
					<Stack
						direction="row"
						justifyContent="space-between"
						alignItems="center"
						borderBottom="1px solid rgb(255, 255, 255,0.22)"
						pb={2}
						mb={3}
					>
						<Typography>Vendeur Name</Typography>
						<Fab
							variant="extended"
							size="small"
							sx={{
								background: "rgb(255, 255, 255,0.077)",
								boxShadow: "0",
								color: "white",
								p: "7px 10px",
								border: "1px solid #fff",
							}}
						>
							<CalendarMonth sx={{ fontSize: "23px", mr: "5px" }} />
							Aujourd'hui
						</Fab>
					</Stack>

					<Stack direction="row">
						<ArrowRight sx={{ bgcolor: "rgb(255, 255, 255,0.077)", borderRadius: "20px" }} />
						<Typography ml={1}>Total : {todayTotal} Ar</Typography>
					</Stack>
				</Box>
				<Box bgcolor="#249f6D" color="white" p={2} borderRadius={2} flex={1}>
					<Stack
						direction="row"
						justifyContent="space-between"
						alignItems="center"
						borderBottom="1px solid rgb(255, 255, 255,0.22)"
						pb={2}
						mb={3}
					>
						<Typography>Vendeur Name</Typography>
						<Fab
							variant="extended"
							size="small"
							sx={{
								background: "rgb(255, 255, 255,0.077)",
								boxShadow: "0",
								color: "white",
								p: "7px 10px",
								border: "1px solid #fff",
							}}
						>
							<CalendarMonth sx={{ fontSize: "23px", mr: "5px" }} />
							Cette semaine
						</Fab>
					</Stack>

					<Stack direction="row">
						<ArrowRight sx={{ bgcolor: "rgb(255, 255, 255,0.077)", borderRadius: "20px" }} />
						<Typography ml={1}>Total : {weekTotal} Ar</Typography>
					</Stack>
				</Box>
				<Box bgcolor="#515f6D" color="white" p={2} borderRadius={2} flex={1}>
					<Stack
						direction="row"
						justifyContent="space-between"
						alignItems="center"
						borderBottom="1px solid rgb(255, 255, 255,0.22)"
						pb={2}
						mb={3}
					>
						<Typography>Vendeur Name</Typography>
						<Fab
							variant="extended"
							size="small"
							sx={{
								background: "rgb(255, 255, 255,0.077)",
								boxShadow: "0",
								color: "white",
								p: "7px 10px",
								border: "1px solid #fff",
							}}
						>
							<CalendarMonth sx={{ fontSize: "23px", mr: "5px" }} />
							Ce mois-ci
						</Fab>
					</Stack>

					<Stack direction="row">
						<ArrowRight sx={{ bgcolor: "rgb(255, 255, 255,0.077)", borderRadius: "20px" }} />
						<Typography ml={1}>Total : {monthTotal} Ar</Typography>
					</Stack>
				</Box>
			</Stack>
		</Box>
	);
};

export default TransactionSummary;
