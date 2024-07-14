export const formatDate = (date) => {
	if (!date) return "";
	const d = new Date(date);
	let month = "" + (d.getMonth() + 1);
	let day = "" + d.getDate();
	const year = d.getFullYear();

	if (month.length < 2) month = "0" + month;
	if (day.length < 2) day = "0" + day;
	console.log([day, month, year].join("-"));
	return [day, month, year].join("/");
};
