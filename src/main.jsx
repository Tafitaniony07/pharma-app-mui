import { ThemeProvider } from "@mui/material";
// import React from "react";
import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/calendar-custom.css";
import MyTheme from "./components/theme/Theme.jsx";
import "./index.css";
import Router from "./router/Router.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ThemeProvider theme={MyTheme}>
			<Router />
		</ThemeProvider>
	</React.StrictMode>
);
