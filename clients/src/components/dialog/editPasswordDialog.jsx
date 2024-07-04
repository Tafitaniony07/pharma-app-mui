/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Dialog, DialogTitle, DialogContent, DialogActions, Fab } from "@mui/material";
import { Close } from "@mui/icons-material";
import { Toaster } from "sonner";

import LostPassword from "../../pages/Account/lostPassword.jsx";

const EditPasswordDialog = ({ open, onClose, selectedItem, onProductUpdated }) => {
	return (
		<>
			<Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
				{/* <DialogTitle>Modifier les détails du produit</DialogTitle> */}
				<DialogContent>
					<LostPassword />
				</DialogContent>
				<DialogActions sx={{ position: "absolute", right: "0", top: "0" }}>
					<Fab size="small" aria-label="view" onClick={onClose} sx={{ boxShadow: "0" }}>
						<Close />
					</Fab>
				</DialogActions>
			</Dialog>
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
		</>
	);
};

export default EditPasswordDialog;
