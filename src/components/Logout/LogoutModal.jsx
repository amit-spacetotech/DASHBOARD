import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import styles from "./Logout.module.css";
import closeicon from "../../assets/svg/closeIcon.svg";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  background: "#F6F1E9",
  padding: "0.8rem",
  bgcolor: "background.paper",
  borderRadius: "10px",
  border: "2px solid white",
  boxShadow: 24,
};

export default function LogoutModal(props) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.replace("/login");
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={props.open}>
          <Box sx={style} style={{ background: "#F6F1E9" }}>
            <div
              style={{ width: "100%", textAlign: "right", cursor: "pointer" }}
            >
              <img src={closeicon} onClick={() => props.onClose()} />
            </div>
            <div className={styles.content}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
                className={styles.typo}
              >
                Are you sure want to logout?
              </Typography>
              <div className={styles.flex}>
                <button
                  style={{ background: "#F8CD46", color: "white", border: 0 }}
                  onClick={() => handleLogout()}
                >
                  Yes
                </button>
                <button
                  style={{ color: "black", background: "white", }}
                  onClick={() => props.onClose()}
                >
                  No
                </button>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
