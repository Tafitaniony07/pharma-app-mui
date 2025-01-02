import { useState } from "react";
import { toast } from "sonner";

export const useCart = () => {
	const [addCart, setAddCart] = useState([]);
	const [loadingState, setLoadingState] = useState({});
	const [quantities, setQuantities] = useState({});

	// Ajout au panier
	const addToCart = (item) => {
		const detailQty = quantities[item.detail_product.designation]?.detail || 0;
		const grosQty = quantities[item.detail_product.designation]?.gros || 0;

		const quantityDetails = detailQty > 0 ? detailQty : 0;
		const quantityBulk = grosQty > 0 ? grosQty : 0;

		const itemPriceDetails = item.prix_uniter * quantityDetails;
		const itemPriceBulk = item.prix_gros * quantityBulk;
		const totalItemPrice = itemPriceDetails + itemPriceBulk;

		const cartItem = {
			...item,
			price: totalItemPrice,
			quantityDetails,
			quantityBulk,
		};

		if (addCart.some((cartItem) => cartItem.pk === item.pk)) {
			toast.warning("L'article est déjà ajouté au panier");
			return;
		}

		setLoadingState({ ...loadingState, [item.pk]: true });
		setTimeout(() => {
			setAddCart((prev) => [...prev, cartItem]);
			setLoadingState((prev) => ({ ...prev, [item.pk]: false }));
		}, 200);
	};

	// Mise à jour des quantités dans le panier
	const updateCartQuantity = (pk, type, quantity) => {
		setAddCart((prevCart) =>
			prevCart.map((item) => {
				if (item.pk === pk) {
					const newQuantityDetails = type === "details" ? quantity : item.quantityDetails;
					const newQuantityBulk = type === "bulk" ? quantity : item.quantityBulk;

					const newPriceDetails = item.prix_uniter * newQuantityDetails;
					const newPriceBulk = item.prix_gros * newQuantityBulk;
					const newTotalPrice = newPriceDetails + newPriceBulk;

					return {
						...item,
						quantityDetails: newQuantityDetails,
						quantityBulk: newQuantityBulk,
						price: newTotalPrice,
					};
				}
				return item;
			})
		);
	};

	// Suppression d'un article du panier
	const removeFromCart = (pk) => {
		setAddCart((prevCart) => prevCart.filter((item) => item.pk !== pk));
		toast.warning("L'article a été retiré du panier");
	};

	// Vider le panier
	const clearCart = () => {
		setAddCart([]);
	};

	// Calcul du prix total
	const calculateTotalPrice = () => {
		return addCart.reduce((total, item) => total + item.price, 0);
	};

	return {
		addCart,
		loadingState,
		quantities,
		setQuantities,
		addToCart,
		setAddCart,
		updateCartQuantity,
		removeFromCart,
		clearCart,
		calculateTotalPrice,
	};
};
