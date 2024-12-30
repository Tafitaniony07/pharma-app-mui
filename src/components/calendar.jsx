import Calendar from "react-calendar";

const CalendarView = () => {
	const today = new Date();
	return (
		<Calendar
			locale="fr-FR"
			defaultActiveStartDate={today}
			tileClassName={({ date }) => {
				// Applique une classe CSS si la date correspond à aujourd'hui
				if (date.toDateString() === today.toDateString()) {
					return "active-date";
				}
			}}
		/>
	);
};

export default CalendarView;
