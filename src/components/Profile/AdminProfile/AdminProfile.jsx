import React from "react";
import AppLoader from "../../utils/AppLoader/AppLoader";
import styles from "./AdminProfile.module.css";
import ProfileImg from "../../../assets/svg/altImage.svg";
import { TextField } from "@mui/material";

const AdminProfile = (props) => {
  let user = props.user;
  React.useEffect(() => {
    props.setProfile({
      ...props.profile,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
    });
  }, [user]);
  return (
    <div className={styles.content}>
      {!user && <AppLoader />}
      {user && (
        <>
          <div className={styles.leftContent}>
            <img
              src={
                props.profile.profileImage
                  ? props.profile.profileImage
                  : ProfileImg
              }
              alt="Profile"
            />

            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              accept="image/*"
              onChange={props.handleFileInputChange}
            />
            <h3 onClick={() => document.getElementById("fileInput").click()}>
              Change Profile Picture
            </h3>
          </div>
          <div className={styles.rightContent}>
            <TextField
              fullWidth
              value={props.profile.name ?? user.name}
              placeholder="Name"
              onChange={(e) => {
                props.setProfile({ ...props.profile, name: e.target.value });
              }}
              variant="standard"
              className={styles.textField}
            />
            <TextField
              fullWidth
              value={props.profile.email ?? user.email}
              onChange={(e) =>
                props.setProfile({ ...props.profile, email: e.target.value })
              }
              placeholder="EmailId"
              variant="standard"
              className={styles.textField}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AdminProfile;
