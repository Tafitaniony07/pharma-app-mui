/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import { Box, Grid, Typography } from "@mui/material";
import { isWithinInterval, startOfDay, startOfMonth, startOfWeek } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useAccountStore } from "../accountStore";
import { listAccount } from "../api/account";
import { ListFacture } from "../api/facture";
const GraphView = () => {
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
	const listSummary = getListPeriodTotal();
	const data = listSummary.flatMap((item) => [{ name: item.vendeur, total: item.week }]);

	return (
		<ResponsiveContainer width="100%" height="100%">
			<AreaChart
				width={500}
				height={400}
				data={data}
				margin={{
					top: 15,
					left: 10,
					right: 0,
					bottom: 0,
				}}
			>
				<CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#ffffff1c" />
				<Area type="monotone" dataKey="total" stroke="#22c55e" fill={`url(#cyan-gradient)`} />
				<defs>
					<linearGradient id="cyan-gradient" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor="#22c44e" stopOpacity={0.3} />
						<stop offset="75%" stopColor="#253b3d" stopOpacity={0.05} />
					</linearGradient>
				</defs>
				<XAxis dataKey="name" fontSize={12} stroke="#f9fdfd88" axisLine={false} tickLine={false} />
				<YAxis
					dataKey="total"
					fontSize={13}
					stroke="#f9fdfd99"
					axisLine={false}
					tickLine={false}
					tickFormatter={(value) => {
						return `Ar ${Intl.NumberFormat("en-US").format(value)}`;
					}}
				/>
				<Tooltip
					cursor={{
						radius: 4,
						stroke: "#253b3d",
					}}
					content={({ active, payload }) => {
						if (!active || !payload || payload.length === 0) {
							return null;
						}
						return (
							<Box
								sx={{
									background:
										"linear-gradient(to bottom right, rgba(0, 255, 255, 0.05), rgba(0, 255, 255, 0.1))",
									padding: 2,
									borderRadius: 1,
									fontFamily: "'Lexend Mono', monospace",
									border: "1px solid rgba(255, 255, 255, 0.1)",
								}}
							>
								<Grid container spacing={2}>
									<Grid item xs={6}>
										<Box display="flex" flexDirection="column">
											<Typography
												variant="caption"
												sx={{ textTransform: "uppercase", color: "rgb(181, 207, 243)" }}
											>
												Total
											</Typography>
											<Typography
												variant="body2"
												sx={{
													fontWeight: "bold",
													fontSize: "14px",
													color: "rgb(252, 211, 77)",
												}}
											>
												{Intl.NumberFormat("en-US").format(payload[0].payload.total)} Ar
											</Typography>
										</Box>
									</Grid>
									<Grid item xs={6}>
										<Box display="flex" flexDirection="column">
											<Typography
												variant="caption"
												sx={{ textTransform: "uppercase", color: "rgb(181, 207, 243)" }}
											>
												User
											</Typography>
											<Typography
												variant="body2"
												sx={{
													fontWeight: "bold",
													textTransform: "uppercase",
													fontSize: "12px",
													color: "rgb(252, 211, 77)",
												}}
											>
												{payload[0].payload.name}
											</Typography>
										</Box>
									</Grid>
								</Grid>
							</Box>
						);
					}}
				/>
			</AreaChart>
		</ResponsiveContainer>
	);
};

export default GraphView;
