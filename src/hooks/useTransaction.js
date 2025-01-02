import { useContext, useState } from "react";
import { toast } from "sonner";
import { SellProduct } from "../api/product";
import { useListMedicaments } from "../contexts/useListMedicaments";
import { TransactionContext } from "../pages/vendeur/transaction_context/page";

export const useTransaction = (addCart, clearCart) => {
	const [clientName, setClientName] = useState("");
	const [paymentStatus, setPaymentStatus] = useState("Payé");
	const [remainingAmount, setRemainingAmount] = useState(0);
	const [currentTransaction, setCurrentTransaction] = useState(null);
	const { setTransactions } = useContext(TransactionContext);
	const { refreshMedicaments } = useListMedicaments();
	const [dialogOpen, setDialogOpen] = useState(false);

	const saveTransaction = async () => {
		const totalAmount = addCart.reduce((total, item) => total + item.price, 0);

		const newTransaction = {
			date: new Date(),
			clientName,
			paymentStatus,
			remainingAmount,
			totalPaid: paymentStatus === "Payé" ? totalAmount : totalAmount - remainingAmount,
			items: [...addCart],
		};

		const datas = prepareTransactionData(newTransaction);

		try {
			const res = await SellProduct(datas);
			setCurrentTransaction(res.data);

			resetTransactionStates();
			setDialogOpen(true);
			await refreshMedicaments();
			setTransactions((prev) => [...prev, newTransaction]);

			// toast.success("Transaction enregistrée avec succès");
		} catch (error) {
			console.error("Erreur lors de la sauvegarde de la transaction :", error);
			toast.error("Une erreur est survenue lors de la transaction. Veuillez réessayer.");
		}
	};

	const prepareTransactionData = (transaction) => {
		const itemsData = transaction.items.map((item) => ({
			product_id: item.pk,
			qte_uniter_transaction: item.quantityDetails,
			qte_gros_transaction: item.quantityBulk,
		}));

		return [...itemsData, { prix_restant: transaction.remainingAmount }, { client: transaction.clientName }];
	};

	const resetTransactionStates = () => {
		clearCart();
		setClientName("");
		setPaymentStatus("Payé");
		setRemainingAmount(0);
	};

	return {
		clientName,
		setClientName,
		paymentStatus,
		setPaymentStatus,
		remainingAmount,
		setRemainingAmount,
		currentTransaction,
		dialogOpen,
		setDialogOpen,
		saveTransaction,
	};
};
