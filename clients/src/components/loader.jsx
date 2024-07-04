import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useTokenStore } from "../tokenStore";
import { useAccountStore } from "../accountStore";
import useAuth from "../hooks/useAuth";

export default function LoaderMain({ account }) {
	const [open, setOpen] = React.useState(true);
	const { access } = useTokenStore();
	const { setAccount } = useAccountStore();
	return (
		<div>
			<Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
				<CircularProgress color="primary" />
			</Backdrop>
		</div>
	);
}
