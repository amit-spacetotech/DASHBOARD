import React from "react";
import styles from "../ContentManagement.module.css";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";
const AddFaq = (props) => {
  const [formData, setFormData] = React.useState({
    question: "",
    answer: "",
  });
  const [formError, setFormError] = React.useState({
    question: false,
    answer: false,
  });
  const validate = () => {
    let err = false;

    if (formData.question === "") {
      err = true;
      setFormError({ ...formError, question: "Field Required" });
    }
    if (formData.answer === "") {
      err = true;
      setFormError({ ...formError, answer: "Field Required" });
    }
    return err;
  };
 
  const updateFaq = () => {
    if (!validate()) {
      axios({
        method: "put",
        url: `/content/updateFaq`,
        data: {
          ...formData,
        },
      })
        .then((res) => {
          props.getAllFaq();
          props.setActiveTab("FAQ");
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
          <span>FAQ</span> {">"} Add Faq
        </div>

        <div className={styles.rightHeader}>
          <button onClick={updateFaq}>Save</button>
          <button
            style={{
              background: "transparent",
              color: "black",
              border: "black solid 1px",
            }}
            onClick={() => props.setActiveTab("FAQ")}
          >
            Delete
          </button>
        </div>
      </div>
      <div className={styles.faqContent}>
        <FormControl variant="standard" fullWidth>
          <InputLabel id="demo-simple-select-standard-label">
            Select Category
          </InputLabel>
          <Select
            fullWidth
            // value={formData.category}
            // onChange={(e) =>
            //   setFormData({ ...formData, category: e.target.value })
            // }
          >
            {/* {props.category.map((val) => {
              return (
                <MenuItem value={val._id}>
                  <em>{val.categoryName}</em>
                </MenuItem>
              );
            })} */}
          </Select>
        </FormControl>
        <TextField
          required
          variant="standard"
          placeholder="Question"
          fullWidth
          className={styles.textField}
          onChange={(e) =>
            setFormData({ ...formData, question: e.target.value })
          }
          value={formData.question}
          helperText={formError.question}
          error={formError.question}
        />
        <TextField
          required
          variant="standard"
          placeholder="Answer"
          fullWidth
          className={styles.textField}
          onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
          value={formData.answer}
          helperText={formError.answer}
          error={formError.answer}
        />
      </div>
    </div>
  );
};

export default AddFaq;
