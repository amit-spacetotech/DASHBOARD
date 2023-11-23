import React from "react";
import AppLoader from "../../utils/AppLoader/AppLoader";
import styles from "./PrivacyPolicy.module.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import moment from "moment";


const PrivacyPolicy = (props) => {
  const handleChange = (data) => {
    props.setPrivacyForm(data);
  };

  return (
    <div className={styles.content}>
      {!props.privacy && <AppLoader />}
      {(props.privacy || props.privacy === "NO_DATA") && (
        <>
          <h4>
            Last Updated On:{" "}
            {moment(props.privacy.updatedAt).format("DD-MM-YYYY")}
          </h4>
          <ReactQuill
            placeholder="Enter Privacy Policies"
            theme="snow"
            value={props.privacyForm ? props.privacyForm : props.privacy}
            onChange={handleChange}
          />
        </>
      )}
    </div>
  );
};

export default PrivacyPolicy;
