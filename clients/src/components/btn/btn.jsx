import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5),
  textTransform: "capitalize",
  backgroundColor: "#4d4373",
  fontFamily: "Exo2-Medium",
  fontSize: "18px",
  color: "white",
  "&:hover": {
    backgroundColor: "#413864",
  },
  "&:active": {
    backgroundColor: "#413864",
    borderColor: "#413864",
  },
}));

export default CustomButton;
