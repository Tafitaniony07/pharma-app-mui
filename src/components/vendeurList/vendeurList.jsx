import { Checkbox, FormControlLabel, Stack } from "@mui/material";
import PropTypes from "prop-types";

const VendeurList = ({ data, selected, vendeurCheckboxChange }) => (
	<Stack direction="row" alignItems="center" pb={2} pl={1}>
		{data.map((vendeur) => (
			<FormControlLabel
				key={vendeur.username}
				sx={{
					background: "#fcfdfd",
					borderRadius: 5,
					pr: "15px",
					"&:hover": {
						background: "#89998111",
					},
				}}
				control={
					<Checkbox
						size="small"
						checked={selected[vendeur.username] || false}
						onChange={() => vendeurCheckboxChange(vendeur.username)}
						color="secondary"
					/>
				}
				label={vendeur.username}
			/>
		))}
	</Stack>
);
VendeurList.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			username: PropTypes.string.isRequired,
		})
	).isRequired,
	selected: PropTypes.object.isRequired,
	vendeurCheckboxChange: PropTypes.func.isRequired,
};

export default VendeurList;
