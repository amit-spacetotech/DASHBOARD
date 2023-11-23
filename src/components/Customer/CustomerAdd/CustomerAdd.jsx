import React from "react";
import styles from "../Customer.module.css";
import {
  TextField,
  Switch,
  InputAdornment,
  FormControlLabel,
  styled,
} from "@mui/material";
import axios from "axios";
import LocationOnIcon from "@mui/icons-material/LocationOn";
const CustomerAdd = (props) => {
  const [formData, setFormData] = React.useState({
    location: "",
    email: "",
    firstName: "",
    lastName: "",
    status: true,
  });
  const [error, setError] = React.useState(false);
  const [errors, setErrors] = React.useState();
  function toCamelCase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  const validate = () => {
    const newErrors = {};
    const basicForm = {
      location: "Location",
      email: "Email",
      firstName: "First name",
      lastName: "Last name",
    };
    Object.keys(basicForm).forEach((key) => {
      if (!formData[key].trim()) {
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

  const addUser = () => {
    if (validate()) {
      let url = props.editUser
        ? `/customer/updateCustomer`
        : `/customer/addCustomer`;
      axios({
        method: props.editUser ? "put" : "post",
        url: url,
        data: {
          ...formData,
        },
      })
        .then((res) => {
          props.setState("GET_CUSTOMER");
        })
        .catch((err) => {
          alert(err.response.data.error);
        });
    }
  };
  React.useEffect(() => {
    if (props.editUser) {
      setFormData({ ...formData, ...props.editUser });
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.leftHeader}>
          <span
            onClick={() => {
              props.setState("GET_CUSTOMER");
            }}
          >
            User Management
          </span>{" "}
          {">"} {props.editUser ? "Edit User" : "Add User"}
        </div>

        <div className={styles.rightHeader}>
          <button onClick={() => addUser()}>Save</button>
          <button
            style={{
              background: "transparent",
              color: "black",
              border: "black solid 1px",
            }}
            onClick={() => props.setState("GET_CUSTOMER")}
          >
            Delete
          </button>
        </div>
      </div>
      <div className={styles.contentCustomer}>
        <div className={styles.leftCustomer}>
          {error && (
            <span
              style={{
                color: "red",
                fontSize: "0.8rem",
              }}
            >
              {error}
            </span>
          )}
          <TextField
            variant="standard"
            placeholder="First name"
            fullWidth
            inputProps={{
              sx: {
                "&::placeholder": {
                  color: "black",
                  opacity: 1,
                  fontSize: "0.9rem",
                  fontFamily: "var(--poppins-font)",
                },
              },
            }}
            className={styles.textField}
            value={formData.firstName}
            onChange={(e) => {
              const regex = /^[a-zA-Z]*$/;
              if (regex.test(e.target.value)) {
                if (e.target.value.length <= 15) {
                  setFormData({ ...formData, firstName: e.target.value });
                }
              }
            }}
            error={errors?.firstName}
            helperText={errors?.firstName}
          />
          <TextField
            variant="standard"
            placeholder="Email Id"
            fullWidth
            inputProps={{
              sx: {
                "&::placeholder": {
                  color: "black",
                  opacity: 1,
                  fontSize: "0.9rem",
                  fontFamily: "var(--poppins-font)",
                },
              },
            }}
            className={styles.textField}
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
            error={errors?.email}
            helperText={errors?.email}
          />

          {/* <TextField
            type="number"
            variant="standard"
            placeholder="Contact"
            fullWidth
            inputProps={{
              sx: {
                "&::placeholder": {
                  color: "black",
                  opacity: 1,
                  fontSize: "0.9rem",
                  fontFamily: "var(--poppins-font)",
                },
              },
            }}
            className={styles.textField}
            value={formData.phoneNumber}
            onChange={(e) => {
              setFormData({ ...formData, phoneNumber: e.target.value });
            }}
          /> */}
          <TextField
            variant="standard"
            placeholder="Location"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <LocationOnIcon
                    color="#000000"
                    fontSize="0.9rem"
                    style={{
                      color: "black",
                    }}
                  />
                </InputAdornment>
              ),
            }}
            fullWidth
            inputProps={{
              sx: {
                "&::placeholder": {
                  color: "black",
                  opacity: 1,
                  fontSize: "0.9rem",
                  fontFamily: "var(--poppins-font)",
                },
              },
            }}
            className={styles.textField}
            value={formData.location}
            onChange={(e) => {
              setFormData({ ...formData, location: e.target.value });
            }}
            error={errors?.location}
            helperText={errors?.location}
          />

          <div className={styles.toggle}>
            <h4>Status</h4>
            <FormControlLabel
              control={
                <AntSwitch
                  value={formData.status}
                  checked={formData.status}
                  onChange={() => {
                    setFormData({ ...formData, status: !formData.status });
                  }}
                />
              }
              label={
                <span style={{ marginLeft: "8px" }}>
                  {formData.status ? "Active" : "Inactive"}
                </span>
              }
            />
          </div>
        </div>
        <div className={styles.rightCustomer}>
          <TextField
            variant="standard"
            placeholder="Last name"
            fullWidth
            inputProps={{
              sx: {
                "&::placeholder": {
                  color: "black",
                  opacity: 1,
                  fontSize: "0.9rem",
                  fontFamily: "var(--poppins-font)",
                },
              },
            }}
            className={styles.textField}
            value={formData.lastName}
            onChange={(e) => {
              const regex = /^[a-zA-Z]*$/;
              if (regex.test(e.target.value)) {
                if (e.target.value.length <= 15) {
                  setFormData({ ...formData, lastName: e.target.value });
                }
              }
            }}
            error={errors?.lastName}
            helperText={errors?.lastName}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerAdd;
