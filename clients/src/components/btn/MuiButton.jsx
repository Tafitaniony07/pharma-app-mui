/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Button as MuiButton } from "@mui/material";
export default function Button(props) {
	const { size, color, variant, text, onClick, ...other } = props;
	return (
		<MuiButton
			size={size || "medium"}
			onClick={onClick}
			color={color || "primary"}
			variant={variant || "contained"}
			disableElevation
			sx={{
				p: "12px 25px",
				textTransform: "capitalize",
				fontFamily: "Exo2-Medium",
				fontSize: "18px",
			}}
			{...other}
		>
			{text}
		</MuiButton>
	);
}
