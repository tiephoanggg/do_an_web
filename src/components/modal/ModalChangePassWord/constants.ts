import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  headerModal: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textarea: {
    width: "100%",
    height: "80px !important",
    borderRadius: "4px !important",
    border: "1px solid #C8C8C8 !important",
    padding: "10px",
    "&:focus-visible": {
      outline: "none !important",
    },
  },
  input: {
    borderRadius: "4px",
  },
  checkBox: {
    padding: "5px 9px !important",
  },
  btn: {
    backgroundColor: "#50C2C9 !important",
    borderRadius: "4px",
    padding: "11px 24px !important",
    "&:hover": {
      backgroundColor: "#50C2C9 !important",
    },
    boxShadow: "none !important",
  },
}));

export interface ValueChangePassWordForm {
  oldpassword: string;
  newpassword: string;
  verifyPassword: string;
}
