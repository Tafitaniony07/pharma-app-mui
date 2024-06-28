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
	Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import { useForm } from "react-hook-form";
import Button from "../../components/btn/MuiButton.jsx";
import { Toaster, toast } from "sonner";
import useAuth from "../../hooks/useAuth.js";
import LoaderMain from "../../components/loader.jsx";

const Login = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [isResponse, setResponse] = useState(false);
	const navigate = useNavigate();
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const { login, account } = useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors },
		resetField,
	} = useForm({
		mode: "onTouched",
	});
	const connect = (account) => {
		if (account.account_type === "gestionnaires") navigate("/admin");
		else navigate("/vendeur");
	};
	useEffect(() => {
		if (isResponse) {
			connect(account);
		}
	}, [account]);
	async function onSubmit(data) {
		try {
			console.log(data.username);
			const response = await login(data.username, data.password);
			console.log(response);
			if (response.status === 200) {
				resetField("username");
				resetField("password");
				setResponse(true);
			}
		} catch (e) {
			if (e.response && e.response.status === 401) {
				toast.warning("Informations d'identification invalides");
			} else {
				toast.error("Une erreur inattendue s'est produite");
			}
			console.error(e);
		}
	}

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	return (
		<>
			{account == null ? (
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
										label=" Mot de passe"
									/>
									<FormHelperText>{errors.password?.message}</FormHelperText>
								</FormControl>
								<Button type="submit" text="Se connecter" fullWidth endIcon={<ArrowRightTwoTone />} />

								<Link
									onClick={() => navigate("/update_password")}
									underline="always"
									color="primary"
									sx={{
										color: "primary",
										display: "block",
										alignSelf: "center",
										cursor: "pointer",
									}}
								>
									Mots de passe oublié ?
								</Link>
							</Box>
						</form>
						<Toaster position="top-center" richColors closeButton />
					</Container>
				</Box>
			) : (
				<LoaderMain account={account} />
			)}
		</>
	);
};

export default Login;
