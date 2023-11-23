import React from "react";
import styles from "./Profile.module.css";
import { connect } from "react-redux";
import { Tabs, Tab, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import AdminProfile from "./AdminProfile/AdminProfile";
// import Faq from "./Faq/Faq";
// import Terms from "./Terms/Terms";
// import ContactUs from "./ContactUs/ContactUs";
import { getUser } from "../../actions/auth/action";
import axios from "axios";
import Authentication from "./Authentication/Authentication";
import { showAlert } from "../../actions/auth/action";
import handleFileUpload from "../utils/uploadImage";

const useStyles = makeStyles((theme) => ({
  tabBorder: {
    borderBottom: "solid 3px #F8CD46!important",
    color: "#323232 !important",
    fontFamily: "var(--poppins-font) !important",
    "&>span": {
      color: "#F8CD46 !important",
    },
  },
}));
const Profile = (props) => {
  const classes = useStyles();
  const [activeTab, setActiveTab] = React.useState("Profile");
  const [imageUploading, setImageUploading] = React.useState(false);
  const [profile, setProfile] = React.useState({
    name: "",
    email: "",
    profileImage: "",
  });
  const [password, setPassword] = React.useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  React.useEffect(() => {
    if (!props.auth) {
      props.getUser();
    }
  }, [props.auth]);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setImageUploading(true);
    let url = handleFileUpload(file)
      .then((val) => {
        setProfile({ ...profile, profileImage: val });
        setImageUploading(false);
      })
      .catch((err) => [setImageUploading(false)]);
  };

  //   const handleFaq = (page) => {
  //     setFaqPage(page);
  //     props.getAllFaq(10, page ?? faqPage, faqSearch);
  //   };

  //   const handleSearch = (value) => {
  //     setSearchVal(value);
  //     if (activeTab === "FAQ") {
  //       setFaqSearch(value);
  //       props.getAllFaq(10, faqPage, value);
  //     }
  //   };

  const updateProfile = () => {
    axios({
      method: "put",
      url: `/adminUser/updateUser`,
      data: { ...profile },
    })
      .then((res) => {
        props.getUser();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updatePassword = () => {
    if (password.newPassword === password.confirmPassword) {
      axios({
        method: "put",
        url: `/adminUser/forgotPassword`,
        data: {
          email: props.auth.email,
          password: password.confirmPassword,
          oldPassword: password.oldPassword,
        },
      })
        .then((res) => {
          props.getUser();
        })
        .catch((err) => {
          err &&
            err.response.data &&
            err.response.data.message &&
            props.showAlert(err.response.data.message);
          err &&
            err.response.data &&
            err.response.data.errors &&
            err.response.data.errors.length > 0 &&
            props.showAlert(err.response.data.errors[0].msg);
        });
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <>
          <div className={styles.header}>
            <div className={styles.leftHeader}>Admin Settings</div>

            <div className={styles.rightHeader}>
              <button
                onClick={() => {
                  activeTab === "Profile" && updateProfile();
                  activeTab === "Authentication" && updatePassword();
                }}
              >
                Save
              </button>

              <button
                style={{
                  background: "transparent",
                  color: "black",
                  border: "1px solid black",
                }}
                // onClick={activeTab === "Privacy" ? updatePrivacy : updateTerms}
              >
                delete
              </button>
            </div>
          </div>

          <div className={styles.headerTab}>
            <Tabs
              className={styles.tabs}
              value={activeTab}
              onChange={(e, val) => setActiveTab(val)}
            >
              <Tab
                className={activeTab === "Profile" && classes.tabBorder}
                label="Admin Profile"
                value="Profile"
              />

              <Tab
                className={activeTab === "Authentication" && classes.tabBorder}
                label={"Authentication"}
                value="Authentication"
              />
            </Tabs>
          </div>
        </>

        <div className={styles.whiteBg}>
          {activeTab === "Profile" && (
            <>
              <AdminProfile
                user={props.auth}
                setProfile={setProfile}
                profile={profile}
                handleFileInputChange={handleFileInputChange}
              />
            </>
          )}

          {activeTab === "Authentication" && (
            <>
              <Authentication setPassword={setPassword} password={password}  />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth.user,
});
export default connect(mapStateToProps, { getUser, showAlert })(Profile);
