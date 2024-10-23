/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { LoadingButton as MuiLoadingButton } from "@mui/lab";

export default function LoadingButton(props) {
	const { size, color, variant, text, onClick, loading, ...other } = props;
	return (
		<MuiLoadingButton
			size={size || "medium"}
			onClick={onClick}
			color={color || "primary"}
			variant={variant || "contained"}
			loading={loading}
			disableElevation
			sx={{
				p: "12px 25px",
				textTransform: "capitalize",
				fontFamily: "Exo2-Medium",
				fontSize: "18px",
				backgroundColor: color === "error" ? "red" : undefined,
				color: color === "error" ? "white" : undefined,
			}}
			{...other}
		>
			{text}
		</MuiLoadingButton>
	);
}
