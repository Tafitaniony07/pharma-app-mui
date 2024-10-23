import { createTheme } from "@mui/material/styles";

const MyTheme = createTheme({
	components: {
		MuiTextField: {
			styleOverrides: {
				root: {
					"& .MuiInputLabel-root": {
						color: "#413864",
						fontFamily: "Exo2-Medium",
					},
					"& .MuiInputBase-input": {
						color: "#191919",
						fontFamily: "Exo2-Medium",
					},
					"& .MuiOutlinedInput-root": {
						"& fieldset": {
							borderColor: "#4d4373",
						},
						"&:hover fieldset": {
							borderColor: "#4d4373",
						},
					},
				},
			},
		},

		MuiTableCell: {
			styleOverrides: {
				head: {
					padding: "15px",
					background: "#f9fbff",
					color: "#045D5D",
					border: "none",
					fontFamily: "Exo2-Medium",
					fontSize: "16px",
				},
				body: {
					background: "#fff",
					padding: " 15px 12px",
					borderBottom: "1px solid #f9f9f9 !important",
				},
			},
		},
	},
	palette: {
		primary: {
			main: "#413864",
			light: "#4d4373",
		},
		secondary: {
			main: "#045D5D",
			light: "#045D5D58",
		},
	},
});
export default MyTheme;
