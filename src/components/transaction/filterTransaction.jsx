import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Button, ListItemText, Menu, MenuItem } from "@mui/material";
import PropTypes from "prop-types";

const filters = [
	{ label: "Aujourd'hui", value: "today" },
	{ label: "Cette semaine", value: "thisWeek" },
	{ label: "Ce mois-ci", value: "thisMonth" },
	{ label: "Payé", value: "paye" },
	{ label: "Non payé", value: "nonPaye" },
	{ label: "Tout", value: "" },
];

const FilterTransactions = ({ anchorEl, onClick, onClose, filterChange, activeFilter }) => (
	<>
		<Button
			aria-controls="filter-menu"
			aria-haspopup="true"
			variant="outlined"
			onClick={onClick}
			sx={{
				minHeight: 48,
				justifyContent: "initial",
				color: "secondary.main",
				px: 5,
				borderRadius: "50px",
			}}
			endIcon={anchorEl ? <ExpandLess /> : <ExpandMore />}
		>
			<ListItemText primary="Filtrer par" sx={{ textTransform: "capitalize" }} />
		</Button>
		<Menu
			id="filter-menu"
			anchorEl={anchorEl}
			keepMounted
			open={Boolean(anchorEl)}
			onClose={onClose}
			sx={{
				"& .MuiPaper-root": {
					boxShadow: "none",
					width: "150px",
				},
			}}
		>
			{filters.map((filter) => (
				<MenuItem
					key={filter.value}
					onClick={() => filterChange(filter.value)}
					sx={{
						backgroundColor: activeFilter === filter.value ? "rgba(0, 128, 0, 0.15)" : "inherit",
						"&:hover": {
							backgroundColor: "rgba(0, 128, 0, 0.25)",
						},
					}}
				>
					<ListItemText primary={filter.label} />
				</MenuItem>
			))}
		</Menu>
	</>
);
FilterTransactions.propTypes = {
	anchorEl: PropTypes.object,
	onClick: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
	filterChange: PropTypes.func.isRequired,
	activeFilter: PropTypes.string.isRequired,
};

export default FilterTransactions;
