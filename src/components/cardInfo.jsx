/* eslint-disable react/prop-types */
import { ArrowOutward, DataSaverOff } from "@mui/icons-material";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";

const CardInfo = ({ title, count, type, path }) => {
	const navigate = useNavigate();
	return (
		<Box
			bgcolor="#fff"
			color="#171717"
			flex={1}
			p={3}
			borderRadius={5}
			sx={{ width: "28%" }}
			onClick={() => navigate(path)}
		>
			<Typography fontWeight={500} fontSize={18}>
				{title}
			</Typography>
			<Box display="flex" justifyContent="space-between" alignItems="center" pt={1}>
				<Stack direction="row" alignItems="center">
					<DataSaverOff sx={{ color: "secondary.main" }} />
					<Typography ml={1} color="secondary.main" fontSize={20} fontWeight={500}>
						{count}
					</Typography>
					<Typography ml={1}>{type}</Typography>
				</Stack>

				<Button
					onClick={() => navigate(path)}
					sx={{ background: "#89948133", borderRadius: "50px" }}
					size="small"
				>
					<Chip
						onC
						sx={{
							".MuiChip-icon": { fontSize: 18 },
							bgcolor: "#89948133",
							borderColor: "transparent",
							fontSize: "15px",
							padding: "2px",
							textTransform: "capitalize",
						}}
						size="medium"
						variant="outlined"
						icon={<ArrowOutward color="#181818" />}
						label=" Détail"
					/>
				</Button>
			</Box>
		</Box>
	);
};

export default CardInfo;
