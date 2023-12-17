import React from "react";
import NavBar from "@/components/NavBar/NavBar";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
function Boxcustom({ Contents, size, justifyContent }: any) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent={"center"}
      alignItems={justifyContent}
      width={size}
      sx={{
        backgroundColor: "#F6F2F5",
        border: "1px solid #000000",
        borderRadius: "10px",
        px: "15px",
        py: "10px",
      }}
      mx="20px"
    >
      <Typography sx={{ fontWeight: 600, fontSize: "20px", color: "#000000" }}>
        {Contents}
      </Typography>
    </Box>
  );
}

export default Boxcustom;
