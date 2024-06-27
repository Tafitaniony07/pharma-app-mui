import { Box, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { Toaster, toast } from "sonner";
import Button from "./btn/MuiButton.jsx";
import { Save } from "@mui/icons-material";
import axios from "../api/axios.jsx";
import { getTodayDate } from "./getDateToday.js";

const AddTrosaForm = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: "onTouched",
	});

	const items = [
		{ label: "Fournisseur", name: "fournisseur" },
		{ label: "Adresse", name: "adresse" },
		{ label: "Numero de téléphone", name: "phone_number", type: "tel" },
		{ label: "Montant Restant", name: "montant_restant", type: "number" },
		{
			label: "Date du trosa",
			name: "date_trosa",
			type: "date",
			autoFocus: true,
			defaultValue: getTodayDate(),
		},
	];

	const handleAdd = async (data) => {
		console.log(data);
		try {
			const response = await axios.post("/addtrosa", {
				fournisseur: [data.fournisseur, data.adresse, data.contact],
				montant_restant: data.montant_restant,
			});

			if (response.status === 200) {
				toast.success("Trosa ajoutée avec succès !");
			}
		} catch (err) {
			if (err.response?.status === 422) {
				toast.error("Erreur de validation des données");
			} else {
				toast.error("Erreur lors de l'ajout de la Trosa");
			}
		}
	};

	return (
		<form onSubmit={handleSubmit(handleAdd)}>
			<Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}>
				{items.map((field, index) => (
					<Box key={index} sx={{ width: "45%", flexGrow: 1 }}>
						<Controller
							name={field.name}
							control={control}
							rules={{ required: "Veuillez remplir ce champ" }}
							render={({ field }) => (
								<TextField
									{...field}
									label={field.label}
									color="primary"
									fullWidth
									type={field.type}
									error={!!errors[field.name]}
									defaultValue={field.defaultValue}
									autoFocus={field.autoFocus}
									helperText={errors[field.name]?.message}
								/>
							)}
						/>
					</Box>
				))}
				<Box sx={{ width: "45%", flexGrow: 1 }}>
					<Button
						fullWidth
						type="submit"
						text="Enregistrer le Trosa"
						color="secondary"
						startIcon={<Save />}
					/>
				</Box>
			</Box>

			<Toaster
				position="top-center"
				richColors
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

export default AddTrosaForm;
