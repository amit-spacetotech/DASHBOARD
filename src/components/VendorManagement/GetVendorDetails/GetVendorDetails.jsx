import React from "react";
import styles from "../Vendor.module.css";
import { TextField, Switch } from "@mui/material";
import GiftCard from "../../utils/GiftCard/GiftCard";

const getCardInformation = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.leftHeader}>
          <span onClick={() => props.setState("VIEW-VENDOR-DETAILS")}>
            Vendor Management
          </span>{" "}
          {">"} Vendor detail
        </div>
        <div className={styles.rightHeader}></div>
      </div>

      <div className={styles.content}>
        <div className={styles.leftContent}>
          <h3>Basic Information</h3>
          <img
            src={require("../../../assets/img/profileImage.png")}
            alt="img"
          />
          <div className={styles.flex}>
            <p>Vendor Code</p>
            <h5>{props.data.code}</h5>
          </div>
          <div className={styles.flex}>
            <p>Name</p>
            <h5>{props.data.name}</h5>
          </div>
          <div className={styles.flex}>
            <p>Date Joined</p>
            <h5>{props.data.dateJoined}</h5>
          </div>
          <div className={styles.flex}>
            <p>Status</p>
            <Switch checked={props.data.status} />
          </div>

          <h3>Contact</h3>
          <div className={styles.flex}>
            <p>Email id</p>
            <h5>{props.data.email}</h5>
          </div>
          <div className={styles.flex}>
            <p>Contact</p>
            <h5>{props.data.mobileNo}</h5>
          </div>
        </div>
        <div className={styles.rightContent}>
          <h3>Gift Card Information</h3>
          <div
            className={styles.flex}
            style={{
              justifyContent: "space-between",
              width: "95%",
              marginTop: "1.5rem",
            }}
          >
            <GiftCard
              width="42%"
              title="Total Gift Card Purchased"
              detail="0"
            />
            <GiftCard width="42%" title="Total Gift Card Created" detail="0" />
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default getCardInformation;
