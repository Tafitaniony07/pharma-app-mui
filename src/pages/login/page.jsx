/* eslint-disable no-unused-vars */
import { ArrowRightTwoTone, Visibility, VisibilityOff } from "@mui/icons-material";
import {
	Container,
	FormControl,
	FormHelperText,
	IconButton,
	InputAdornment,
	InputLabel,
	Link,
	OutlinedInput,
} from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import logo from "../../assets/logo.png";
import LoadingButton from "../../components/btn/MuiLoadingButton.jsx";
import LoaderMain from "../../components/loader.jsx";
import EditPasswordDialog from "../../components/modal/editPasswordDialog.jsx";
import useAuth from "../../hooks/useAuth.js";

const Login = () => {
	// État pour contrôler l'affichage du mot de passe (visible/masqué)
	const [showPassword, setShowPassword] = useState(false);
	// État pour gérer la réponse de la requête de connexion
	const [isResponse, setResponse] = useState(false);
	// État pour gérer le chargement du bouton de connexion
	const [loadingBtn, setLoadingBtn] = useState(false);
	// État pour gérer le chargement initial de la page
	const [loading, setLoading] = useState(true);
	// État pour contrôler l'ouverture de la modal de modification du mot de passe
	const [openEditPassword, setOpenEditPassword] = useState(false);

	// Fonction pour basculer l'affichage du mot de passe
	const handleClickShowPassword = () => setShowPassword((show) => !show);

	// Hook personnalisé pour la gestion de l'authentification
	const { login, account } = useAuth();

	// Configuration du formulaire avec React Hook Form
	const {
		register,
		handleSubmit,
		formState: { errors },
		resetField,
	} = useForm({
		mode: "onTouched", // Validation au focus perdu
	});

	// Gestion de la soumission du formulaire
	async function onSubmit(data) {
		setLoadingBtn(true);
		try {
			const response = await login(data.username, data.password);
			if (response.status === 200) {
				// Réinitialisation des champs après connexion réussie
				resetField("username");
				resetField("password");
				setResponse(true);
			}
		} catch (e) {
			if (e.response && e.response.status === 401) {
				setLoadingBtn(false);
				toast.warning("Identifiants incorrects. Veuillez réessayer.");
			} else {
				setLoadingBtn(false);
				toast.error("Erreur de connexion. Veuillez réessayer.");
			}
			console.error("Erreur de connexion:", e);
		} finally {
			setLoadingBtn(false);
		}
	}

	// Effet pour simuler un chargement initial
	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false);
		}, 1000);
		return () => clearTimeout(timer); // Nettoyage du timer
	}, []); // Dépendances vides pour n'exécuter qu'au montage

	// Affichage du loader pendant le chargement initial
	if (loading) return <LoaderMain />;

	// Gestionnaires pour la modal de modification du mot de passe
	const handleEditPassword = (event) => {
		event.preventDefault();
		setOpenEditPassword(true);
	};

	const handleCloseEditPassword = () => {
		setOpenEditPassword(false);
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};
	return (
		<Box className="login-bg">
			<Container
				maxWidth="xs"
				sx={{
					height: "100svh",
					paddingTop: 19,
				}}
			>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							flexDirection: "column",
							alignItems: "center",
							bgcolor: "#fff",
							p: 5,
							borderRadius: "5px",
							gap: 2,
						}}
					>
						<img src={logo} width={220} />
						<TextField
							label="Nom d'utilisateur"
							color="primary"
							fullWidth
							{...register("username", {
								required: "Veuillez remplir ce champ",
							})}
							error={!!errors.username}
							helperText={errors.username?.message}
							sx={{
								marginTop: "20px",
							}}
						/>
						<FormControl fullWidth variant="outlined" color="primary" error={!!errors.password}>
							<InputLabel
								sx={{
									color: "primary.light",
									fontFamily: "Exo2-Medium",
								}}
							>
								Mot de passe
							</InputLabel>
							<OutlinedInput
								color="primary"
								type={showPassword ? "text" : "password"}
								{...register("password", {
									required: "Veuillez remplir ce champ",
								})}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											edge="end"
										>
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								}
								label="Mot de passe"
							/>
							<FormHelperText>{errors.password?.message}</FormHelperText>
						</FormControl>
						<LoadingButton
							type="submit"
							text="Se connecter"
							fullWidth
							endIcon={<ArrowRightTwoTone />}
							loading={loadingBtn}
						/>

						<Link
							onClick={handleEditPassword}
							underline="always"
							color="primary"
							sx={{
								color: "primary",
								display: "block",
								alignSelf: "center",
								cursor: "pointer",
							}}
						>
							Mot de passe oublié ?
						</Link>
					</Box>
				</form>
				<EditPasswordDialog open={openEditPassword} onClose={handleCloseEditPassword} />
				<Toaster position="top-center" richColors closeButton />
			</Container>
		</Box>
	);
};

export default Login;
