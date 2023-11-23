import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styles from "./styles/app.module.css";
import NavBar from "./components/Navbar/Navbar";
import Customer from "./components/Customer/Customer";
import axios from "axios";
import { backendUrl } from "./config/config";
import ContentManagement from "./components/ContentManagement/ContentManagement";
import Home from "./components/Home/Home";
import Auth from "./components/Auth.js/Auth";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import logo from "./assets/svg/logo.svg";
import {
  Fade,
  Paper,
  List,
  ListItem,
  ClickAwayListener,
  Popper,
} from "@mui/material";
import { ArrowDropDown, Group, ArrowDropUp, Logout } from "@mui/icons-material";
import Profile from "./components/Profile/Profile";
import Payment from "./components/Payment/Payment";
import Property from "./components/Property/Property";
import Vendor from "./components/VendorManagement/Vendor";
import userSvg from "./assets/svg/userIcon.svg";
import LogoutModal from "./components/Logout/LogoutModal";
import Toast from "./components/utils/Toast/Toast";
import { getUser } from "./actions/auth/action";
import { connect } from "react-redux";
import Popover from "@mui/material/Popover";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import { getAllTransaction } from "./actions/payment/action";

axios.interceptors.request.use(async (config) => {
  config.url = config.externalUrl ? config.url : backendUrl + config.url;

  if (localStorage.token && !config.externalUrl && !config.basic) {
    config.headers = {
      ...config.headers,
      Authorization: localStorage.getItem("token"),
    };
  }
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status } = error && error.response;
    if (status === 401) {
      // localStorage.removeItem("token");
      // window.location.replace("/login");
    }
    return Promise.reject(error);
  }
);
const Landing = (props) => {
  React.useEffect(() => {
    window.location.replace("/home");
  }, []);
  return <>...Loading</>;
};
const App = (props) => {
  const [anchor, setAnchor] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  console.log(props.payment);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const openNotification = Boolean(anchorEl);
  const id = openNotification ? "simple-popover" : undefined;

  const handlePopover = (event) => {
    const open = Boolean(anchor);
    open ? setAnchor(null) : setAnchor(event.currentTarget);
  };
  const open = Boolean(anchor);
  let token = localStorage.getItem("token");
  React.useEffect(() => {
    props.getUser();

    token && props.getAllTransaction(1, 30, "", "", "", "PAID");
  }, []);
  return (
    <div className={styles.appContainer}>
      <LogoutModal open={openModal} onClose={() => setOpenModal(false)} />
      {token && (
        <div className={styles.header}>
          <img src={logo} alt="SIPPAY" width="140px" />

          <div style={{ display: "flex", alignItems: "center" }}>
            <NotificationImportantIcon
              aria-describedby={id}
              variant="contained"
              onClick={handleClick}
              style={{
                marginRight: "10px",
                cursor: "pointer",
                color: "#323232",
              }}
            />
            <Popover
              id={id}
              open={openNotification}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <div
                style={{
                  width: "300px",
                  height: "300px",
                  overflowY: "scroll",
                  padding: "15px 30px",
                }}
              >
                <ul>
                  {props.payment &&
                    props.payment.map((val, index) => {
                      return (
                        <>
                          {val.userId && val.userId?.email && (
                            <li style={{ padding: "5px 0" }}>
                              Transaction of R {val.amount} has done by email :
                              &nbsp;
                              {val.userId?.email
                                ? val.userId.email
                                : "deleted user"}
                            </li>
                          )}
                        </>
                      );
                    })}
                </ul>
              </div>
            </Popover>
            <ClickAwayListener onClickAway={() => setAnchor(null)}>
              <div className={styles.business} onClick={handlePopover}>
                <img src={userSvg} alt="User" width="20" />
                {!open ? (
                  <ArrowDropDown style={{ cursor: "pointer" }} />
                ) : (
                  <ArrowDropUp onClick={() => setAnchor(null)} />
                )}
              </div>
            </ClickAwayListener>

            <Popper
              open={open}
              anchorEl={anchor}
              placement={"bottom-end"}
              transition
              className={styles.poper}
            >
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <Paper sx={{ background: "#F6F1E9", marginTop: "1rem" }}>
                    <List
                      className={styles.listContainer}
                      style={{ margin: "3px 0" }}
                    >
                      <ListItem
                        button
                        style={{ paddingTop: "10px" }}
                        className={styles.listItem}
                        onClick={() => window.location.replace("/profile")}
                      >
                        <AdminPanelSettingsOutlinedIcon
                          fontSize="small"
                          style={{ color: "black" }}
                        />
                        <p>Admin Settings</p>
                      </ListItem>

                      <ListItem
                        button
                        className={styles.listItem}
                        style={{ margin: "3px 0" }}
                        onClick={() => setOpenModal(true)}
                      >
                        <Logout fontSize="small" style={{ color: "black" }} />
                        <p>Logout</p>
                      </ListItem>
                    </List>
                  </Paper>
                </Fade>
              )}
            </Popper>
          </div>
        </div>
      )}

      <Router>
        <>
          <Toast />
          <div className={styles.navContainer}>
            <NavBar />
          </div>
          <div className={styles.mainContainer}>
            <Switch>
              <Route exact path="/" component={Landing} />
              <PrivateRoute
                exact
                path="/home"
                component={Home}
                isAuthenticated={token ? true : false}
              />
              <PrivateRoute
                exact
                path="/Customer"
                component={Customer}
                isAuthenticated={token ? true : false}
              />
              <PrivateRoute
                exact
                path="/ContentManagement"
                component={ContentManagement}
                isAuthenticated={token ? true : false}
              />

              <PrivateRoute
                exact
                path="/Profile"
                component={Profile}
                isAuthenticated={token ? true : false}
              />
              <PrivateRoute
                exact
                path="/Vendor"
                component={Vendor}
                isAuthenticated={token ? true : false}
              />
              <PrivateRoute
                exact
                path="/Transactions"
                component={Payment}
                isAuthenticated={token ? true : false}
              />
              <PrivateRoute
                exact
                path="/Property"
                component={Property}
                isAuthenticated={token ? true : false}
              />

              <Route exact path="/login">
                <Auth />
              </Route>
            </Switch>
          </div>
        </>
      </Router>
    </div>
  );
};

const mapStateToProps = (state) => ({
  content: state.content,
  payment: state.payment.transactions,
});
export default connect(mapStateToProps, {
  getUser,
  getAllTransaction,
})(App);
