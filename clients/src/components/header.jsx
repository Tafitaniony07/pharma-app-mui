// eslint-disable-next-line no-unused-vars
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import logo from "../assets/logo.png";
import { Button, Stack, Typography } from "@mui/material";
import { LogoutRounded } from "@mui/icons-material";
import useAuth from "../hooks/useAuth";

function NavBar() {
	const { logout } = useAuth();
	function handleClick() {
		logout();
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
