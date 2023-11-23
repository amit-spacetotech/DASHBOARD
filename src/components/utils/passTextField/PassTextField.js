import React from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { TextField, InputAdornment, Button, IconButton } from "@mui/material";
const PassTextField = (props) => {
  const [type, setType] = React.useState("password");
  return (
    <TextField
      {...props}
      type={type}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Button
              onClick={() => setType(type == "text" ? "password" : "text")}
            >
              {type == "text" ? (
                <VisibilityOff style={{ color: "#00000029" }} />
              ) : (
                <Visibility style={{ color: "#00000029" }} />
              )}
            </Button>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PassTextField;
