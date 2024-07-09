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
import { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import useAuth from "../../hooks/useAuth.js";
import LoadingButton from "../../components/btn/MuiLoadingButton.jsx";
import LoaderMain from "../../components/loader.jsx";
import EditPasswordDialog from "../../components/dialog/editPasswordDialog.jsx";

const Login = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [isResponse, setResponse] = useState(false);
	const [loadingBtn, setLoadingBtn] = useState(false);
	const [Loading, SetLoadign] = useState(true);
	const [openEditPassword, setOpenEditPassword] = useState(false);
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

	async function onSubmit(data) {
		setLoadingBtn(true);
		try {
			const response = await login(data.username, data.password);
			if (response.status === 200) {
				resetField("username");
				resetField("password");
				setResponse(true);
			}
		} catch (e) {
			if (e.response && e.response.status === 401) {
				setLoadingBtn(false);
				toast.warning("Informations d'identification invalides");
			} else {
				setLoadingBtn(false);
				toast.error("Une erreur inattendue s'est produite");
			}
			console.error(e);
		} finally {
			setLoadingBtn(false);
		}
	}
	useEffect(() => {
		setTimeout(() => {
			SetLoadign(false);
		}, 1000);
	});
	if (Loading) return <LoaderMain />;
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
