import React from "react";
import styles from "./Customer.module.css";
import CustomerAdd from "./CustomerAdd/CustomerAdd";
import GetUserInfo from "./GetUserInfo/GetUserInfo";
import ViewCustomer from "./ViewCustomers/ViewCustomer";

const Customer = (props) => {

  const [state, setState] = React.useState("GET_CUSTOMER");
  const [userInfo, setUserInfo] = React.useState(false);
  const handleClick = (data, state) => {
    setUserInfo(data);
    setState(state);
  };

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        {state === "GET_CUSTOMER" && (
          <ViewCustomer
            state={state}
            setState={setState}
            handleClick={handleClick}
          />
        )}
        {state === "ADD-CUSTOMER" && (
          <CustomerAdd state={state} setState={setState} />
        )}
        {state === "EDIT-CUSTOMER" && (
          <CustomerAdd state={state} setState={setState} editUser={userInfo} />
        )}
        {state === "USER-INFO" && (
          <GetUserInfo state={state} setState={setState} userInfo={userInfo} />
        )}
      </div>
    </div>
  );
};

export default Customer;
