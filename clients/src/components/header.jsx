// eslint-disable-next-line no-unused-vars
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import logo from "../assets/logo.png";
import { Badge, Button, Stack, Typography } from "@mui/material";
import { DateRange, LogoutRounded, ProductionQuantityLimitsSharp } from "@mui/icons-material";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

function NavBar() {
	const navigate = useNavigate();
	const {logout} = useAuth()
	function handleClick() {
		logout()
		navigate("/");
	}
	return (
		<AppBar
			elevation={0}
			position="fixed"
			sx={{
				bgcolor: "white",
				p: 1,
			}}
		>
			<Container maxWidth="xl">
				<Toolbar sx={{ justifyContent: "space-between" }}>
					<img src={logo} width={120} />
					{/* <Stack spacing={6} direction="row">
						<Badge color="error" badgeContent={50}>
							<DateRange color="primary" />
						</Badge>
						<Badge color="error" badgeContent={100}>
							<ProductionQuantityLimitsSharp color="primary" />
						</Badge>
					</Stack> */}
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							gap: 8,
						}}
					>
						<Stack direction="row" spacing={2} alignItems="center">
							<Avatar
								alt="Jensen Walker"
								src="/"
								sx={{ p: 0, bgcolor: "primary.light", width: 35, height: 35 }}
							/>
							<Typography
								sx={{
									textTransform: "uppercase",
									fontFamily: "Exo2-Medium",
									color: "primary.main",
								}}
							>
								Jensen Walker
							</Typography>
						</Stack>

						<Button
							onClick={handleClick}
							endIcon={<LogoutRounded />}
							sx={{
								bgcolor: "primary.main",
								borderRadius: 50,
								color: "white",
								padding: "8px 25px",
								textTransform: "capitalize",
								"&:hover": {
									bgcolor: "primary.light",
								},
							}}
						>
							Deconnexion
						</Button>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
export default NavBar;
