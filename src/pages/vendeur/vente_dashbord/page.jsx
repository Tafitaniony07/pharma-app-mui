/* eslint-disable no-useless-catch */
import SearchIcon from "@mui/icons-material/Search";
import { Box, InputAdornment, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Toaster } from "sonner";
import AchatDialog from "../../../components/modal/achatDialog.jsx";
import { useListMedicaments } from "../../../contexts/useListMedicaments.js";
import { useCart } from "../../../hooks/useCart.js";
import { useTransaction } from "../../../hooks/useTransaction.js";
import Panier from "../panier/page.jsx";
import MedicamentTable from "../table_product/page.jsx";

const ListMedicamentsVendeur = () => {
	const { addCart, clearCart, loadingState, addToCart, updateCartQuantity, removeFromCart, calculateTotalPrice } =
		useCart();
	const { clientName, setClientName, dialogOpen, setDialogOpen, currentTransaction, saveTransaction } =
		useTransaction(addCart, clearCart);

	const navigate = useNavigate();
	// États pour gérer le filtrage et la recherche
	const [filterText, setFilterText] = useState("");

	// États pour les informations de transaction
	const [paymentStatus, setPaymentStatus] = useState("Payé");
	const [remainingAmount, setRemainingAmount] = useState(0);

	// États pour les médicaments
	const { medicaments, loading } = useListMedicaments();

	const filteredMedic = medicaments.filter((item) =>
		item.detail_product.designation.toLowerCase().includes(filterText.toLowerCase())
	);

	return (
		<>
			<Stack direction="row" justifyContent="space-between" alignItems="stretch" maxWidth="100%">
				<Box bgcolor="white" borderRadius={5} p={3} mr={3} flex={5}>
					<TextField
						label="Rechercher un médicament..."
						placeholder="Entrez le nom du médicament"
						value={filterText}
						color="success"
						sx={{ mb: 3 }}
						onChange={(e) => setFilterText(e.target.value)}
						fullWidth
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<SearchIcon />
								</InputAdornment>
							),
						}}
					/>
					<MedicamentTable
						addToCart={addToCart}
						loadingState={loadingState}
						Medicaments={filteredMedic}
						loading={loading}
					/>
				</Box>
				<Box
					sx={{
						borderRadius: 5,
						p: 2,
						mr: 3,
						bgcolor: "#fff",
					}}
					flex={3}
				>
					<Panier
						addCart={addCart}
						clearCart={clearCart}
						removeFromCart={removeFromCart}
						clientName={clientName}
						paymentStatus={paymentStatus}
						remainingAmount={remainingAmount}
						updateCartQuantity={updateCartQuantity}
						calculateTotalPrice={calculateTotalPrice}
						setClientName={setClientName}
						setPaymentStatus={setPaymentStatus}
						setRemainingAmount={setRemainingAmount}
						saveTransaction={saveTransaction}
					/>
				</Box>
			</Stack>
			<AchatDialog
				dialogOpen={dialogOpen}
				setDialogOpen={setDialogOpen}
				navigate={navigate}
				transaction={currentTransaction}
				onClose={() => setDialogOpen(false)}
			/>
			<Toaster position="top-center" richColors />
		</>
	);
};

export default ListMedicamentsVendeur;
