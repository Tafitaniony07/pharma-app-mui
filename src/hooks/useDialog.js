import { useState } from "react";

const useDialog = () => {
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	const [openPaymentDialog, setOpenPaymentDialog] = useState(false);

	const openDelete = () => setOpenDeleteDialog(true);
	const closeDelete = () => setOpenDeleteDialog(false);

	const openPayment = () => setOpenPaymentDialog(true);
	const closePayment = () => setOpenPaymentDialog(false);

	return {
		openDeleteDialog,
		openPaymentDialog,
		openDelete,
		closeDelete,
		openPayment,
		closePayment,
	};
};

export default useDialog;
