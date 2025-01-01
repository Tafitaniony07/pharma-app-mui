import { ChevronRight, Delete, Edit, Print } from "@mui/icons-material";
import { Box, Fab, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import TransactionTable from "./transactionTable";

const TransactionData = ({ data, deleteTransaction, openPaymentDialog, print, account }) => (
	<Box sx={{ maxHeight: "66vh", overflowY: "auto" }}>
		{data.map((item, i) => (
			<Box
				key={i}
				id={`transaction-${i}`}
				display="flex"
				flexDirection="column"
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
							# {i + 1}
						</Typography>
						<ChevronRight />
						<Typography component="h4">{item.client}</Typography>
					</Box>
					<Typography component="h4">Montant total : {item.prix_total} Ar</Typography>
					<Typography
						component="div"
						sx={{
							background: `${
								parseInt(item.prix_restant) > 0 ? "rgba(255, 0, 0, 0.115)" : "rgba(0, 128, 0, 0.055)"
							}`,
						}}
						px={2}
						py={1}
						borderRadius={5}
					>
						Etat : {parseInt(item.prix_restant) > 0 ? `Restant( ${item.prix_restant} Ar )` : "Tout payé"}
					</Typography>
					<Typography component="h4">{item.produits.length > 0 ? item.date : "N/A"}</Typography>
					<Stack direction="row" spacing={2} sx={{ mt: 3 }}>
						<Fab
							size="small"
							aria-label="delete"
							disabled={account.account_type === "proprios" || parseInt(item.prix_restant) > 0}
							onClick={() => deleteTransaction(item)}
							sx={{
								background: "rgba(255, 0, 0, 0.105)",
								boxShadow: "0",
								border: "1px solid rgba(255, 0, 0, 0.145)",
								"&:hover": {
									background: "rgba(255, 0, 0, 0.245)",
									color: "red",
								},
							}}
						>
							<Delete />
						</Fab>
						{parseInt(item.prix_restant) > 0 ? (
							<Fab
								size="small"
								aria-label="edit"
								onClick={() => openPaymentDialog(item)}
								sx={{
									background: "rgba(0, 128, 0, 0.105)",
									boxShadow: "0",
									border: "1px solid rgba(0, 128, 0, 0.145)",
									"&:hover": {
										background: "rgba(0, 128, 0, 0.145)",
										color: "secondary.main",
									},
								}}
							>
								<Edit />
							</Fab>
						) : null}
						<Fab
							size="small"
							aria-label="print"
							onClick={() => print(item)}
							sx={{
								background: "rgba(0, 128, 0, 0.105)",
								boxShadow: "0",
								border: "1px solid rgba(0, 128, 0, 0.145)",
								"&:hover": {
									background: "rgba(0, 128, 0, 0.145)",
									color: "secondary.main",
								},
							}}
						>
							<Print />
						</Fab>
					</Stack>
				</Stack>
				<TransactionTable data={item} />
			</Box>
		))}
	</Box>
);
TransactionData.propTypes = {
	data: PropTypes.array.isRequired,
	deleteTransaction: PropTypes.func.isRequired,
	openPaymentDialog: PropTypes.func.isRequired,
	print: PropTypes.func.isRequired,
	account: PropTypes.shape({
		account_type: PropTypes.string.isRequired,
	}).isRequired,
};

export default TransactionData;
