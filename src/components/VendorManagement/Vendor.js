import React from "react";
import GetVendorDetails from "./GetVendorDetails/GetVendorDetails";
import styles from "./Vendor.module.css";
import ViewVendor from "./ViewVendors/ViewVendor";

const Vendor = (props) => {
  const [state, setState] = React.useState("VIEW-VENDOR-DETAILS");
  const [data, setData] = React.useState();
  const handleClick = (data) => {
    setData(data);
    setState("GET_VENDOR_INFO");
  };
  console.log("HI")
  return (
    <div className={styles.container}>
      {state === "VIEW-VENDOR-DETAILS" && (
        <ViewVendor
          state={state}
          setState={setState}
          handleClick={handleClick}
        />
      )}
      {state === "GET_VENDOR_INFO" && (
        <GetVendorDetails state={state} setState={setState} data={data} />
      )}
    </div>
  );
};

export default Vendor;
