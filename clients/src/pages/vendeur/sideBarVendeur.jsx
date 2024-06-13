import Box from "@mui/material/Box";
import List from "@mui/material/List";
// import CssBaseline from '@mui/material/CssBaseline';
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import { DateRange, History, Logout, Person, ProductionQuantityLimitsSharp } from "@mui/icons-material";

export default function SideBarVendeur() {
	const navigate = useNavigate();
	return (
		<Box sx={{ display: "flex" }}>
			{/* <CssBaseline /> */}
			<List sx={{ width: "100%", my: 3 }}>
				<ListItem
					disablePadding
					sx={{ display: "block" }}
					onClick={() => {
						navigate("/dashboard");
					}}
				>
					<ListItemButton
						sx={{
							minHeight: 48,
							justifyContent: open ? "initial" : "center",
							px: 5,
						}}
					>
						<ListItemIcon
							sx={{
								minWidth: 0,
								mr: open ? 3 : "auto",
								justifyContent: "center",
							}}
						>
							<DashboardIcon />
						</ListItemIcon>
						<ListItemText primary="DashBoard" sx={{ opacity: open ? 1 : 0 }} />
					</ListItemButton>
				</ListItem>
				
				
				<ListItem
					disablePadding
					sx={{ display: "block" }}
					onClick={() => {
						navigate("/expirydate");
					}}
				>
					<ListItemButton
						sx={{
							minHeight: 48,
							justifyContent: open ? "initial" : "center",
							mt: 2.5,
							px: 5,
						}}
					>
						<ListItemIcon
							sx={{
								minWidth: 0,
								mr: open ? 3 : "auto",
								justifyContent: "center",
							}}
						>
							<DateRange />
						</ListItemIcon>
						<ListItemText primary="Expiry Date" sx={{ opacity: open ? 1 : 0 }} />
					</ListItemButton>
				</ListItem>
				<ListItem
					disablePadding
					sx={{ display: "block" }}
					onClick={() => {
						navigate("/expirydate");
					}}
				>
					<ListItemButton
						sx={{
							minHeight: 48,
							justifyContent: open ? "initial" : "center",
							mt: 2.5,
							px: 5,
						}}
					>
						<ListItemIcon
							sx={{
								minWidth: 0,
								mr: open ? 3 : "auto",
								justifyContent: "center",
							}}
						>
							<ProductionQuantityLimitsSharp />
						</ListItemIcon>
						<ListItemText primary="Least Stock" sx={{ opacity: open ? 1 : 0 }} />
					</ListItemButton>
				</ListItem>
				<ListItem
					disablePadding
					sx={{ display: "block" }}
					onClick={() => {
						navigate("/transactions");
					}}
				>
					<ListItemButton
						sx={{
							minHeight: 48,
							justifyContent: open ? "initial" : "center",
							mt: 2.5,
							px: 5,
						}}
					>
						<ListItemIcon
							sx={{
								minWidth: 0,
								mr: open ? 3 : "auto",
								justifyContent: "center",
							}}
						>
							<History />
						</ListItemIcon>
						<ListItemText primary="Transactions" sx={{ opacity: open ? 1 : 0 }} />
					</ListItemButton>
				</ListItem>
				
				<ListItem
					disablePadding
					sx={{ display: "block" }}
					onClick={() => {
						navigate("/settings");
					}}
				>
					<ListItemButton
						sx={{
							minHeight: 48,
							justifyContent: open ? "initial" : "center",
							mt: 2.5,
							px: 5,
						}}
					>
						<ListItemIcon
							sx={{
								minWidth: 0,
								mr: open ? 3 : "auto",
								justifyContent: "center",
							}}
						>
							<Logout />
						</ListItemIcon>

						<ListItemText primary="Log Out" sx={{ opacity: open ? 1 : 0 }} />
					</ListItemButton>
				</ListItem>
			</List>
		</Box>
	);
}
