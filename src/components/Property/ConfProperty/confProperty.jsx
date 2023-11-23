import React from "react";
import styles from "../Property.module.css";
import { TextField, Switch, Radio, styled } from "@mui/material";
import axios from "axios";
import moment from "moment";
import { getAllProperty } from "../../../actions/property/action";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { showAlert } from "../../../actions/auth/action";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../config/config";
const ConfProperty = (props) => {
  const [formData, setFormData] = React.useState({
    bedRooms: "",
    bathRooms: "",
    livingrooms: "",
    size: "",
    deposit: "",
    rent: "",
    haveGarden: false,
    userId: "",
    isSmokingAllowed: false,
    isInternetIncluded: false,
    isPetsAllowed: false,
    isWaterIncluded: false,
    isElectricityIncluded: false,
    availableRooms: "",
    availableFrom: "",
    minLeasePeriod: "",
    about: "",
    currencyType: "R",
    tempDate: "",
    status: true,
  });
  const [errors, setErrors] = React.useState({});
  const [hasValue, setHasValue] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [focus, setFocused] = React.useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);
  const validate = () => {
    const newErrors = {};
    const basicForm = {
      bedRooms: "Bed rooms",
      bathRooms: "Bath rooms",
      livingrooms: "Living rooms",
      size: "Size",
      deposit: "Deposit",
      rent: "Rent",
      userId: "Owner Id",
      availableRooms: "Available rooms",
      availableFrom: "Available from",
      minLeasePeriod: "Min lease period",

      // tempDate: "",
    };
    Object.keys(basicForm).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = `${basicForm[key]} is required`;
      }
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      return true;
    }
  };

  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 36,
    height: 16,
    padding: 0,
    marginLeft: 20,
    display: "flex",
    "&:active": {
      "& .MuiSwitch-thumb": {
        width: 15,
      },
      "& .MuiSwitch-switchBase.Mui-checked": {
        transform: "translateX(9px)",
      },
    },
    "& .MuiSwitch-switchBase": {
      padding: 2,
      "&.Mui-checked": {
        // transform: 'translateX(12px)',
        color: "#F8CD46",
        "& + .MuiSwitch-track": {
          opacity: 1,
          border: "solid 1px black",
          backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "white",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(["width"], {
        duration: 200,
      }),
    },

    "& .MuiSwitch-track": {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === "dark" ? "white" : "rgba(0,0,0,.25)",
      boxSizing: "border-box",
    },
  }));

  const check = async () => {
    await setDoc(doc(db, `userList/${formData.userId}`), {
      home: true,
    });
  };

  const handleCreateHome = () => {
    if (validate()) {
      setLoading(true);
      axios({
        method: "post",
        url: `/customer/updateHome`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          ...formData,
          homeId: props.state === "EDIT-CUSTOMER" ? props.editUser._id : false,
          availableFrom: new Date(formData.availableFrom),
        },
      })
        .then((res) => {
          !props.editUser && check();
          props.showAlert(
            `${!props.editUser ? "Created" : "Updated"} Successfully`
          );
          props.getAllProperty(10, 1, "");
          props.setState("VIEW_PROPERTY");
          setLoading(false);
        })
        .catch((err) => {
          alert(
            err.response.data
              ? err.response.data.error
              : "OOPS! SOMETHING WENT WRONG"
          );
          // setLoading(false);
          // setError(err.response.data.error ?? err.response.data.errors[0].msg);
        });
    }
  };
  React.useEffect(() => {
    if (props.editUser) {
      setFormData({
        ...formData,
        ...props.editUser,
        homeId: props.editUser._id,
      });
    }
  }, []);


  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.leftHeader}>
          <span
            onClick={() => {
              props.setState("VIEW_PROPERTY");
            }}
          >
            Property Management
          </span>{" "}
          {">"} {props.editUser ? "Edit Property" : "New Property"}
        </div>

        <div className={styles.rightHeader}>
          <button onClick={() => handleCreateHome()}>Save</button>
          <button
            style={{
              background: "transparent",
              color: "black",
              border: "black solid 1px",
            }}
            onClick={() => props.setState("VIEW_PROPERTY")}
          >
            Delete
          </button>
        </div>
      </div>
      <div className={styles.contentCustomer}>
        <div className={styles.leftContentCust}>
          <h4 style={{ marginTop: "5px", marginBottom: "6px" }}>
            About Property
          </h4>
          {/* <TextField
            variant="standard"
            placeholder="Property Name"
            fullWidth
            inputProps={{
              sx: {
                "&::placeholder": {
                  color: "black",
                  opacity: 1,
                  fontSize: "0.8rem",
                  fontFamily: "var(--poppins-font)",
                },
              },
            }}
            className={styles.textField}
            value={formData.userName}
            onChange={(e) => {
              setFormData({ ...formData, userName: e.target.value });
            }}
          /> */}

          <div className={styles.flexCustomer} style={{ marginTop: "10px" }}>
            <TextField
              inputProps={{
                sx: {
                  "&::placeholder": {
                    color: "black",
                    opacity: 1,
                    fontSize: "0.8rem",
                    fontFamily: "var(--poppins-font)",
                  },
                },
              }}
              type="number"
              variant="standard"
              placeholder="No. of bedrooms"
              fullWidth
              className={styles.leftFlex}
              value={formData.bedRooms}
              errors={errors.bedRooms}
              helperText={errors.bedRooms}
              onChange={(e) => {
                if (e.target.value > 0) {
                  setFormData({ ...formData, bedRooms: e.target.value });
                }
              }}
            />
            <TextField
              inputProps={{
                sx: {
                  "&::placeholder": {
                    color: "black",
                    opacity: 1,
                    fontSize: "0.8rem",
                    fontFamily: "var(--poppins-font)",
                  },
                },
              }}
              type="number"
              variant="standard"
              placeholder="No of bathrooms"
              fullWidth
              className={styles.leftFlex}
              value={formData.bathRooms}
              errors={errors.bathRooms}
              helperText={errors.bathRooms}
              onChange={(e) => {
                if (e.target.value > 0) {
                  setFormData({ ...formData, bathRooms: e.target.value });
                }
              }}
            />
          </div>

          <div className={styles.flexCustomer} style={{ marginTop: "17px" }}>
            <TextField
              type="number"
              inputProps={{
                sx: {
                  "&::placeholder": {
                    color: "black",
                    opacity: 1,
                    fontSize: "0.8rem",
                    fontFamily: "var(--poppins-font)",
                  },
                },
              }}
              variant="standard"
              placeholder="No. of living room"
              fullWidth
              className={styles.leftFlex}
              value={formData.livingrooms}
              errors={errors.livingrooms}
              helperText={errors.livingrooms}
              onChange={(e) => {
                if (e.target.value > 0) {
                  setFormData({ ...formData, livingrooms: e.target.value });
                }
              }}
            />
            <TextField
              type="number"
              inputProps={{
                sx: {
                  "&::placeholder": {
                    color: "black",
                    opacity: 1,
                    fontSize: "0.8rem",
                    fontFamily: "var(--poppins-font)",
                  },
                },
              }}
              variant="standard"
              placeholder="Size"
              fullWidth
              errors={errors.size}
              helperText={errors.size}
              className={styles.leftFlex}
              value={formData.size}
              onChange={(e) => {
                const inputValue = e.target.value;
                if (
                  inputValue === "" ||
                  (inputValue > 0 && inputValue.length <= 7)
                ) {
                  setFormData({ ...formData, size: e.target.value });
                }
              }}
            />
          </div>
          <p style={{ marginTop: "17px" }}>Garden</p>
          <div className={styles.radioFlex}>
            <div className={styles.radio}>
              <Radio
                style={{ color: "#F8CD46" }}
                checked={formData.haveGarden}
                onChange={() => setFormData({ ...formData, haveGarden: true })}
              />
              <p className={styles.pTag}>Yes</p>
            </div>
            <div className={styles.radio}>
              <Radio
                style={{ color: "#F8CD46" }}
                checked={!formData.haveGarden}
                onChange={() => setFormData({ ...formData, haveGarden: false })}
              />
              <p className={styles.pTag}>No</p>
            </div>
          </div>

          <h4 style={{ marginTop: "25px", marginBottom: "15px" }}>
            House rules
          </h4>
          <div className={styles.flexCustomer}>
            <div style={{ width: "45%" }}>
              <p style={{ marginBottom: "7px" }}>Pets allowed</p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div className={styles.radio}>
                  <Radio
                    style={{ color: "#F8CD46" }}
                    checked={formData.isPetsAllowed}
                    onChange={() =>
                      setFormData({ ...formData, isPetsAllowed: true })
                    }
                  />
                  <p className={styles.pTag}>Yes</p>
                </div>
                <div className={styles.radio}>
                  <Radio
                    style={{ color: "#F8CD46" }}
                    checked={!formData.isPetsAllowed}
                    onChange={() =>
                      setFormData({ ...formData, isPetsAllowed: false })
                    }
                  />
                  <p className={styles.pTag}>No</p>
                </div>
              </div>
            </div>
            <div style={{ width: "45%" }}>
              <p style={{ marginBottom: "7px" }}>Smoking allowed</p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div className={styles.radio}>
                  <Radio
                    style={{ color: "#F8CD46" }}
                    checked={formData.isSmokingAllowed}
                    onChange={() =>
                      setFormData({ ...formData, isSmokingAllowed: true })
                    }
                  />
                  <p className={styles.pTag}>Yes</p>
                </div>
                <div className={styles.radio}>
                  <Radio
                    style={{ color: "#F8CD46" }}
                    checked={!formData.isSmokingAllowed}
                    onChange={() =>
                      setFormData({ ...formData, isSmokingAllowed: false })
                    }
                  />
                  <p className={styles.pTag}>No</p>
                </div>
              </div>
            </div>
          </div>

          <h4 style={{ marginTop: "25px", marginBottom: "6px" }}>Pricing</h4>
          <TextField
            type="number"
            inputProps={{
              sx: {
                "&::placeholder": {
                  color: "black",
                  opacity: 1,
                  fontSize: "0.8rem",
                  fontFamily: "var(--poppins-font)",
                },
              },
            }}
            variant="standard"
            placeholder="Rent per month"
            fullWidth
            style={{ margin: "6px 0" }}
            className={styles.textField}
            errors={errors.rent}
            helperText={errors.rent}
            value={formData.rent}
            onChange={(e) => {
              const inputValue = e.target.value;
              if (
                inputValue === "" ||
                (inputValue > 0 && inputValue.length <= 6)
              ) {
                setFormData({
                  ...formData,
                  rent: e.target.value,
                });
              }
            }}
          />
          <TextField
            type="number"
            inputProps={{
              sx: {
                "&::placeholder": {
                  color: "black",
                  opacity: 1,
                  fontSize: "0.8rem",
                  fontFamily: "var(--poppins-font)",
                },
              },
            }}
            style={{ margin: "6px 0" }}
            variant="standard"
            placeholder="Deposit required"
            fullWidth
            className={styles.textField}
            value={formData.deposit}
            errors={errors.deposit}
            helperText={errors.deposit}
            onChange={(e) => {
              const inputValue = e.target.value;
              if (
                inputValue === "" ||
                (inputValue > 0 && inputValue.length <= 6)
              ) {
                setFormData({
                  ...formData,
                  deposit: e.target.value,
                });
              }
            }}
          />
        </div>

        <div className={styles.rightContentCust}>
          <h4 style={{ marginTop: "5px", marginBottom: "6px" }}>
            Are following things included
          </h4>

          <div className={styles.flexCustomer}>
            <div style={{ width: "28%" }}>
              <p style={{ marginTop: "10px", marginBottom: "10px" }}>
                Water included
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div className={styles.radio}>
                  <Radio
                    style={{ color: "#F8CD46" }}
                    checked={formData.isWaterIncluded}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        isWaterIncluded: true,
                      });
                    }}
                  />
                  <p className={styles.pTag}>Yes</p>
                </div>
                <div className={styles.radio}>
                  <Radio
                    style={{ color: "#F8CD46" }}
                    checked={!formData.isWaterIncluded}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        isWaterIncluded: false,
                      });
                    }}
                  />
                  <p className={styles.pTag}>No</p>
                </div>
              </div>
            </div>
            <div style={{ width: "28%" }}>
              <p style={{ marginTop: "10px", marginBottom: "10px" }}>
                Internet included
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div className={styles.radio}>
                  <Radio
                    style={{ color: "#F8CD46" }}
                    checked={formData.isInternetIncluded}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        isInternetIncluded: true,
                      });
                    }}
                  />
                  <p className={styles.pTag}>Yes</p>
                </div>
                <div className={styles.radio}>
                  <Radio
                    style={{ color: "#F8CD46" }}
                    checked={!formData.isInternetIncluded}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        isInternetIncluded: false,
                      });
                    }}
                  />
                  <p className={styles.pTag}>No</p>
                </div>
              </div>
            </div>
            <div style={{ width: "28%" }}>
              <p style={{ marginTop: "10px", marginBottom: "10px" }}>
                Electricity included
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div className={styles.radio}>
                  <Radio
                    style={{ color: "#F8CD46" }}
                    checked={formData.isElectricityIncluded}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        isElectricityIncluded: true,
                      });
                    }}
                  />
                  <p className={styles.pTag}>Yes</p>
                </div>
                <div className={styles.radio}>
                  <Radio
                    style={{ color: "#F8CD46" }}
                    checked={!formData.isElectricityIncluded}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        isElectricityIncluded: false,
                      });
                    }}
                  />
                  <p className={styles.pTag}>No</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.rightBottom}>
            <div className={styles.leftRightBottom}>
              <h4 style={{ marginTop: "25px", marginBottom: "6px" }}>
                About Owner
              </h4>
              <TextField
                disabled={props.state == "EDIT-CUSTOMER"}
                inputProps={{
                  sx: {
                    "&::placeholder": {
                      color: "black",
                      opacity: 1,
                      fontSize: "0.8rem",
                      fontFamily: "var(--poppins-font)",
                    },
                  },
                }}
                style={{ margin: "7px 0" }}
                variant="standard"
                placeholder="Owned By"
                fullWidth
                className={styles.textField}
                value={formData.userId}
                errors={errors.userId}
                helperText={errors.userId}
                onChange={(e) => {
                  setFormData({ ...formData, userId: e.target.value });
                }}
              />

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <h5>Status</h5>
                <AntSwitch
                  value={formData.status}
                  checked={formData.status}
                  onChange={() =>
                    setFormData({ ...formData, status: !formData.status })
                  }
                />
              </div>
            </div>
            <div className={styles.rightRightBottom}>
              <h4 style={{ marginTop: "25px", marginBottom: "6px" }}>
                Availability
              </h4>

              <TextField
                type="number"
                variant="standard"
                placeholder="Available rooms"
                fullWidth
                style={{ margin: "7px 0" }}
                inputProps={{
                  sx: {
                    "&::placeholder": {
                      color: "black",
                      opacity: 1,
                      fontSize: "0.8rem",
                      fontFamily: "var(--poppins-font)",
                    },
                  },
                }}
                className={styles.textField}
                value={formData.availableRooms}
                errors={errors.availableRooms}
                helperText={errors.availableRooms}
                onChange={(e) => {
                  if (e.target.value > 0) {
                    setFormData({
                      ...formData,
                      availableRooms: e.target.value,
                    });
                  }
                }}
              />
              <TextField
                fullWidth
                onFocus={onFocus}
                onBlur={onBlur}
                className={styles.textField}
                value={
                  formData.availableFrom
                    ? moment(formData.availableFrom).format("YYYY-MM-DD")
                    : formData.availableFrom
                }
                errors={errors.availableFrom}
                helperText={errors.availableFrom}
                onChange={(e) => {
                  if (e.target.value) {
                    setFormData({
                      ...formData,
                      availableFrom: e.target.value,
                    });
                    setHasValue(true);
                  } else setHasValue(false);
                }}
                type={hasValue || focus ? "date" : "text"}
                id="outlined-basic"
                label="From"
                variant="standard"
                // style={{ margin: "7px 0" }}
                inputProps={{
                  sx: {
                    "&::placeholder": {
                      color: "black",
                      opacity: 1,
                      fontSize: "0.8rem",
                      fontFamily: "var(--poppins-font)",
                    },
                  },
                }}
              />
              {/* <TextField
                variant="standard"
                style={{ margin: "7px 0" }}
                inputProps={{
                  sx: {
                    "&::placeholder": {
                      color: "black",
                      opacity: 1,
                      fontSize: "0.8rem",
                      fontFamily: "var(--poppins-font)",
                    },
                  },
                }}
                placeholder="Available from"
                fullWidth
                className={styles.textField}
                value={formData.availableFrom}
                onChange={(e) => {
                  setFormData({ ...formData, availableFrom: e.target.value });
                }}
              /> */}
              <TextField
                type="number"
                style={{ marginTop: "20px" }}
                variant="standard"
                inputProps={{
                  sx: {
                    "&::placeholder": {
                      color: "black",
                      opacity: 1,
                      fontSize: "0.8rem",
                      fontFamily: "var(--poppins-font)",
                    },
                  },
                }}
                placeholder="Minimum lease period"
                fullWidth
                className={styles.textField}
                value={formData.minLeasePeriod}
                errors={errors.minLeasePeriod}
                helperText={errors.minLeasePeriod}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (
                    inputValue === "" ||
                    (inputValue > 0 && inputValue.length <= 2)
                  ) {
                    setFormData({
                      ...formData,
                      minLeasePeriod: e.target.value,
                    });
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  properties: state.property.property,
  propertyCount: state.property.propertyCount,
});
export default withRouter(
  connect(mapStateToProps, { getAllProperty, showAlert })(ConfProperty)
);
