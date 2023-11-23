import { Checkbox, TextField, FormControlLabel } from "@mui/material";
import React from "react";
import PassTextField from "../utils/passTextField/PassTextField";
import styles from "./Auth.module.css";
import axios from "axios";
import logo from "../../assets/svg/logo.svg";
import loginImg from "../../assets/img/login.png";
import Forgot from "./Forgot";

const Auth = (props) => {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [loading, setLoading] = React.useState(false);
  const [state, setState] = React.useState("LOGIN");
  const [error, setError] = React.useState({
    email: false,
    password: false,
  });
  function generateRandomAlphabets() {
    const alphabets = "abcdefghijklmnopqrstuvwxyz";
    let result = "";
    for (let i = 0; i < 7; i++) {
      result += alphabets.charAt(Math.floor(Math.random() * alphabets.length));
    }
    return result;
  }
  const validate = () => {
    const newErrors = {};

    let errorMsg = {
      email: "Email",
      password: "Password",
    };
    Object.keys(formData).forEach((key) => {
      if (!formData[key] && key !== "rememberMe") {
        newErrors[key] = `${errorMsg[key]} field is required`;
      }
    });
    setError(newErrors);
    if (Object.keys(newErrors).length === 0) {
      return true;
    }
  };
  const login = () => {
    if (formData.rememberMe) {
      const randomStart = generateRandomAlphabets();
      const randomEnd = generateRandomAlphabets();
      let newPassword = randomStart + formData.password + randomEnd;
      localStorage.setItem("emailAd", formData.email);
      localStorage.setItem("passwordAd", newPassword);
    }
    if (!formData.rememberMe) {
      localStorage.removeItem("emailAd");
      localStorage.removeItem("passwordAd");
    }
    if (validate()) {
      setLoading(true);
      axios({
        method: "post",
        url: `/adminAuth/loginAdmin`,
        data: { ...formData },
      })
        .then((res) => {
          setLoading(false);
          localStorage.setItem("token", res.data.token);
          window.location.replace("/home");
        })
        .catch((err) => {
          setLoading(false);
          console.log(err, err.response.data, "ERRRR");
          if (
            err.response.data.error &&
            err.response.data.error == "Please enter valid email"
          ) {
            setError({ ...error, email: err.response.data.error });
          } else {
            setError({ ...error, email: "" });
          }
          if (
            err.response.data.error &&
            err.response.data.error == "Please enter correct password"
          ) {
            setError({ ...error, password: err.response.data.error });
          }
          if (err.response.data.errors[0].msg) {
            setError({ ...error, email: err.response.data.errors[0].msg });
          }
        });
    }
  };

  React.useEffect(() => {
    if (localStorage.getItem("emailAd") || localStorage.getItem("passwordAd")) {
      let rememberedPassword = localStorage.getItem("passwordAd");
      const stringWithoutStart = rememberedPassword.slice(7);
      const stringWithoutEnd = stringWithoutStart.slice(0, -7);
      rememberedPassword = stringWithoutEnd;
      setFormData({
        ...formData,
        email: localStorage.getItem("emailAd"),
        password: rememberedPassword,
        rememberMe: true,
      });
    }
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.leftContent}>
          <img src={logo} className={styles.logo} />
          <img src={loginImg} alt="img..." className={styles.img} />
        </div>
        <div className={styles.rightContent}>
          {state === "LOGIN" && (
            <>
              <h3>Login To Admin</h3>

              <TextField
                fullWidth
                required
                placeholder="Email"
                className={styles.textField}
                inputProps={{
                  sx: {
                    "&::placeholder": {
                      color: "black",
                      opacity: 1,
                      fontFamily: "var(--poppins-font)",
                    },
                  },
                }}
                // InputProps={{
                //   style: {
                //     color: "darkviolet",
                //     opacity:1
                //   },
                // }}
                variant="standard"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                error={error.email}
                helperText={error.email}
              />
              <PassTextField
                fullWidth
                required
                inputProps={{
                  sx: {
                    "&::placeholder": {
                      color: "black",
                      opacity: 1,
                      fontFamily: "var(--poppins-font)",
                    },
                  },
                }}
                className={styles.textField}
                error={error.password}
                helperText={error.password}
                placeholder="Password"
                variant="standard"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />

              <div className={styles.flex}>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={formData.rememberMe}
                      value={formData.rememberMe}
                      onChange={(e) => {
                        console.log(e.target.value, ":SDSDSD");
                        setFormData({
                          ...formData,
                          rememberMe: !formData.rememberMe,
                        });
                      }}
                    />
                  }
                  label="Remember me"
                />
                <p
                  onClick={() => setState("FORGOT")}
                  style={{ cursor: "pointer" }}
                >
                  Forgot Password?
                </p>
              </div>

              <button className={styles.login} onClick={login}>
                {loading ? "...Please Wait" : "Login"}
              </button>
            </>
          )}

          {state === "FORGOT" && <Forgot setState={setState} state={state} />}
        </div>
      </div>
    </div>
  );
};

export default Auth;
