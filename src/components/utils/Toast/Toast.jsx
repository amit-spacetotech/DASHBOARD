import React, { useState } from "react";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { connect } from "react-redux";
import { showAlert } from "../../../actions/auth/action";
import styles from "./Toast.module.css"
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const ToastMsg = (props) => {
  const [show, setShow] = useState(props.alert);

  React.useEffect(() => {
    setShow(props.alert);
  }, [props.alert]);

  return (
    <Snackbar
      open={show}
      className={styles.toast}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={1000}
      onClose={() => props.showAlert(false)}
    >
      <Alert onClose={() => props.showAlert(false)} sx={{ width: "100%" }}>
        {show}
      </Alert>
    </Snackbar>
  );
};

const mapStateToProps = (state) => ({
  alert: state.auth.alert,
});
export default connect(mapStateToProps, { showAlert })(ToastMsg);
