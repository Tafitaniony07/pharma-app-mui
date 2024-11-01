/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import { useCallback, useEffect, useState } from "react";
import { Box, Fab, Stack, Typography } from "@mui/material";
import { ListFacture } from "../api/facture";
import { startOfDay, startOfWeek, startOfMonth, isWithinInterval } from "date-fns";
import { ArrowRight, CalendarMonth } from "@mui/icons-material";
import { listAccount } from "../api/account";
import { useAccountStore } from "../accountStore";

const TransactionSummary = () => {
	const [listFactures, setListTransaction] = useState([]);
	const [listVendeur, setListVendeur] = useState([]);
	const { account } = useAccountStore();
	useEffect(() => {
		const fetchTransactions = async () => {
			const res = await ListFacture();
			console.log("Status", res.data);
			setListTransaction(res.data);
		};
		const fetchVendeurs = async () => {
			const res = await listAccount();
			if (res.status === 200) {
				setListVendeur(() => res.data.filter((item) => item.account_type === "vendeur"));
			}
		};
		fetchTransactions();
		console.log("Account vendeur", account);
		if (account.account_type === "vendeurs") {
			setListVendeur([{ ...account, account_type: "vendeur" }]);
		} else fetchVendeurs();
	}, [account]);

	const getTotalByPeriod = (periodStart, vendeur) => {
		const now = new Date();
		console.log("Ved", listFactures);

		return listFactures
			.filter((facture) => facture.owner === vendeur.username)
			.flatMap((item) => item.produits) // Accédez aux produits
			.filter((product) => {
				const transactionDate = new Date(product.date); // Utilisez la date dans le produit
				return isWithinInterval(transactionDate, {
					start: periodStart,
					end: now,
				});
			})
			.reduce((sum, product) => sum + Number(product.prix_total), 0); // Convertissez prix_total en nombre
	};

	const getListPeriodTotal = useCallback(() => {
		return listVendeur.map((vendeur) => {
			return {
				// vendeur : {
				vendeur: vendeur.username,
				day: getTotalByPeriod(startOfDay(new Date()), vendeur),
				week: getTotalByPeriod(startOfWeek(new Date()), vendeur),
				month: getTotalByPeriod(startOfMonth(new Date()), vendeur),
				// }
			};
		});
	}, [listVendeur, listFactures]);

	const listSummary = getListPeriodTotal();
	console.log(listSummary);
	// console.log(getListPeriodTotal());
	return (
		<>
			<Typography variant="h5" color="primary">
				Résumé des Transactions
			</Typography>
			<Typography variant="p">Découvrez tous le Total des transactions</Typography>
			{listSummary.map((item, i) => {
				return (
					<Stack direction="row" spacing={2} sx={{ mt: 3 }} key={i}>
						<Box bgcolor="secondary.main" color="white" p={2} borderRadius={2} flex={1}>
							<Stack
								direction="row"
								justifyContent="space-between"
								alignItems="center"
								borderBottom="1px solid rgb(255, 255, 255,0.22)"
								pb={2}
								mb={3}
							>
								<Typography>{item.vendeur}</Typography>
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
								<ArrowRight
									sx={{
										bgcolor: "rgb(255, 255, 255,0.077)",
										borderRadius: "20px",
									}}
								/>
								<Typography ml={1}>Total : {item.day} Ar</Typography>
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
								<Typography>{item.vendeur}</Typography>
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
								<ArrowRight
									sx={{
										bgcolor: "rgb(255, 255, 255,0.077)",
										borderRadius: "20px",
									}}
								/>
								<Typography ml={1}>Total : {item.week} Ar</Typography>
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
								<Typography>{item.vendeur}</Typography>
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
								<ArrowRight
									sx={{
										bgcolor: "rgb(255, 255, 255,0.077)",
										borderRadius: "20px",
									}}
								/>
								<Typography ml={1}>Total : {item.month} Ar</Typography>
							</Stack>
						</Box>
					</Stack>
				);
			})}
		</>
	);
};

export default TransactionSummary;
