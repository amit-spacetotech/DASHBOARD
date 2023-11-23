import { TextField } from "@mui/material";
import React from "react";
import AppLoader from "../../utils/AppLoader/AppLoader";
import PassTextField from "../../utils/passTextField/PassTextField";
import styles from "./Authentication.module.css";

const Authentication = (props) => {
  return (
    <div className={styles.content}>
      <TextField
        fullWidth
        value={props.password.oldPassword}
        onChange={(e) =>
          props.setPassword({ ...props.password, oldPassword: e.target.value })
        }
        inputProps={{
          sx: {
            "&::placeholder": {
              color: "black",
              opacity: 1,
            },
          },
        }}
        placeholder="Old Password"
        variant="standard"
        className={styles.textField}
      />
      <PassTextField
        fullWidth
        value={props.password.newPassword}
        onChange={(e) =>
          props.setPassword({ ...props.password, newPassword: e.target.value })
        }
        inputProps={{
          sx: {
            "&::placeholder": {
              color: "black",
              opacity: 1,
            },
          },
        }}
        placeholder="New Password"
        variant="standard"
        className={styles.textField}
      />
      {props.password.newPassword !== props.password.confirmPassword && (
        <span style={{ color: "red", fontSize: "0.7rem" }}>
          Password Not Matched With New Password*
        </span>
      )}
      <PassTextField
        fullWidth
        value={props.password.confirmPassword}
        onChange={(e) =>
          props.setPassword({
            ...props.password,
            confirmPassword: e.target.value,
          })
        }
        inputProps={{
          sx: {
            "&::placeholder": {
              color: "black",
              opacity: 1,
            },
          },
        }}
        placeholder="Confirm Password"
        variant="standard"
        type="String"
        className={styles.textField}
      />
    </div>
  );
};

export default Authentication;
