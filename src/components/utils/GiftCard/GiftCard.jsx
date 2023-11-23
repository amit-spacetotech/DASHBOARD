import React from "react";
import styles from "./GiftCard.module.css";
import icon from "../../../assets/svg/userIcon.svg";
const GiftCard = (props) => {
  return (
    <div
      className={styles.box}
      style={{
        height: `${props.height ?? "100%"}`,
        width: `${props.width ?? "100%"}`,
        aspectRatio: `${props.aspectRatio ?? "1"}`,
      }}
    >
      <div className={styles.upperSection}>
        <img src={icon} />
      </div>
      <div className={styles.belowSection}>
        <h4>{props.title}</h4>
        <h2>{props.detail}</h2>
      </div>
    </div>
  );
};

export default GiftCard;
