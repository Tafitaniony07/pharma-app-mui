/* eslint-disable react/prop-types */
import { Box, CircularProgress, Typography } from "@mui/material";

const LoadingSpinner = ({ loading, message = "Chargement..." }) => {
	if (!loading) return null;

	return (
		<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="50vh">
			<CircularProgress />
			<Typography variant="body1" sx={{ mt: 2 }}>
				{message}
			</Typography>
		</Box>
	);
};

export default LoadingSpinner;
