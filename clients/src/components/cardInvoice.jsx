import { Add, ArrowRightTwoTone, Check, ExpandLess } from "@mui/icons-material";
import {
	Box,
	Button,
	Collapse,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Stack,
	Typography,
} from "@mui/material";
import { useState } from "react";

const CardInvoice = () => {
	const listInvoice = [
		{
			id: 1,
			clientName: "John Doe",
			paymentDue: "12-08-24",
			total: 15000,
			type: "paid",
			bgcolor: "#045D5D",
			border: "none",
			color: "#fff",
		},
		{
			id: 2,
			clientName: "Jensen Walker",
			paymentDue: "02-11-24",
			total: 80000,
			type: "pending",
			bgcolor: "#fff",
			color: "orange",
			border: "1px solid orange",
		},
		{
			id: 3,
			clientName: "Mike Tyson",
			paymentDue: "05-09-24",
			total: 75000,
			type: "paid",
			bgcolor: "#045D5D",
			border: "none",
			color: "#fff",
		},
		{
			id: 4,
			clientName: "Paul Dayron",
			paymentDue: "12-03-23",
			total: 330000,
			type: "pending",
			bgcolor: "#fff",
			color: "orange",
			border: "1px solid orange",
		},
		{
			id: 5,
			clientName: "John Doe",
			paymentDue: "12-08-24",
			total: 15000,
			type: "paid",
			bgcolor: "#045D5D",
			color: "#fff",
			border: "none",
		},
		{
			id: 6,
			clientName: "Paul Dayron",
			paymentDue: "12-03-23",
			total: 330000,
			type: "pending",
			bgcolor: "#fff",
			color: "orange",
			border: "1px solid orange",
		},
	];
	const trosaOption = [
		{ text: "Nouveau Trosa", icon: <Add />, path: "/trosa" },
		{ text: "Listes de Trosa", icon: <Check />, path: "/list_trosa" },
	];
	const [open, setOpen] = useState(false);

	const handleClick = () => {
		setOpen(!open);
	};
	return (
		<>
			<Stack spacing={3} direction="row" alignItems="center" justifyContent="space-between">
				<Typography component="h2" sx={{ fontSize: "25px" }} color="secondary">
					All Transactions
					<Typography component="p" color="black">
						There are {listInvoice.length} total transactions
					</Typography>
				</Typography>
				<Box>
					<ListItemButton
						onClick={handleClick}
						sx={{
							minHeight: 48,
							justifyContent: "initial",
							px: 5,
						}}
					>
						<ListItemIcon>
							<ArrowRightTwoTone />
						</ListItemIcon>
						<ListItemText primary="Filtrer par" />
						{open ? <ExpandLess /> : <ExpandLess />}
					</ListItemButton>
				</Box>

				<Collapse in={open} timeout="auto" unmountOnExit>
					{trosaOption.map((item, index) => (
						<List disablePadding key={index}>
							<ListItemButton>
								<ListItemIcon
									sx={{
										minWidth: 0,
										mr: 3,
										justifyContent: "center",
									}}
								>
									{item.icon}
								</ListItemIcon>
								<ListItemText primary={item.text} />
							</ListItemButton>
						</List>
					))}
				</Collapse>
				<Button
					sx={{
						borderRadius: "50px",
						bgcolor: "#f9f9f9",
						textTransform: "capitalize",
						fontSize: "17px",
						p: "8px 25px",
					}}
					startIcon={<Add />}
				>
					Add New
				</Button>
			</Stack>
			{listInvoice.map((invoice) => (
				<Box
					display="flex"
					alignItems="center"
					justifyContent="space-between"
					key={invoice.id}
					p={2}
					sx={{
						background: "#045D5D08",
						borderRadius: 3,
						border: "1px solid transparent",
						transition: "transform 0.8s ease, border-color 0.8s ease",
						"&:hover": {
							transform: "scale(0.99)", // Légère mise à l'échelle
							borderColor: "secondary.main", // Couleur de la bordure lors du survol
							cursor: "pointer",
						},
					}}
					my={2}
				>
					<Stack spacing={3} direction="row" alignItems="center">
						<Typography component="h5" color="secondary">
							#
							<Typography component="span" color="black">
								{invoice.id}
							</Typography>
						</Typography>
						<Typography component="div" bgcolor="white" px={3} py={0.5} borderRadius={10}>
							Date {invoice.paymentDue}
						</Typography>
						<Typography component="h4">{invoice.clientName}</Typography>
					</Stack>
					<Stack spacing={5} direction="row" alignItems="center">
						<Typography component="h4" color="black">
							Total:
							<Typography component="span" color="secondary">
								{invoice.total} Ar
							</Typography>
						</Typography>
						<Button
							sx={{
								borderRadius: "50px",
								background: `${invoice.bgcolor}`,
								color: `${invoice.color}`,
								textTransform: "capitalize",
								px: 3,
								"&:hover": {
									background: "white",
									color: "secondary.main",
								},
							}}
							endIcon={<ArrowRightTwoTone />}
						>
							{invoice.type}
						</Button>
					</Stack>
				</Box>
			))}
		</>
	);
};

export default CardInvoice;
