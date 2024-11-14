import { PasswordRounded, Visibility, VisibilityOff } from "@mui/icons-material";
import {
	FormControl,
	FormHelperText,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	Stack,
	Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import logo from "../../assets/logo.png";
import Button from "../../components/btn/MuiButton.jsx";

const UpdatePasswordForm = () => {
	// État pour contrôler la visibilité du mot de passe
	const [showPassword, setShowPassword] = useState(false);
	// Fonction pour basculer l'affichage du mot de passe
	const handleClickShowPassword = () => setShowPassword((show) => !show);

	// Configuration du formulaire avec React Hook Form
	const {
		register, // Pour enregistrer les champs du formulaire
		handleSubmit, // Pour gérer la soumission du formulaire
		formState: { errors }, // Pour gérer les erreurs de validation
		reset, // Pour réinitialiser le formulaire
		watch, // Pour surveiller les valeurs des champs
	} = useForm({
		mode: "onTouched", // Validation au focus perdu
	});

	// Surveillance de la valeur du champ password pour la validation
	const password = watch("password");

	// Gestion de la soumission du formulaire
	async function onSubmit(data) {
		console.log(data);
		reset(""); // Réinitialisation des champs
		toast.success("Mise à jour réussie de vos mots de passe");
	}

	// Empêche le comportement par défaut sur le mousedown du bouton de visibilité
	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};
	const Fields = [
		{ label: "Adresse Email", name: "email", type: "email" },
		{ label: "Mot de passe", name: "password", type: "text" },
		{ label: "Confirmer votre mot de passe", name: "confirmPassword", type: "password" },
	];

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Box>
				<img src={logo} width={120} alt="Logo" />
				<Typography component="h2" fontSize={20} color="inherit" mt={2} mb={1}>
					Réinitialisation de votre mot de passe
				</Typography>
				<Typography component="p" mb={2}>
					Vérifiez votre boîte mail pour obtenir le code de confirmation.
				</Typography>
				<Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={3}>
					{Fields.map((field) =>
						field.type === "text" || field.type === "email" ? (
							<Box sx={{ width: "100%", flexGrow: 1 }} key={field.name}>
								<TextField
									label={field.label}
									type={field.type}
									color="primary"
									fullWidth
									{...register(field.name, {
										required: "Veuillez remplir ce champ",
									})}
									error={!!errors[field.name]}
									helperText={errors[field.name]?.message}
								/>
							</Box>
						) : (
							<>
								<FormControl fullWidth variant="outlined" color="primary" error={!!errors[field.name]}>
									<InputLabel>{field.label}</InputLabel>
									<OutlinedInput
										type={showPassword ? "text" : "password"}
										{...register(field.name, {
											required: "Veuillez remplir ce champ",
											validate:
												field.name === "confirmPassword"
													? (value) =>
															value === password ||
															"Les mots de passe ne correspondent pas. Réessayez."
													: undefined,
										})}
										endAdornment={
											<InputAdornment position="end">
												<IconButton
													onClick={handleClickShowPassword}
													onMouseDown={handleMouseDownPassword}
													edge="end"
												>
													{showPassword ? <VisibilityOff /> : <Visibility />}
												</IconButton>
											</InputAdornment>
										}
										label={field.label}
									/>
									<FormHelperText>{errors[field.name]?.message}</FormHelperText>
								</FormControl>
							</>
						)
					)}
					<Button
						fullWidth
						sx={{ height: "55px" }}
						type="submit"
						text="Mettre à jour"
						startIcon={<PasswordRounded />}
					/>
				</Stack>

				<Toaster position="top-center" richColors closeButton />
			</Box>
		</form>
	);
};

export default UpdatePasswordForm;
