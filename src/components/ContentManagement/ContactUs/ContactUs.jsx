import React from "react";
import styles from "./ContactUs.module.css";
import AppLoader from "../../utils/AppLoader/AppLoader";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Switch, TextField } from "@mui/material";
import axios from "axios";
import DataTable from "react-data-table-component";
import CustomModal from "../../utils/Modal/Modal";
import { showAlert } from "../../../actions/auth/action";
import { connect } from "react-redux";
import moment from "moment";
const ContactUs = (props) => {
  const [page, setPage] = React.useState(1);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [reply, setReply] = React.useState({
    email: "",
    message: "",
  });

  let isLoading = !props.contacts;
  let showData = !isLoading;
  let rowData = [];

  const replyBack = () => {
    if (reply.message == "") {
      setError("Please input message");
      return;
    }
    setLoading(true);
    axios({
      method: "post",
      url: `/contact/replyBack`,
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: {
        ...reply,
      },
    })
      .then((res) => {
        setOpen(false);
        setLoading(false);
        setReply({ ...reply, email: "", message: "" });
        props.showAlert("Replied back successfully");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleChange = (event, value) => {
    setPage(value);
    props.getContactUs(10, value, "");
    // props.handleTestimonial(value);
  };
  !isLoading &&
    props.contacts &&
    props.contacts.forEach((data) => {
      rowData.push({
        ...data,
        timeStamp: moment(data.createdAt).format("DD MMM YYYY, h:mm A"),
        action: (
          <div
            style={{ textDecoration: "underline", cursor: "pointer" }}
            onClick={() => {
              setReply({
                ...reply,
                email: data.email,
              });
              setOpen(true);
            }}
          >
            Reply
          </div>
        ),
      });
    });
  return (
    <div className={styles.content}>
      {isLoading && <AppLoader />}
      <CustomModal
        open={open}
        onClose={() => setOpen(false)}
        bodyStyle={{
          borderRadius: "15px",
          border: 0,
          background: "#f6f1e9",
          width: "700px",
          height: "400px",
        }}
        bodyContent={
          <div className={styles.main}>
            <h2>Send message</h2>

            <p>Message</p>
            <TextField
              placeholder="Type your message here..."
              fullWidth
              sx={{
                background: "white",
                "&::placeholder": {
                  color: "black",
                  fontWeight: "bold",
                },
              }}
              inputProps={{
                style: {
                  padding: 0,
                },
              }}
              InputProps={{
                style: {
                  border: "solid 1px #707070",
                  borderRadius: "10px",
                },
              }}
              multiline
              rows={7}
              value={reply.message}
              onChange={(e) => setReply({ ...reply, message: e.target.value })}
              error={error}
              helperText={error}
            />

            <button onClick={() => replyBack()}>
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        }
      />
      {showData && (
        <div className="table">
          <DataTable
            noHeader={true}
            fixedHeader={true}
            pagination={false}
            fixedHeaderScrollHeight={"calc(100vh - 220px)"}
            columns={[
              {
                name: "CONTACT ID",
                selector: "_id",
                width: "250px",
                maxWidth: "250px",
              },
              {
                name: "NAME",
                selector: "firstName",
                sortable: true,
                maxWidth: "200px",
              },

              {
                name: "EMAIL ID",
                selector: "email",
                sortable: true,
                minWidth: "250px",
                maxWidth: "250px",
              },
              { name: "TYPE", selector: "type" },
              {
                name: "TIMESTAMP",
                selector: "timeStamp",
                sortable: true,
                width: "220px",
                maxWidth: "250px",
              },
              {
                name: "DESCRIPTION",
                selector: "description",
                sortable: true,
                width: "200px",
                maxWidth: "400px",
              },
              { name: "ACTION", selector: "action" },
              { name: "STATUS", selector: "status" },
            ]}
            data={rowData}
          />
        </div>
      )}
      <Stack spacing={2} className="pagination">
        <Pagination count={props.count} page={page} onChange={handleChange} />
      </Stack>
    </div>
  );
};

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { showAlert })(ContactUs);
