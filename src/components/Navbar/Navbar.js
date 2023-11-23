import React from "react";
import styles from "./navbar.module.css";
import { NavLink } from "react-router-dom";
import { IconButton, Drawer } from "@mui/material";
import {
  ManageAccountsOutlined,
  DashboardOutlined,
  OtherHousesOutlined,
  PolicyOutlined,
  ReceiptLongOutlined,
  Book,
  MenuRounded,
} from "@mui/icons-material";

import { connect } from "react-redux";

const NavBar = (props) => {
  const [open, setOpen] = React.useState(false);

  const navElements = (
    <React.Fragment>
      <NavLink
        className={styles.navItem}
        to="/home"
        activeClassName={styles.activeNavItem}
      >
        <DashboardOutlined />
        <p>Dashboard</p>
      </NavLink>

      <NavLink
        className={styles.navItem}
        to="/Customer"
        activeClassName={styles.activeNavItem}
      >
        <ManageAccountsOutlined />
        <p>User management</p>
      </NavLink>

      <NavLink
        className={styles.navItem}
        to="/Property"
        activeClassName={styles.activeNavItem}
      >
        <OtherHousesOutlined />
        <p>Property management</p>
      </NavLink>
      <NavLink
        className={styles.navItem}
        to="/Vendor"
        activeClassName={styles.activeNavItem}
      >
        <Book />
        <p>Move ins</p>
      </NavLink>
      <NavLink
        className={styles.navItem}
        to="/Transactions"
        activeClassName={styles.activeNavItem}
      >
        <ReceiptLongOutlined />
        <p>Payment & Transaction</p>
      </NavLink>

      <NavLink
        className={styles.navItem}
        to="/ContentManagement"
        activeClassName={styles.activeNavItem}
      >
        <PolicyOutlined />
        <p>Content management</p>
      </NavLink>
    </React.Fragment>
  );
  return (
    <div className={styles.container}>
      <IconButton className={styles.menuButton} onClick={() => setOpen(true)}>
        <MenuRounded />
      </IconButton>

      <>
        <div className={styles.header}>
          <h1>HomeShare</h1>
        </div>
        <div className={styles.navItems}>{navElements}</div>
      </>

      <Drawer anchor={"left"} open={open} onClose={() => setOpen(false)}>
        <div className={styles.header}>HomeShare</div>

        <div className={styles.mobileNav} onClick={() => setOpen(false)}>
          {navElements}
        </div>
      </Drawer>
    </div>
  );
};

export default connect(null)(NavBar);
