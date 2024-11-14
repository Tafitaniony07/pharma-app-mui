/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import { ArrowRight, CalendarMonth } from "@mui/icons-material";
import { Box, Fab, Stack, Typography } from "@mui/material";
import { isWithinInterval, startOfDay, startOfMonth, startOfWeek } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { useAccountStore } from "../../accountStore";
import { listAccount } from "../../api/account";
import { ListFacture } from "../../api/facture";

const TransactionSummary = () => {
	// État pour stocker la liste des factures
	const [listFactures, setListTransaction] = useState([]);
	// État pour stocker la liste des vendeurs
	const [listVendeur, setListVendeur] = useState([]);
	// Récupération du compte utilisateur depuis le store
	const { account } = useAccountStore();

	// Hook d'effet pour charger les données initiales
	useEffect(() => {
		// Fonction pour récupérer toutes les factures
		const fetchTransactions = async () => {
			const res = await ListFacture();
			console.log("Status", res.data);
			setListTransaction(res.data);
		};

		// Fonction pour récupérer la liste des vendeurs
		const fetchVendeurs = async () => {
			const res = await listAccount();
			if (res.status === 200) {
				// Filtrer pour ne garder que les comptes de type vendeur
				setListVendeur(() => res.data.filter((item) => item.account_type === "vendeur"));
			}
		};

		// Appel pour charger les factures
		fetchTransactions();
		console.log("Account vendeur", account);

		// Si l'utilisateur est un vendeur, on ne charge que ses données
		if (account.account_type === "vendeurs") {
			setListVendeur([{ ...account, account_type: "vendeur" }]);
		} else {
			// Sinon on charge tous les vendeurs
			fetchVendeurs();
		}
	}, [account]);

	// Fonction pour calculer le total des ventes sur une période donnée pour un vendeur
	const getTotalByPeriod = (periodStart, vendeur) => {
		const now = new Date();
		console.log("Ved", listFactures);

		return (
			listFactures
				// Filtrer les factures par vendeur
				.filter((facture) => facture.owner === vendeur.username)
				// Transformer la liste des factures en liste de produits
				.flatMap((item) => item.produits)
				// Filtrer les produits par période
				.filter((product) => {
					const transactionDate = new Date(product.date);
					return isWithinInterval(transactionDate, {
						start: periodStart,
						end: now,
					});
				})
				// Calculer la somme totale des prix
				.reduce((sum, product) => sum + Number(product.prix_total), 0)
		);
	};

	// Fonction mémorisée pour obtenir les totaux par période pour chaque vendeur
	const getListPeriodTotal = useCallback(() => {
		return listVendeur.map((vendeur) => {
			return {
				// Créer un objet avec les totaux par période
				vendeur: vendeur.username,
				day: getTotalByPeriod(startOfDay(new Date()), vendeur),
				week: getTotalByPeriod(startOfWeek(new Date()), vendeur),
				month: getTotalByPeriod(startOfMonth(new Date()), vendeur),
			};
		});
	}, [listVendeur, listFactures]);

	// Calcul des résumés des transactions
	const listSummary = getListPeriodTotal();

	return (
		<>
			<Typography variant="h5" color="primary">
				Aperçu des transactions
			</Typography>
			<Typography variant="body1">Découvrez le total des transactions par vendeur et par période</Typography>
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
