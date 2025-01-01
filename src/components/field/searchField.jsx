import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";
import PropTypes from "prop-types";

const SearchField = ({ searchText, searchChange, placeholder = "Nom du client..." }) => (
	<TextField
		placeholder={placeholder}
		fullWidth
		sx={{
			"& .MuiOutlinedInput-root": {
				borderRadius: "50px",
			},
		}}
		size="medium"
		value={searchText}
		onChange={searchChange}
		InputProps={{
			startAdornment: (
				<InputAdornment position="start">
					<SearchIcon />
				</InputAdornment>
			),
		}}
	/>
);
SearchField.propTypes = {
	searchText: PropTypes.string.isRequired,
	searchChange: PropTypes.func.isRequired,
	placeholder: PropTypes.string,
};

export default SearchField;
