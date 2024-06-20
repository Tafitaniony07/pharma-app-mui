import { ArrowRightTwoTone } from "@mui/icons-material";
import { Button, Container, Link, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Toaster, toast } from "sonner";

const LostPassword = () => {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		mode: "onTouched",
	});

	const onSubmit = (data) => {
		let text = data.identifiant + "__" + data.password + "__" + data.name;
		toast.success(text);
	};

	return (
		<>
			<Container
				maxWidth="xs"
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "97vh",
				}}
			>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							flexDirection: "column",
							alignItems: "center",
							width: "350px",
							bgcolor: "#fff",
							p: 5,
							borderRadius: "5px",
							gap: 2,
						}}
					>
						<Typography
							sx={{
								fontFamily: "Exo2-Medium",
								color: "primary.test",
								fontSize: "30px",
								mb: 1,
							}}
						>
							Lost Password ?
						</Typography>

						<TextField
							label="Identifiant"
							color="second"
							fullWidth
							{...register("identifiant", {
								required: "Veuillez remplir ce champ",
							})}
							error={!!errors.identifiant}
							helperText={errors.identifiant?.message}
							sx={{
								marginTop: "20px",
								"& .MuiInputLabel-root": {
									color: "primary.test",
									fontFamily: "Exo2-Medium",
								},
								"& .MuiInputBase-input": {
									color: "#191919",
									fontFamily: "Exo2-Medium",
								},
								"& .MuiOutlinedInput-root": {
									// Target the root element of the outlined input
									"& fieldset": {
										// Target the fieldset within the root element
										borderColor: "primary",
									},
									"&:hover fieldset": {
										// On hover, change the border color
										borderColor: "primary.test",
									},
								},
							}}
						/>

						<TextField
							label="Nouveau mot de passe"
							color="second"
							fullWidth
							{...register("newpassword", {
								required: "Veuillez remplir ce champ",
							})}
							error={!!errors.newpassword}
							helperText={errors.newpassword?.message}
							sx={{
								"& .MuiInputLabel-root": {
									color: "primary.test",
									fontFamily: "Exo2-Medium",
								},
								"& .MuiInputBase-input": {
									color: "#191919",
									fontFamily: "Exo2-Medium",
								},
								"& .MuiOutlinedInput-root": {
									// Target the root element of the outlined input
									"& fieldset": {
										// Target the fieldset within the root element
										borderColor: "primary",
									},
									"&:hover fieldset": {
										// On hover, change the border color
										borderColor: "primary.test",
									},
								},
							}}
						/>
						<Toaster
							position="top-center"
							richColors
							closeButton
							toastOptions={{
								style: {
									background: "#4d4373",
									color: "#fff",
								},
								className: "class",
							}}
						/>
						<Button
							type="submit"
							sx={{
								p: 1.5,
								textTransform: "capitalize",
								backgroundColor: "primary.test",
								fontFamily: "Exo2-Medium",
								fontSize: "18px",
								color: "#fff",
								"&:hover": {
									backgroundColor: "second.main",
								},
								"&:active": {
									backgroundColor: "second.main",
									borderColor: "second.main",
								},
							}}
							size="medium"
							variant="contained"
							disableElevation
							fullWidth
							endIcon={<ArrowRightTwoTone />}
						>
							Modifier
						</Button>
						<Link
							href="/login"
							underline="always"
							sx={{
								color: "primary.test",
								display: "block",
								alignSelf: "center",
							}}
						>
							Se connecter maintenant
						</Link>
					</Box>
				</form>

				<DevTool control={control} />
			</Container>
		</>
	);
};

export default LostPassword;
