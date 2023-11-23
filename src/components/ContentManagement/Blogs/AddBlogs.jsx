import React from "react";
import styles from "../ContentManagement.module.css";
import { TextField, Switch, FormControlLabel } from "@mui/material";
import axios from "axios";
import AWS from "aws-sdk";
import handleFileUpload from "../../utils/uploadImage";
import uploadSvg from "../../../assets/svg/upload.svg";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const s3 = new AWS.S3({
  accessKeyId: process.env.REACT_APP_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_REGION,
});
const AddBlogs = (props) => {
  const [formData, setFormData] = React.useState({
    name: "",
    image: "",
    description: "",
    status: true,
  });
  const [imageUploading, setImageUploading] = React.useState(false);
  const [formError, setFormError] = React.useState({});

  const validate = () => {
    const newErrors = {};

    const errorMessage = {
      name: "Name",
      image: "Image",
      description: "Description",
    };
    Object.keys(formData).forEach((key) => {
      if (
        !formData[key] &&
        key !== "status" &&
        key !== "__v" &&
        key !== "deleted"
      ) {
        newErrors[key] = `${errorMessage[key]} is required`;
      }
    });

    setFormError(newErrors);
    if (Object.keys(newErrors).length === 0) {
      return true;
    }
  };

  const handleDescription = (e) => {
    setFormData({ ...formData, description: e });
  };

  React.useEffect(() => {
    if (props.data) {
      setFormData({ ...formData, ...props.data });
    }
  }, []);
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setImageUploading(true);
    let url = handleFileUpload(file)
      .then((val) => {
        setFormData({ ...formData, image: val });
        setImageUploading(false);
      })
      .catch((err) => [setImageUploading("ERROR")]);
  };

  const updateBlogs = () => {
    let obj = {};
    if (props.data) {
      obj["_id"] = props.data._id;
    }

    if (validate()) {
      axios({
        method: "put",
        url: `/content/updateBlog`,
        data: {
          ...obj,
          ...formData,
        },
      })
        .then((res) => {
          props.showAlert("Blog added successfully");
          props.handleBlog();
          props.setActiveTab("BLOGS");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.leftHeader}>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => props.setActiveTab("BLOGS")}
          >
            Blogs
          </span>{" "}
          {">"} {props.data ? "Edit" : "Add"} Blogs
        </div>

        <div className={styles.rightHeader}>
          <button onClick={() => updateBlogs()}>Save</button>
          <button
            style={{
              background: "transparent",
              color: "black",
              border: "black solid 1px",
            }}
            onClick={() => props.setActiveTab("BLOGS")}
          >
            Delete
          </button>
        </div>
      </div>
      <div className={styles.backGroundContainer}>
        <div className={styles.faqContent}>
          <TextField
            required
            variant="standard"
            placeholder="Title"
            fullWidth
            inputProps={{
              sx: {
                fontSize: "14px",
                "&::placeholder": {
                  color: "black",
                  opacity: 1,

                  fontFamily: "var(--poppins-font)",
                },
              },
            }}
            onChange={(e) => {
              if (e.target.value.length <= 100) {
                setFormData({ ...formData, name: e.target.value });
              }
            }}
            value={formData.name}
            helperText={formError.name}
            error={formError.name}
          />

          <div
            className={`${styles.media} ${
              formError.image && styles.errorBoundary
            } ${styles.blogMedia}`}
          >
            {formData.image && (
              <img
                src={formData.image}
                alt="Blog"
                className={styles.uploadedMedia}
              />
            )}
            {!formData.image && <p>Upload media</p>}

            <label htmlFor="file-upload">
              <img src={uploadSvg} className={styles.icon} />
            </label>
            <input
              id="file-upload"
              type="file"
              style={{ display: "none" }}
              onChange={handleFileInputChange}
            />
          </div>
          {imageUploading && imageUploading != "ERROR" && (
            <span
              style={{
                position: "relative",
                top: "-10px",
                color: "red",
                fontSize: "0.72rem",
                fontWeight: 400,
              }}
            >
              Image uploding in Progress Please wait
            </span>
          )}
          {imageUploading === "ERROR" && (
            <span
              style={{
                position: "relative",
                top: "-10px",
                color: "red",
                fontSize: "0.72rem",
                fontWeight: 400,
              }}
            >
              Image uploding Failed, Please reupload
            </span>
          )}
          {!imageUploading && formError.image && (
            <span
              style={{
                position: "relative",
                top: "-10px",
                color: "red",
                fontSize: "0.72rem",
                fontWeight: 400,
              }}
            >
              {formError.image}
            </span>
          )}

          <div>
            <label className={styles.blogLabel}>Description</label>
            <ReactQuill
              placeholder="Enter Privacy Policies"
              theme="snow"
              value={formData?.description}
              onChange={(e) => handleDescription(e)}
            />
            {/* <TextField
              required
              multiline
              rows={7}
              sx={{
                marginTop: "7px",
                borderRadius: "10px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
              }}
              inputProps={{
                sx: {
                  fontSize: "14px",
                  "&::placeholder": {
                    color: "black",
                    opacity: 1,

                    fontFamily: "var(--poppins-font)",
                  },
                },
              }}
              variant="outlined"
              fullWidth
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              value={formData.description}
              helperText={formError.description}
              error={formError.description}
            /> */}
          </div>
          <div className={styles.toggle}>
            <h4>Status</h4>
            <FormControlLabel
              control={
                <Switch
                  onChange={() => {
                    setFormData({ ...formData, status: !formData.status });
                  }}
                  checked={formData.status}
                  sx={{
                    "&.MuiSwitch-root .MuiSwitch-track": {
                      backgroundColor: "white !important",
                      border: "solid 1px black",
                    },
                    "&.MuiSwitch-root .Mui-checked": {
                      color: "#F8CD46",
                      width: "40px",
                    },
                  }}
                />
              }
              label={formData.status ? "Active" : "InActive"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBlogs;
