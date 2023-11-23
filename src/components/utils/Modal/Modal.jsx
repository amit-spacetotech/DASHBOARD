import * as React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,

};

function CustoModal({ open, onClose, bodyContent, bodyStyle }) {
  const finalStyle = { ...style, ...bodyStyle };
  return (
    <React.Fragment>
      <Modal open={open} onClose={onClose}>
        <Box sx={finalStyle}>{bodyContent}</Box>
      </Modal>
    </React.Fragment>
  );
}

export default CustoModal;
