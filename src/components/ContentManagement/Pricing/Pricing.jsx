import React from "react";
import AppLoader from "../../utils/AppLoader/AppLoader";
import styles from "./Pricing.module.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import moment from "moment";
const Pricing = (props) => {
  const handleChange = (data) => {
    props.setPricingForm(data);
  };

  return (
    <div className={styles.content}>
      {!props.pricing && <AppLoader />}
      {(props.pricing || props.pricing === "NO_DATA") && (
        <>
          <h4>
            Last Updated On:{" "}
            {moment(props.pricing.updatedAt).format("DD-MM-YYYY")}
          </h4>
          <ReactQuill
            placeholder="Enter Privacy Policies"
            theme="snow"
            value={props.pricingForm ? props.pricingForm : props.pricing}
            onChange={handleChange}
          />
        </>
      )}
    </div>
  );
};

export default Pricing;
