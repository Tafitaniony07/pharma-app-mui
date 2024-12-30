/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import { Box, Typography } from "@mui/material";
import { isWithinInterval, startOfDay, startOfMonth, startOfWeek } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
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

	// Calcul des résumés des transactions
	const listSummary = getListPeriodTotal();
	// Couleurs différentes pour chaque vendeur

	// const data = listSummary.flatMap((item) => [{ name: item.vendeur, period: "Today", total: item.day }]);
	const data = listVendeur.map((vendeur) => {
		return {
			name: vendeur.username, // Nom du vendeur
			total: getTotalByPeriod(startOfDay(new Date()), vendeur), // Calculer le total pour "Today"
		};
	});

	// Couleurs différentes pour chaque vendeur
	const colors = [
		"#22c55e", // couleur principale
		"#ff5722", // autre couleur
		"#4caf50", // couleur complémentaire
		"#2196f3", // etc.
	];

	return (
		// <ResponsiveContainer width={500} height="100%">
		// 	<BarChart
		// 		width={500}
		// 		height={400}
		// 		data={data}
		// 		margin={{
		// 			top: 15,
		// 			right: 10,
		// 			left: -15,
		// 			bottom: 0,
		// 		}}
		// 	>
		// 		<CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#ffffff1c" />
		// 		<Bar type="monotone" dataKey="total" barSize={20} stroke="#22c55e" fill={`url(#cyan-gradient)`} />
		// 		<defs>
		// 			<linearGradient id="cyan-gradient" x1="0" y1="0" x2="0" y2="1">
		// 				<stop offset="0%" stopColor="#22c44e" stopOpacity={0.3} />
		// 				<stop offset="75%" stopColor="#253b3d" stopOpacity={0.05} />
		// 			</linearGradient>
		// 		</defs>
		// 		<XAxis dataKey="period" fontSize={15} stroke="#aeaeae" axisLine={false} tickLine={false} interval={0} />
		// 		<YAxis
		// 			dataKey="total"
		// 			fontSize={15}
		// 			stroke="#aeaeae"
		// 			axisLine={false}
		// 			tickLine={false}
		// 			tickFormatter={(value) => {
		// 				return `${value} Ar`;
		// 			}}
		// 		/>
		// 		<Tooltip
		// 			cursor={{
		// 				radius: 4,
		// 				stroke: "#253b3d",
		// 			}}
		// 			content={({ active, payload }) => {
		// 				if (!active || !payload || payload.length === 0) {
		// 					return null;
		// 				}
		// 				return (
		// 					<Box
		// 						sx={{
		// 							background:
		// 								"linear-gradient(to bottom right, rgba(0, 255, 255, 0.05), rgba(0, 255, 255, 0.1))",
		// 							padding: 2,
		// 							borderRadius: 1,
		// 							fontFamily: "'Lexend Mono', monospace",
		// 							border: "1px solid rgba(255, 255, 255, 0.1)",
		// 						}}
		// 					>
		// 						<Grid container spacing={2}>
		// 							<Grid item xs={6}>
		// 								<Box display="flex" flexDirection="column">
		// 									<Typography
		// 										variant="caption"
		// 										sx={{ textTransform: "uppercase", color: "rgb(181, 207, 243)" }}
		// 									>
		// 										Total
		// 									</Typography>
		// 									<Typography
		// 										variant="body2"
		// 										sx={{
		// 											fontWeight: "bold",
		// 											fontSize: "14px",
		// 											textTransform: "uppercase",
		// 											color: "rgb(252, 211, 77)",
		// 										}}
		// 									>
		// 										{payload[0].payload.total} Ar
		// 									</Typography>
		// 								</Box>
		// 							</Grid>
		// 							<Grid item xs={6}>
		// 								<Box display="flex" flexDirection="column">
		// 									<Typography
		// 										variant="caption"
		// 										sx={{ textTransform: "uppercase", color: "rgb(181, 207, 243)" }}
		// 									>
		// 										User
		// 									</Typography>
		// 									<Typography
		// 										variant="body2"
		// 										sx={{
		// 											fontWeight: "bold",
		// 											textTransform: "uppercase",
		// 											fontSize: "13px",
		// 											color: "rgb(252, 211, 77)",
		// 										}}
		// 									>
		// 										{payload[0].payload.name}
		// 									</Typography>
		// 								</Box>
		// 							</Grid>
		// 						</Grid>
		// 					</Box>
		// 				);
		// 			}}
		// 		/>
		// 	</BarChart>
		// </ResponsiveContainer>
		// <ResponsiveContainer width="100%" height={400}>
		// 	<BarChart
		// 		data={data}
		// 		margin={{
		// 			top: 20,
		// 			right: 30,
		// 			left: 40,
		// 			bottom: 40,
		// 		}}
		// 	>
		// 		<CartesianGrid strokeDasharray="3 3" />
		// 		<XAxis dataKey="period" interval={0} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
		// 		<YAxis tickFormatter={(value) => `${value} Ar`} tickLine={true} axisLine={true} fontSize={12} />
		// 		<Tooltip
		// 			content={({ active, payload }) => {
		// 				if (!active || !payload || payload.length === 0) return null;
		// 				return (
		// 					<Box
		// 						sx={{
		// 							background: "rgba(0, 255, 255, 0.1)",
		// 							padding: 2,
		// 							borderRadius: 1,
		// 							fontFamily: "'Lexend Mono', monospace",
		// 						}}
		// 					>
		// 						<Typography variant="body2" sx={{ color: "#253b3d" }}>
		// 							{payload[0].payload.name} - {payload[0].payload.period}
		// 						</Typography>
		// 						<Typography variant="body1" sx={{ fontWeight: "bold" }}>
		// 							{payload[0].payload.total} Ar
		// 						</Typography>
		// 					</Box>
		// 				);
		// 			}}
		// 		/>
		// 		<Legend verticalAlign="top" height={36} />
		// 		{listVendeur.map((vendeur, index) => (
		// 			<Bar
		// 				key={vendeur.username}
		// 				dataKey="total"
		// 				name={vendeur.username}
		// 				fill={index % 2 === 0 ? "#22c55e" : "#ff4500"} // Couleurs alternées pour chaque vendeur
		// 				radius={[10, 10, 0, 0]}
		// 				barSize={25}
		// 				data={data.filter((entry) => entry.name === vendeur.username)} // Filtrer les données pour chaque vendeur
		// 			/>
		// 		))}
		// 	</BarChart>
		// </ResponsiveContainer>
		//

		<ResponsiveContainer width="100%" height={400}>
			<AreaChart
				data={data}
				margin={{
					top: 20,
					right: 30,
					left: 40,
					bottom: 40,
				}}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
				<YAxis
					// tickFormatter={`(value) => ${value} Ar`}
					tickLine={true}
					axisLine={true}
					fontSize={12}
					ticks={[200000, 500000, 1000000]} // Valeurs définies pour l'axe Y
				/>
				<Tooltip
					content={({ active, payload }) => {
						if (!active || !payload || payload.length === 0) return null;
						return (
							<Box
								sx={{
									background: "rgba(0, 255, 255, 0.1)",
									padding: 2,
									borderRadius: 1,
									fontFamily: "'Lexend Mono', monospace",
								}}
							>
								<Typography variant="body2" sx={{ color: "#253b3d" }}>
									{payload[0].payload.name} - Total Today
								</Typography>
								<Typography variant="body1" sx={{ fontWeight: "bold" }}>
									{payload[0].payload.total} Ar
								</Typography>
							</Box>
						);
					}}
				/>
				<Legend verticalAlign="top" height={36} />

				{/* Ajouter des Areas pour chaque vendeur */}
				{listVendeur.map((vendeur, index) => {
					// Trouver la donnée correspondante pour le vendeur
					const vendeurData = data.filter((entry) => entry.name === vendeur.username);

					return (
						<Area
							key={`${vendeur.username}-today`}
							dataKey="total"
							name={`${vendeur.username}`}
							type="monotone"
							stroke={colors[index % colors.length]} // Attribuer une couleur unique
							fillOpacity={0.3}
							fill={colors[index % colors.length]} // Couleur de remplissage
							data={vendeurData}
							strokeWidth={2}
						/>
					);
				})}
			</AreaChart>
		</ResponsiveContainer>
	);
};

export default GraphView;
