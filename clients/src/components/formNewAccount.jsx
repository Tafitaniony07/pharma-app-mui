import { AccountCircle } from "@mui/icons-material";
import { MenuItem, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Toaster, toast } from "sonner";
import { useForm } from "react-hook-form";
import logo from "../assets/logo.png";
import Button from "../components/btn/MuiButton.jsx";

const FormNewAccount = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: "onTouched",
	});
	const onSubmit = () => {
		let text = "Le compte a été créé avec succès !";
		toast.success(text);
	};
	const accountType = [
		{
			value: "vendeur",
			label: "Vendeur",
		},
		{
			value: "gestionnaire",
			label: "Gestionnaire",
		},
	];
	const items = [
		{
			name: "nom",
			label: "Nom",
		},
		{
			label: "Role Compte",
			name: "role",
			type: "select",
			options: accountType,
		},
		{
			name: "email",
			label: "Adresse Email",
			type: "email",
		},
		{
			name: "username",
			label: "Nom d'utilisateur",
		},
		{
			name: "password",
			label: "Mot de passe",
			type: "password",
		},

		{
			name: "confirm_password",
			label: "Confirmation",
			type: "password",
		},
	];
	return (
		<>
			<img src={logo} width={150} />
			<Box>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Typography variant="h5" align="left" color="primary" my={4}>
						Créer un nouveau compte
					</Typography>
					<Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
						{items.map((field, index) => (
							<Box key={index} sx={{ width: "25%", flexGrow: 1 }}>
								<TextField
									label={field.label}
									color="primary"
									fullWidth
									{...register(field.name, {
										required: "Veuillez remplir ce champ",
									})}
									error={!!errors[field.name]}
									helperText={errors[field.name]?.message}
									type={field.type}
									autoFocus={field.autoFocus}
									select={field.type === "select"}
								>
									{field.type === "select" &&
										field.options.map((option) => (
											<MenuItem key={option.value} value={option.value}>
												{option.label}
											</MenuItem>
										))}
								</TextField>
							</Box>
						))}
						<Box sx={{ width: "31.8%" }}>
							<Button
								type="submit"
								text="Créer maintenant"
								color="secondary"
								fullWidth
								startIcon={<AccountCircle />}
							/>
						</Box>
					</Box>
				</form>
			</Box>
			<Toaster
				position="top-center"
				richColors
				closeButton
				toastOptions={{
					style: {
						background: "secondary",
						color: "#fff",
					},
					className: "class",
				}}
			/>
		</>
	);
};

export default FormNewAccount;
