import React from "react";
import AppLoader from "../../utils/AppLoader/AppLoader";
import styles from "./Story.module.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import moment from "moment";
import handleFileUpload from "../../utils/uploadImage";
import uploadSvg from "../../../assets/svg/upload.svg";
const Story = (props) => {
  const [imageUploading, setImageUploading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    image: "",
  });

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setImageUploading(true);
    let url = handleFileUpload(file)
      .then((val) => {
        props.handleChangeImg(val);
        setFormData({ ...formData, image: val });
        setImageUploading(false);
      })
      .catch((err) => [setImageUploading("ERROR")]);
  };

  return (
    <div className={styles.content}>
      {/* {!props.privacy && <AppLoader />} */}
      {/* {(props.privacy || props.privacy === "NO_DATA") && ( */}
      <>
        <h4>Last Updated On: </h4>
        {imageUploading && imageUploading != "ERROR" && (
          <span style={{ color: "red", fontSize: "0.8rem", fontWeight: "400" }}>
            Image uploding in Progress Please wait
          </span>
        )}
        {imageUploading === "ERROR" && (
          <span style={{ color: "red", fontSize: "0.8rem", fontWeight: "400" }}>
            Image uploding Failed, Please reupload
          </span>
        )}
        <div className={`${styles.media} `}>
          {(props.storyData.img || formData.image) && (
            <img
              src={props.storyData.img ? props.storyData.img : formData.image}
              alt="Blog"
              className={styles.uploadedMedia}
            />
          )}
          {!props.storyData.img && !formData.image && <p>Upload media</p>}

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
        <ReactQuill
          placeholder="Enter Something..."
          theme="snow"
          value={
            props.story.text && props.story.text !== "<p><br></p>"
              ? props.story.text
              : props.storyData.text
          }
          onChange={props.handleChange}
        />
      </>
      {/* )} */}
    </div>
  );
};

export default Story;
