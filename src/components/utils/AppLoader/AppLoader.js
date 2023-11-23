import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function AppLoader() {
  return (
    <Box
      sx={{
        display: "flex",

        alignItems: "center",
        justifyContent: "center",
        minHeight: "250px",
      }}
    >
      <CircularProgress sx={{ color: "#F8CD46" }} />
    </Box>
  );
}
