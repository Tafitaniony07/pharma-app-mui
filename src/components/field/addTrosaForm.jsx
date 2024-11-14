import { Save } from "@mui/icons-material";
import { Box, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import { createTrosa } from "../../api/trosa.js";
import { getTodayDate } from "../../functions/getDateToday.js";
import Button from "../btn/MuiButton.jsx";
import { useRefreshTrosa } from "../trosa/trosaItem.jsx";

const AddTrosaForm = ({ closeDialog }) => {
	const { isRefresh, setRefreshTrosa } = useRefreshTrosa();
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: "onTouched",
	});

	const items = [
		{ label: "Fournisseur", name: "owner", autoFocus: true },
		{ label: "Adresse", name: "adress" },
		{ label: "Numero de téléphone", name: "contact", type: "tel" },
		{ label: "Montant Restant", name: "montant_restant", type: "number" },
		{
			label: "Date du trosa",
			name: "date",
			type: "date",
			autoFocus: true,
			defaultValue: getTodayDate(),
		},
	];

	const handleAdd = async (data) => {
		console.log(data);
		try {
			const response = await createTrosa(data);
			//   console.log(response.status);
			if (response.status === 201) {
				toast.success("Trosa ajoutée avec succès !");
				setRefreshTrosa();
				console.log("ISS", isRefresh);
				closeDialog();
			}
		} catch (err) {
			if (err.response?.status === 422) {
				toast.error("Erreur de validation des données");
			} else {
				toast.error("Erreur lors de l'ajout de la Trosa");
			}
		}
	};
	// console.log("name", watch("name"));
	return (
		<form onSubmit={handleSubmit(handleAdd)}>
			<Box></Box>
			<Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}>
				{items.map((item, index) => (
					<Box key={index} sx={{ width: "45%", flexGrow: 1 }}>
						<Controller
							name={item.name}
							control={control}
							rules={{ required: "Veuillez remplir ce champ" }}
							render={({ field: controllerField }) => (
								<TextField
									{...controllerField}
									label={item.label}
									color="primary"
									fullWidth
									type={item.type}
									error={!!errors[item.name]}
									autoFocus={item.autoFocus || false}
									defaultValue={item?.defaultValue}
									helperText={errors[item.name]?.message}
								/>
							)}
						/>
					</Box>
				))}
				<Box sx={{ width: "45%", flexGrow: 1 }}>
					<Button fullWidth type="submit" text="Enregistrer" color="secondary" startIcon={<Save />} />
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
