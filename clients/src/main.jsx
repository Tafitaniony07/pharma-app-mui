import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material";
import "./index.css";
import MyTheme from "./components/theme/Theme.jsx";
import Router from "./router/Router.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ThemeProvider theme={MyTheme}>
			<Router />
		</ThemeProvider>
	</React.StrictMode>
);
