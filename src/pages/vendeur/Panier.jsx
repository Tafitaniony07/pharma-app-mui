/* eslint-disable react/prop-types */
import { useEffect } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Select,
	MenuItem,
	Typography,
	Stack,
} from "@mui/material";
import { Cancel, ClearAll, ShoppingBasket } from "@mui/icons-material";
import { TruncateText } from "../../components/TruncateText.jsx";
import Button from "../../components/btn/MuiButton.jsx";
import { useForm } from "react-hook-form";

const Panier = ({
	addCart,
	clientName,
	paymentStatus,
	remainingAmount,
	updateCartQuantity,
	calculateTotalPrice,
	setClientName,
	setPaymentStatus,
	setRemainingAmount,
	saveTransaction,
	clearCart,
	removeFromCart,
}) => {
	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState,
		getValues,
		formState: { errors },
	} = useForm({
		defaultValues: {
			clientName,
			paymentStatus,
			remainingAmount,
			cartItems: addCart.map((item) => ({
				name: item.detail_product.designation,
				quantityDetails: item.qte_uniter,
				quantityBulk: item.qte_gros,
			})),
		},
	});

	const onSubmit = () => {
		saveTransaction();
	};

	useEffect(() => {
		if (formState.isSubmitSuccessful) {
			reset({
				clientName: "",
				paymentStatus: "Payé",
				remainingAmount: "",
				cartItems: addCart.map((item) => ({
					pk: item.pk,
					name: item.detail_product.designation,
					quantityDetails: 0,
					quantityBulk: 0,
				})),
			});
		}
	}, [formState, reset, addCart]);

	return (
		<>
			{addCart.length > 0 ? (
				<form onSubmit={handleSubmit(onSubmit)}>
					<TableContainer sx={{ maxHeight: "47vh", borderRadius: 3 }}>
						<Table stickyHeader aria-label="sticky header">
							<TableHead>
								<TableRow>
									{["Nom", "Q.D", "Q.G", "Prix(Ar)"].map((name, index) => (
										<TableCell style={{ maxHeight: "20px" }} key={index}>
											{name}
										</TableCell>
									))}
								</TableRow>
							</TableHead>
							<TableBody>
								{addCart.map((item, index) => (
									<TableRow key={index}>
										<TableCell>{TruncateText(item.detail_product.designation, 12)}</TableCell>
										<TableCell>
											<TextField
												type="number"
												required
												{...register(`cartItems[${index}].quantityDetails`)}
												helperText={errors.clientName?.message}
												defaultValue={item.quantityDetails}
												onChange={(e) => {
													setValue(
														`cartItems[${index}].quantityDetails`,
														parseInt(e.target.value, 10)
													);
													updateCartQuantity(
														item.pk,
														"details",
														parseInt(e.target.value, 10)
													);
												}}
												size="small"
												inputProps={{
													min: getValues(`cartItems[${index}].quantityBulk`) > 0 ? 0 : 1,
												}}
												sx={{
													width: 60,
													"& .MuiOutlinedInput-input": {
														padding: "7px 5px",
													},
												}}
											/>
										</TableCell>
										<TableCell>
											<TextField
												type="number"
												{...register(`cartItems[${index}].quantityBulk`)}
												inputProps={{
													min: getValues(`cartItems[${index}].quantityDetails`) > 0 ? 0 : 1,
												}}
												defaultValue={item.quantityBulk}
												onChange={(e) => {
													setValue(
														`cartItems[${index}].quantityBulk`,
														parseInt(e.target.value, 10)
													);
													updateCartQuantity(item.pk, "bulk", parseInt(e.target.value, 10));
												}}
												size="small"
												sx={{
													width: 60,
													"& .MuiOutlinedInput-input": {
														padding: "7px 5px",
													},
												}}
											/>
										</TableCell>
										<TableCell>
											<Stack
												direction="row"
												alignItems="center"
												justifyContent="space-between"
												gap={2}
											>
												{item.price}
												<Cancel
													color="error"
													onClick={() => removeFromCart(item.pk)}
													sx={{
														"&: hover": {
															cursor: "pointer",
															color: "secondary.main",
														},
													}}
												/>
											</Stack>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
					<Typography variant="h6" mt={2}>
						Total:{" "}
						<Typography variant="span" color="#4d4373">
							{calculateTotalPrice()}Ar
						</Typography>
					</Typography>
					<TextField
						label="Nom du client"
						required
						defaultValue={clientName}
						{...register("clientName", {})}
						error={!!errors.clientName}
						helperText={errors.clientName?.message}
						sx={{
							mt: 2,
						}}
						onChange={(e) => setClientName(e.target.value)}
						fullWidth
					/>
					<Select
						label="État du paiement"
						{...register("paymentStatus")}
						value={paymentStatus}
						onChange={(e) => setPaymentStatus(e.target.value)}
						fullWidth
						sx={{
							mt: 2,
						}}
					>
						<MenuItem value="Payé">Payé</MenuItem>
						<MenuItem value="Reste à payer">Reste à payer</MenuItem>
					</Select>
					{paymentStatus === "Reste à payer" && (
						<TextField
							label="Montant restant"
							type="number"
							{...register("remainingAmount")}
							defaultValue={remainingAmount}
							onChange={(e) => setRemainingAmount(parseInt(e.target.value, 10))}
							fullWidth
							sx={{
								mt: 2,
							}}
						/>
					)}

					<Stack direction="row" spacing={2} sx={{ mt: 2 }}>
						<Button
							type="submit"
							text="Valider "
							sx={{ py: 1 }}
							color="secondary"
							startIcon={<ShoppingBasket />}
						/>
						<Button
							text="Vider "
							sx={{ py: 1 }}
							color="inherit"
							onClick={clearCart}
							startIcon={<ClearAll />}
						/>
					</Stack>
				</form>
			) : (
				<Typography component="h2" fontSize={22} textAlign="center" mt={5} color="GrayText">
					Votre panier est vide.
				</Typography>
			)}
		</>
	);
};

export default Panier;
