// Fonction pour tronquer le texte
export const TruncateText = (text, maxLength) => {
	if (text.length <= maxLength) {
		return text;
	}
	return text.substring(0, maxLength) + "...";
};
