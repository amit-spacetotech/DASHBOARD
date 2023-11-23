import React from "react";
import styles from "../ContentManagement.module.css";
import { TextField, Switch, FormControlLabel } from "@mui/material";
import axios from "axios";
import AWS from "aws-sdk";
import handleFileUpload from "../../utils/uploadImage";
import uploadSvg from "../../../assets/svg/upload.svg";

const AddTestimonial = (props) => {
  const [formData, setFormData] = React.useState({
    name: "",
    image: "",
    description: "",
    position: "",
    status: true,
  });
  const [imageUploading, setImageUploading] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [formError, setFormError] = React.useState({});
  const validate = () => {
    const newErrors = {};

    const errorMessage = {
      name: "Name",
      image: "Image",
      description: "Description",
      position: "Position",
    };
    Object.keys(errorMessage).forEach((key) => {
      if (!formData[key] && key !== "status") {
        newErrors[key] = `${errorMessage[key]} is required`;
      }
    });

    setFormError(newErrors);
    if (Object.keys(newErrors).length === 0) {
      return true;
    }
  };

  React.useEffect(() => {
    if (props.data) {
      setFormData({ ...formData, ...props.data });
    }
  }, [props.data]);
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

  const updateTestimonial = () => {
    if (validate()) {
      setLoading(true);
      axios({
        method: "put",
        url: `/content/updateTestimonial`,
        data: {
          _id: props.data ? props.data._id : "",
          ...formData,
        },
      })
        .then((res) => {
          setLoading(false);
          props.getTestimonial(10, 1, "");
          props.setActiveTab("TESTIMONIAL");
          props.showAlert(
            `Testimonial ${props.data ? "updated" : "added"} successfully`
          );
        })
        .catch((err) => {
          setLoading(false);
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
            onClick={() => props.setActiveTab("TESTIMONIAL")}
          >
            Testimonials
          </span>{" "}
          {">"} {props.data ? "Edit" : "Add"} Testimonial
        </div>

        <div className={styles.rightHeader}>
          <button onClick={() => updateTestimonial()}>
            {loading ? "...Saving" : "Save"}
          </button>
          <button
            style={{
              background: "transparent",
              color: "black",
              border: "black solid 1px",
            }}
            onClick={() => props.setActiveTab("TESTIMONIAL")}
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
            className={styles.textField}
            onChange={(e) => {
              if (e.target.value.length <= 30) {
                setFormData({ ...formData, name: e.target.value });
              }
            }}
            value={formData.name}
            helperText={formError.name}
            error={formError.name}
          />
          <TextField
            required
            variant="standard"
            placeholder="Position"
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
            fullWidth
            className={styles.textField}
            onChange={(e) => {
              if (e.target.value.length <= 50) {
                setFormData({ ...formData, position: e.target.value });
              }
            }}
            value={formData.position}
            helperText={formError.position}
            error={formError.position}
          />
          {imageUploading && imageUploading != "ERROR" && (
            <span
              style={{ color: "red", fontSize: "0.8rem", fontWeight: "400" }}
            >
              Image uploding in Progress Please wait
            </span>
          )}
          {imageUploading === "ERROR" && (
            <span
              style={{ color: "red", fontSize: "0.8rem", fontWeight: "400" }}
            >
              Image uploding Failed, Please reupload
            </span>
          )}
          <div
            className={`${styles.media} ${
              formError.image && styles.errorBoundary
            } ${!formError.image && styles.testMedia}`}
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
          {formError.image && (
            <span className={styles.error}>{formError.image}</span>
          )}
          {formError.image && <br />}

          <label className={styles.testLabel}>Description</label>
          <TextField
            required
            multiline
            rows={7}
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
            sx={{
              marginTop: "0.5rem",
              borderRadius: "10px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
              },
            }}
            variant="outlined"
            placeholder="Description"
            fullWidth
            onChange={(e) => {
              if (e.target.value.length <= 500) {
                setFormData({ ...formData, description: e.target.value });
              }
            }}
            value={formData.description}
            helperText={formError.description}
            error={formError.description}
          />
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

export default AddTestimonial;
