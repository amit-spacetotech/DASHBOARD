import React from "react";
import styles from "../Customer.module.css";
import altImage from "../../../assets/svg/altImage.svg";
const GetUserInfo = (props) => {
  console.log(props);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.leftHeader}>
          <span onClick={() => props.setState("GET_CUSTOMER")}>
            Customer Management
          </span>{" "}
          {">"} User details
        </div>

        <div className={styles.rightHeader}></div>
      </div>
      {props.userInfo && (
        <div className={styles.content}>
          <div className={styles.leftContent}>
            <h3>BASIC INFORMATION</h3>
            <img src={props.userInfo.userProfile.images[0]} alt="img" />
            <div className={styles.flex}>
              <p>First Name :</p>
              <h5>{props.userInfo.userProfile.firstName}</h5>
            </div>
            <div className={styles.flex}>
              <p>Last Name :</p>
              <h5>{props.userInfo.userProfile.lastName}</h5>
            </div>
            <div className={styles.flex}>
              <p>Location :</p>
              <h5>{props.userInfo.userProfile.location}</h5>
            </div>
            <div className={styles.flex}>
              <p>Gender :</p>
              <h5>{props.userInfo.userProfile.gender}</h5>
            </div>
            <div className={styles.flex}>
              <p>Birthday :</p>
              <h5>{props.userInfo.userProfile.dob}</h5>
            </div>
            <div className={styles.flex}>
              <p>Monthly rental budget : &nbsp;</p>
              <h5>R {props.userInfo.userProfile.rentalBudget}</h5>
            </div>
          </div>
          <div className={styles.rightContent}>
            <h3>PREFERENCES</h3>
            <div className={styles.flex} style={{ marginTop: "1rem" }}>
              <p>Pets :</p>
              <h5>{props.userInfo.userProfile.havePets ? "Yes" : "No"}</h5>
            </div>

            <div className={styles.flex}>
              <p>Religion :</p>
              <h5>{props.userInfo.userProfile.religion}</h5>
            </div>

            <div className={styles.flex}>
              <p>Interests :</p>
              <h5>
                {props.userInfo.userProfile.interest &&
                props.userInfo.userProfile.interest.length > 0
                  ? props.userInfo.userProfile.interest.join(", ")
                  : "N/A"}
              </h5>
            </div>
            <div className={styles.flex}>
              <p>Capacity for people : &nbsp;</p>
              <h5>{props.userInfo.userProfile.peopleCapacity}</h5>
            </div>

            <h3 style={{ marginTop: "1.5rem", marginBottom: "1rem" }}>
              CONTACT
            </h3>
            <div className={styles.flex}>
              <p>Email id :</p>
              <h5>{props?.userInfo.email}</h5>
            </div>

            {/* <div className={styles.flex}>
              <p>Contact</p>
              <h5>{props.userInfo.userProfile?.contact}</h5>
            </div> */}
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
      )}
    </div>
  );
};

export default GetUserInfo;
