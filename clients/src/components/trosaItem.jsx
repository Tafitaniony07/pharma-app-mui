import {
  Add,
  ArrowRightTwoTone,
  Delete,
  Edit,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import {
  Box,
  Button,
  ListItemText,
  Stack,
  Typography,
  Menu,
  MenuItem,
  Fab,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import AddTrosaDialog from "./dialog/addTrosaDialog.jsx";
import EditTrosaDialog from "./dialog/editTrosaDialog.jsx";
import { Toaster, toast } from "sonner";
import DeleteDialog from "./dialog/deleteDialog.jsx";
import { ListTrosa, DeleteTrosa } from "../api/trosa.js";
import { formatDate } from "./formatDate.js";
import { create } from "zustand";
import useAuth from "../hooks/useAuth.js";

export const useRefreshTrosa = create((set) => ({
	isRefresh: false,
	setRefreshTrosa : () => set((state) => ({ isRefresh: !state.isRefresh}))
}))

const TrosaItem = () => {
  const {account} = useAuth()
  const { isRefresh } = useRefreshTrosa();
  const [open, setOpen] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const status = {
    payer: {
      bgcolor: "#045D5D",
      border: "none",
      color: "#fff",
    },
    noPayer: {
      bgcolor: "rgba(0, 128, 0, 0.105) ",
      color: "secondary.main",
      border: "1px solid rgba(0, 128, 0, 0.145)",
    },
  };
  const [listTrosa, setListTrosa] = useState([]);
  const [filterState, setFilterState] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  useEffect(() => {
    try {
      const fetch = async () => {
        const res = await ListTrosa();
        console.log(res.data , isRefresh);
        setListTrosa(res.data);
      };
      fetch();
    } catch (error) {
      console.log("Trosa");
      throw error;
    }
  }, [isRefresh]);
  
  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
    setOpenEditDialog(false);
    setOpenDeleteDialog(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleEditTrosa = (item) => {
    setSelectedItem(item);
    console.log(item);
    setOpenEditDialog(true);
  };
  const handleDeleteTrosa = (item) => {
    setSelectedItem(item);
    setOpenDeleteDialog(true);
  };
  const deleteTrosa = async(item) => {
	try {
		const res = await DeleteTrosa(item.pk)
		console.log(res.status);
	} catch (error) {
		throw error
	}
    setListTrosa((prevList) =>
      prevList.filter((trosa) => trosa.pk !== item.pk)
    );
    handleCloseDialog();
    toast.success("La trosa a été supprimée avec succès !");
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFilterChange = (state) => {
    setFilterState(state);
    handleClose();
  };

  // const filteredItem = filterState ? listTrosa.filter((item) => item.state === filterState) : listTrosa;
  const filteredItem = useCallback(() => {
    let retour = [];
    switch (filterState) {
      case "payé":
        retour = listTrosa.filter(
          (item) => parseInt(item.montant_restant) === 0
        );
        break;
      case "non payé":
        retour = listTrosa.filter(
          (item) => parseInt(item.montant_restant) !== 0
        );
        break;
      default:
        retour = listTrosa;
        break;
    }
    return retour;
  }, [filterState, listTrosa]);

  return (
    <>
      <Stack
        spacing={3}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography component="h2" sx={{ fontSize: "25px" }} color="secondary">
          Tous les Trosa
          <Typography component="p" color="black">
            Il y a {filteredItem().length} total de trosa
          </Typography>
        </Typography>
        <Box>
          <Button
            aria-controls="filter-menu"
            aria-haspopup="true"
            variant="outlined"
            onClick={handleClick}
            sx={{
              minHeight: 48,
              justifyContent: "initial",
              color: "secondary.main",
              px: 5,
              borderRadius: "50px",
            }}
            endIcon={anchorEl ? <ExpandLess /> : <ExpandMore />}
          >
            <ListItemText
              primary="Filtrer par"
              sx={{ textTransform: "capitalize" }}
            />
          </Button>
          <Menu
            id="filter-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            sx={{
              "& .MuiPaper-root": {
                boxShadow: "none",
              },
            }}
          >
            <MenuItem
              sx={{ width: 175 }}
              onClick={() => handleFilterChange("payé")}
            >
              Payé
            </MenuItem>
            <MenuItem onClick={() => handleFilterChange("non payé")}>
              non payé
            </MenuItem>
            <MenuItem onClick={() => handleFilterChange("")}>Tout</MenuItem>
          </Menu>
        </Box>
        <Button
          onClick={handleOpenDialog}
          sx={{
            borderRadius: "50px",
            bgcolor: "#f9f9f9",
            textTransform: "capitalize",
            fontSize: "17px",
            p: "8px 25px",
          }}
          startIcon={<Add />}
        >
          Ajouter un nouveau trosa
        </Button>
      </Stack>
      {filteredItem().map((item, i) => (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          key={i}
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
                {i + 1}
              </Typography>
            </Typography>
            <Typography
              component="div"
              bgcolor="white"
              px={3}
              py={0.5}
              borderRadius={10}
            >
              Date {formatDate(item.date)}
            </Typography>
            <Typography component="h4">{item.owner}</Typography>
          </Stack>
          <Stack spacing={5} direction="row" alignItems="center">
            <Typography component="h4" color="black">
              {parseInt(item.montant_restant) === 0
                ? "Total"
                : "Montant Restant"}
              :
              <Typography component="span" color="secondary">
                {parseInt(item.montant_restant) === 0
                  ? item.montant
                  : item.montant_restant}
                Ar
              </Typography>
            </Typography>
            <Button
              sx={{
                borderRadius: "50px",
                background: `${
                  parseInt(item.montant_restant) === 0
                    ? status.payer.bgcolor
                    : status.noPayer.bgcolor
                }`,
                color: `${
                  parseInt(item.montant_restant) === 0
                    ? status.payer.color
                    : status.noPayer.color
                }`,
                border: `${
                  parseInt(item.montant_restant) === 0
                    ? status.payer.border
                    : status.noPayer.border
                }`,
                textTransform: "capitalize",
                px: 3,
                "&:hover": {
                  background: "white",
                  color: "secondary.main",
                },
              }}
              endIcon={<ArrowRightTwoTone />}
            >
              {parseInt(item.montant_restant) === 0 ? "payé" : "non payé"}
            </Button>
            {account.account_type === "proprios" ? null : 
              parseInt(item.montant_restant) === 0 ? (
                <Fab
                  size="small"
                  aria-label="delete"
                  onClick={() => handleDeleteTrosa(item)}
                  sx={{
                    background: "rgba(255, 0, 0, 0.105)",
                    boxShadow: "0",
                    border: "1px solid rgba(255, 0, 0, 0.145)",
                    "&:hover": {
                      background: "rgba(255, 0, 0, 0.245)",
                      color: "red",
                    },
                  }}
                >
                  <Delete />
                </Fab>
              ) : (
                <Fab
                  size="small"
                  aria-label="edit"
                  onClick={() => handleEditTrosa(item)}
                  sx={{
                    background: "rgba(0, 128, 0, 0.105)",
                    boxShadow: "0",
                    border: "1px solid rgba(0, 128, 0, 0.145)",
                  }}
                >
                  <Edit />
                </Fab>
              )
            }
            
          </Stack>
        </Box>
      ))}

      <AddTrosaDialog open={open} onClose={handleCloseDialog} />
      <EditTrosaDialog
        open={openEditDialog}
        onClose={handleCloseDialog}
        selectedItem={selectedItem}
      />
      <DeleteDialog
        open={openDeleteDialog}
        onClose={handleCloseDialog}
        deleteItem={deleteTrosa}
        selectedItem={selectedItem}
      />
      <Toaster position="top-center" richColors />
    </>
  );
};

export default TrosaItem;
