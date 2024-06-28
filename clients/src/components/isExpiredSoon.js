import { addMonths, isBefore } from "date-fns";

export const isExpiringSoon = (date_peremption) => {
	const today = new Date();
	const threeMonthsLater = addMonths(today, 3);
	return isBefore(date_peremption, threeMonthsLater);
};
