/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { Dialog, DialogTitle, DialogContent, DialogActions, Fab } from "@mui/material";
import { Close } from "@mui/icons-material";
import UpdateTrosaForm from "../field/updateTrosaForm.jsx";
const EditTrosaDialog = ({ open, onClose, selectedItem }) => {
	return (
		<Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
			<DialogTitle sx={{ borderBottom: "2px solid #f9f9f9" }}>Edition d'une Trosa</DialogTitle>
			<DialogContent sx={{ my: "10px" }}>
				<UpdateTrosaForm selectedItem={selectedItem} />
			</DialogContent>
			<DialogActions sx={{ position: "absolute", right: "0", top: "0" }}>
				<Fab size="small" aria-label="view" onClick={onClose} sx={{ boxShadow: "0" }}>
					<Close />
				</Fab>
			</DialogActions>
		</Dialog>
	);
};

export default EditTrosaDialog;
