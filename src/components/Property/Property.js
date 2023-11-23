import React from "react";
import styles from "./Property.module.css";
import ConfProperty from "./ConfProperty/confProperty";
import GetPropertyInfo from "./GetPropertyInfo/getPropertyInfo";
import ViewProperty from "./ViewProperty/viewProperty";

const Property = (props) => {
  
  const [state, setState] = React.useState("VIEW_PROPERTY");
  const [userInfo, setUserInfo] = React.useState(false);
  const handleClick = (data, state) => {
    setUserInfo(data);
    setState(state);
  };
  console.log(userInfo)

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        {state === "VIEW_PROPERTY" && (
          <ViewProperty
            state={state}
            setState={setState}
            handleClick={handleClick}
          />
        )}
        {state === "ADD-CUSTOMER" && (
          <ConfProperty state={state} setState={setState} />
        )}
        {state === "EDIT-CUSTOMER" && (
          <ConfProperty state={state} setState={setState} editUser={userInfo} />
        )}
        {state === "USER-INFO" && (
          <GetPropertyInfo
            state={state}
            setState={setState}
            userInfo={userInfo}
          />
        )}
      </div>
    </div>
  );
};

export default Property;
