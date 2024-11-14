/* eslint-disable react/prop-types */
import { Save } from "@mui/icons-material";
import { Box, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import { UpdateTrosa } from "../../api/trosa.js";
import Button from "../btn/MuiButton.jsx";
import { useRefreshTrosa } from "../trosa/trosaItem.jsx";

const UpdateTrosaForm = ({ selectedItem }) => {
	const { setRefreshTrosa } = useRefreshTrosa();
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: "onTouched",
		defaultValues: {
			owner: selectedItem?.owner || "",
			adress: selectedItem?.adress || "",
			contact: selectedItem?.contact || "",
			montant_restant: selectedItem?.montant_restant || "",
			date: selectedItem?.date || "",
		},
	});
	const items = [
		{ label: "Fournisseur", name: "owner" },
		{ label: "Adresse", name: "adress" },
		{ label: "Numero de téléphone", name: "contact", type: "tel" },
		{ label: "Montant Restant", name: "montant_restant", type: "number" },
		{ label: "Date du trosa", name: "date", type: "date", autoFocus: true },
	];

	const handleUpdate = async (data) => {
		let newData = { ...data, pk: selectedItem.pk };
		console.log(newData);
		try {
			const response = await UpdateTrosa(newData);
			if (response.status === 200) {
				toast.success("Trosa mise a jour avec succès !");
				setRefreshTrosa();
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
		<form onSubmit={handleSubmit(handleUpdate)}>
			<Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}>
				{items.map((field, index) => (
					<Box key={index} sx={{ width: "45%", flexGrow: 1 }}>
						<Controller
							name={field.name}
							control={control}
							rules={{ required: "Veuillez remplir ce champ" }}
							render={({ field: { onChange, value } }) => (
								<TextField
									label={field.label}
									color="primary"
									fullWidth
									onChange={onChange}
									value={value}
									autoFocus={field.autoFocus}
									type={field.type}
									error={!!errors[field.name]}
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

export default UpdateTrosaForm;
