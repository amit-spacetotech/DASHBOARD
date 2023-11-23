import React from "react";
import AppLoader from "../../utils/AppLoader/AppLoader";
import styles from "./Terms.module.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import moment from "moment";
const Terms = (props) => {
  const handleChange = (data) => {
    props.setTermForm(data);
  };
  console.log(props);
  return (
    <div className={styles.content}>
      {!props.term.terms && !props.term && <AppLoader />}
      {((props.term && props.term.terms) || props.term === "NO_DATA") && (
        <>
          <h4>
            Last Updated On: {moment(props.term.updatedAt).format("DD-MM-YYYY")}
          </h4>
          <ReactQuill
            placeholder="Enter Privacy Policies"
            theme="snow"
            value={props.termForm ?? props.term.terms}
            onChange={handleChange}
          />
        </>
      )}
    </div>
  );
};

export default Terms;
