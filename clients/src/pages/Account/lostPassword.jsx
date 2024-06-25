import { Login, Save, Visibility, VisibilityOff } from "@mui/icons-material";
import {
	Container,
	FormControl,
	FormHelperText,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	Stack,
	Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import logo from "../../assets/logo.png";
import { useForm } from "react-hook-form";
import Button from "../../components/btn/MuiButton.jsx";
import { Toaster, toast } from "sonner";

const LostPassword = () => {
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();
	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		watch,
	} = useForm({
		mode: "onTouched",
	});

	const password = watch("password");
	async function onSubmit(data) {
		console.log(data);
		reset("");
		toast.success("Votre modification a bien reussi");
	}
	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};
	const Fields = [
		{ label: "Nom d'utilisateur", name: "username", type: "text" },
		{ label: "Adresse Email", name: "email", type: "email" },
		{ label: "Mot de passe", name: "password", type: "text" },
		{ label: "Confirmer votre mot de passe", name: "confirmPassword", type: "password" },
	];

	return (
		<Box className="login-bg">
			<Container
				maxWidth="md"
				sx={{
					height: "100svh",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "column",
				}}
			>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Box
						sx={{
							bgcolor: "#fff",
							p: 7,
							borderRadius: "5px",
						}}
					>
						<img src={logo} width={100} alt="Logo" />
						<Typography component="h2" fontSize={22} color="inherit" mt={2} mb={4}>
							Mise a jour de mots de passe !
						</Typography>
						<Stack
							direction="row"
							justifyContent="space-between"
							alignItems="center"
							flexWrap="wrap"
							gap={2}
						>
							{Fields.map((field) =>
								field.type === "text" || field.type === "email" ? (
									<Box sx={{ width: "40%", flexGrow: 1 }} key={field.name}>
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
									<Box sx={{ width: "40%", flexGrow: 1 }} key={field.name}>
										<FormControl
											fullWidth
											variant="outlined"
											color="primary"
											error={!!errors[field.name]}
										>
											<InputLabel>{field.label}</InputLabel>
											<OutlinedInput
												type={showPassword ? "text" : "password"}
												{...register(field.name, {
													required: "Veuillez remplir ce champ",
													validate:
														field.name === "confirmPassword"
															? (value) =>
																	value === password ||
																	"Les mots de passe ne correspondent pas"
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
									</Box>
								)
							)}
						</Stack>
						<Stack direction="row" justifyContent="space-between" flexWrap="wrap" gap={2} mt={2}>
							<Button
								sx={{ width: "45%", flexGrow: 1, height: "55px" }}
								type="submit"
								text="Modifier"
								startIcon={<Save />}
							/>
							<Button
								sx={{ width: "45%", flexGrow: 1, height: "55px" }}
								color="inherit"
								text="Se connecter maintenant"
								startIcon={<Login />}
								onClick={() => navigate("/")}
							/>
						</Stack>
						<Toaster position="top-center" richColors closeButton />
					</Box>
				</form>
			</Container>
		</Box>
	);
};

export default LostPassword;
