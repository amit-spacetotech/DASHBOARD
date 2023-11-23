import React from "react";
import styles from "../Property.module.css";
import altImage from "../../../assets/svg/altImage.svg";
import moment from "moment";
const GetPropertyInfo = (props) => {
  console.log(props, "SDSD");
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.leftHeader}>
          <span onClick={() => props.setState("VIEW_PROPERTY")}>
            Property management
          </span>{" "}
          {">"} Property details
        </div>

        <div className={styles.rightHeader}></div>
      </div>

      <div className={styles.content}>
        <div className={styles.leftContent}>
          <h3>BASIC INFORMATION</h3>
          <img src={props.userInfo.images[0]} alt="img" />
          <div className={styles.flex}>
            <p>Property Id :</p>
            <h5>{props.userInfo._id}</h5>
          </div>
          <div className={styles.flex}>
            <p>Property name :</p>
            <h5>{props.userInfo?.userProfile?.firstName}'s home</h5>
          </div>
          <div className={styles.flex}>
            <p>Owner name:</p>
            <h5>{props.userInfo?.userProfile?.firstName}</h5>
          </div>
          <div className={styles.flex}>
            <p>Location :</p>
            <h5>{props.userInfo?.userProfile?.location}</h5>
          </div>
          <div className={styles.flex}>
            <p>Date registered :</p>
            <h5>{moment(props.userInfo?.createdAt).format("DD-MM-YYYY")}</h5>
          </div>
        </div>
        <div className={styles.rightContent}>
          <h3>PRICING</h3>
          <div className={styles.flex} style={{ marginTop: "1rem" }}>
            <p>Rent per month:</p>
            <h5>{props.userInfo?.rent}</h5>
          </div>

          <div className={styles.flex}>
            <p>Deposit required :</p>
            <h5>{props.userInfo?.deposit}</h5>
          </div>

          <h3 style={{ marginTop: "2rem", marginBottom: "1rem" }}>
            INCLUDED AMENITIES
          </h3>
          <div className={styles.flex}>
            <p>Water included :</p>
            <h5>{props.userInfo?.isWaterIncluded ? "Yes" : "No"}</h5>
          </div>

          <div className={styles.flex}>
            <p>Electricity included :</p>
            <h5>{props.userInfo?.isElectricityIncluded ? "Yes" : "No"}</h5>
          </div>
          <div className={styles.flex}>
            <p>Internet included :</p>
            <h5>{props.userInfo?.isInternetIncluded ? "Yes" : "No"}</h5>
          </div>

          <h3 style={{ marginTop: "2rem", marginBottom: "1rem" }}>
            AVAILABILITY
          </h3>
          <div className={styles.flex}>
            <p>Available rooms :</p>
            <h5>{props?.userInfo?.availableRooms}</h5>
          </div>

          <div className={styles.flex}>
            <p>Available from :</p>
            <h5>{moment(props.userInfo.availableFrom).format("DD-MM-YYYY")}</h5>
          </div>
          <div className={styles.flex}>
            <p>Min lease period :</p>
            <h5>{props.userInfo?.minLeasePeriod}</h5>
          </div>
          <div
            className={styles.flex}
            style={{
              justifyContent: "space-between",
              width: "95%",
              marginTop: "1.5rem",
              flexWrap: "wrap",
            }}
          ></div>
          {/* <pre>{props.data.description}</pre> */}
        </div>
      </div>
    </div>
  );
};

export default GetPropertyInfo;
