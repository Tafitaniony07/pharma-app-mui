import { Box, Typography, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

import { Toaster, toast } from "sonner";
import Button from "./btn/MuiButton.jsx";
import { Save } from "@mui/icons-material";
const FormTrosa = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: "onTouched",
	});

	const items = [
		{ label: "Fournisseur", name: "fournisseur" },
		{ label: "Adresse", name: "adresse" },
		{ label: "Numero de téléphone", name: "phone_number]" },
		{ label: "Montant Restant", name: "montant_restant", type: "number" },
	];

	const OnSubmit = (data) => {
		console.log(data);
		toast.success("New Trosa");
	};
	return (
		<form onSubmit={handleSubmit(OnSubmit)}>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					gap: 2,
				}}
			>
				<Typography fontSize={22} color="primary" mb={1}>
					Ajouter une nouvelle Trosa
				</Typography>

				<Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
					{items.map((field, index) => (
						<Box key={index} sx={{ width: "45%", flexGrow: 1 }}>
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
								defaultValue={field.defaultValue}
								autoFocus={field.autoFocus}
								select={field.type === "select"}
							></TextField>
						</Box>
					))}
				</Box>
				<Box mt={2}>
					<Button type="submit" text="Enregistrer le Trosa" color="secondary" startIcon={<Save />} />
				</Box>
			</Box>
			<Toaster
				position="top-center"
				richColors
				// closeButton
				toastOptions={{
					style: {
						background: "#4d4373",
						color: "#fff",
					},
					className: "class",
				}}
			/>
		</form>
	);
};

export default FormTrosa;
