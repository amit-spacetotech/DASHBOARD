import React, { useState, useEffect } from "react";
import styles from "./Auth.module.css";
import { TextField, InputAdornment } from "@mui/material";
import PassTextField from "../utils/passTextField/PassTextField";
import axios from "axios";
const Forgot = (props) => {
  const [current, setCurrent] = React.useState("EMAIL");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = [];
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTime, setResendTime] = useState(60);
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState({
    signUp: false,
    otp: false,
    email: false,
    reset: false,
  });

  function validateEmail(email) {
    const pattern = /^\S+[\w.-]*@[\w.-]+\.\w+$/;
    return pattern.test(email);
  }
  function validatePassword(password) {
    const pattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z\d])[\w\d\S]{8,}$/;
    return pattern.test(password);
  }

  const validatePasswordForm = () => {
    const newErrors = {};
    const basicForm = {
      password: "Password",
      confirmPassword: "Confirm password",
    };
    Object.keys(basicForm).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = `${basicForm[key]} is required`;
      }

      if (formData["password"] && !validatePassword(formData["password"])) {
        newErrors[
          "password"
        ] = `Password must be 8+ characters with at least 1 letter, 1 number & 1 special character.`;
      }

      if (
        formData["password"] !== formData["confirmPassword"] &&
        formData["confirmPassword"]
      ) {
        newErrors["confirmPassword"] = `Password mismatch`;
      }
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      return true;
    } else {
      return false;
    }
  };
  const handleSendOtp = () => {
    if (validateEmail(formData.email)) {
      setLoading({ ...loading, email: true });
      axios({
        method: "post",
        url: `/utils/sendOtp`,
        basic: true,
        headers: {
          Authorization:
            "Basic SE9NRVNIQVJFOlJBTkRPTUhPTUVTSEFSRVBBU1NXT1JEUE9JVVlUUkVRV0VSVFlVSQ==",
          "Content-Type": "application/json",
        },
        data: { email: formData.email, forgot: true, admin: true },
      })
        .then((res) => {
          setLoading({ ...loading, email: false });
          setCurrent("OTP");
        })
        .catch((err) => {
          setLoading({ ...loading, email: false });
          if (
            err &&
            err.response &&
            err.response.data &&
            err.response.data.message
          ) {
            alert(err.response.data.message);
          } else {
            alert("SOMETHING WENT WRONG ! PLEASE REFRESH YOUR PAGE");
          }
        });
    } else {
      setErrors({ ...errors, email: "Please enter valid email" });
    }
  };

  let confirmOtp = otp.join("");

  const handleInputChange = (e, index) => {
    const input = e.target;
    const maxLength = input.getAttribute("maxLength");
    const inputValue = input.value;

    if (e.nativeEvent.inputType === "deleteContentBackward") {
      // Check if Backspace key was pressed
      const newOtp = ["", "", "", ""]; // Clear the entire OTP state
      setOtp(newOtp);
      inputRefs[0].focus(); // Set focus to first input field
      return;
    }

    if (inputValue.length <= parseInt(maxLength)) {
      const newOtp = [...otp];
      newOtp[index] = inputValue;
      setOtp(newOtp);

      if (inputValue.length === parseInt(maxLength)) {
        if (inputRefs[index + 1]) {
          inputRefs[index + 1].focus();
        }
      }
    }
  };
  const forgotPassword = () => {
    if (validatePasswordForm()) {
      setLoading({ ...loading, reset: true });
      axios({
        method: "put",
        url: `/adminAuth/forgotPassword`,
        basic: true,
        headers: {
          Authorization:
            "Basic SE9NRVNIQVJFOlJBTkRPTUhPTUVTSEFSRVBBU1NXT1JEUE9JVVlUUkVRV0VSVFlVSQ==",
          "Content-Type": "application/json",
        },
        data: { email: formData.email, password: formData.password },
      })
        .then((res) => {
          props.setState("LOGIN");
          alert("Password updated successfully");
        })
        .catch((err) => {
          err.response &&
            err.response.data &&
            err.response.data.message &&
            alert(err.response.data.message);
          setLoading({ ...loading, reset: false });
        });
    }
  };
  const verifyOtp = () => {
    if (String(otp).length > 3) {
      setLoading({ ...loading, otp: true, signUp: false });
      axios({
        method: "post",
        url: `/utils/verifyOtp`,
        basic: true,
        headers: {
          Authorization:
            "Basic SE9NRVNIQVJFOlJBTkRPTUhPTUVTSEFSRVBBU1NXT1JEUE9JVVlUUkVRV0VSVFlVSQ==",
          "Content-Type": "application/json",
        },
        data: { email: formData.email, otp: Number(confirmOtp) },
      })
        .then((res) => {
          setLoading({ ...loading, otp: false, signUp: false });
          setCurrent("RESET");
        })
        .catch((err) => {
          setLoading({ ...loading, otp: false });

          setErrors({
            ...errors,
            otp: err.response && err.response.data && err.response.data.error,
          });
        });
    } else {
      setErrors({
        ...errors,
        otp: "Please enter OTP",
      });
    }
  };
  console.log(errors);
  useEffect(() => {
    let timer;
    if (resendTime > 0 && resendDisabled) {
      timer = setTimeout(() => {
        setResendTime(resendTime - 1);
      }, 1000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [resendTime, resendDisabled]);

  // Show Resend button when countdown is over
  useEffect(() => {
    if (resendTime === 0 && resendDisabled) {
      setResendDisabled(false);
    }
  }, [resendTime, resendDisabled]);

  return (
    <div className={styles.forgotContainer}>
      {current === "EMAIL" && (
        <div className={styles.forgotContent}>
          <div className={styles.header}>
            <h2>FORGOT PASSWORD?</h2>
            <p>Enter your registered email id</p>
            <div className={styles.fields}>
              <TextField
                size="sm"
                variant="standard"
                style={{ marginTop: "2rem" }}
                fullWidth
                placeholder="Email"
                errors={errors.email}
                helperText={errors.email}
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <button className={styles.login} onClick={() => handleSendOtp()}>
              {loading.email ? "Sending code..." : "Send verification code"}
            </button>
          </div>
        </div>
      )}

      {current === "OTP" && (
        <div className={styles.forgotContent}>
          <div className={styles.header}>
            <h2>Check your email</h2>
            <p>
              Verification code has been shared to your provided email id{" "}
              <span>
                {formData.email.replace(
                  formData.email.slice(3, 10),
                  "*".repeat(5)
                )}
              </span>
            </p>
            <div className={styles.fields}>
              <div className={styles.flexComp}>
                {Array(4)
                  .fill(null)
                  .map((_, index) => (
                    <div className={styles.otpInput} key={index}>
                      <input
                        type="number"
                        maxLength="1"
                        ref={(input) => (inputRefs[index] = input)}
                        value={otp[index]}
                        onChange={(e) => handleInputChange(e, index)}
                        placeholder="-"
                        className={styles.otpInputTag}
                      />
                    </div>
                  ))}
              </div>
              {errors && errors.otp && (
                <span className={styles.errors}>{errors.otp}</span>
              )}
              {resendDisabled ? (
                <h4>Resend code in {resendTime} seconds</h4>
              ) : (
                <h4>
                  Did not receive the verification code?{" "}
                  <span>
                    <u>Resend Code</u>
                  </span>
                </h4>
              )}
            </div>
            <button
              className={styles.login}
              style={{ margin: "1.2rem 0" }}
              onClick={() => verifyOtp()}
            >
              {loading.otp ? "Verifying..." : "Submit"}
            </button>
          </div>
        </div>
      )}
      {current === "RESET" && (
        <div className={styles.forgotContent}>
          <div className={styles.header}>
            <h2>Reset password</h2>
            <p>
              Your code has been verified. Please ensure your new password is
              strong
            </p>
          </div>
          <div className={styles.fields}>
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
              errors={errors.password}
              helperText={errors.password}
              placeholder="Password"
              variant="standard"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
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
              errors={errors.confirmPassword}
              helperText={errors.confirmPassword}
              placeholder="Confirm password"
              variant="standard"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
          </div>
          <button
            className={styles.login}
            style={{ margin: "1.2rem 0" }}
            onClick={() => forgotPassword()}
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
};
export default Forgot;
