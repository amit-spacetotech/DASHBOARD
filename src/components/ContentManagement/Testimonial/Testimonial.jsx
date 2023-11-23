import React from "react";
import styles from "./Testimonial.module.css";
import DataTable from "react-data-table-component";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import editIconSvg from "../../../assets/svg/editIcon.svg";
import AppLoader from "../../utils/AppLoader/AppLoader";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Switch } from "@mui/material";
import axios from "axios";
import moment from "moment";

const Testimonial = (props) => {
  const [page, setPage] = React.useState(1);
  const [deleteId, setDeleteId] = React.useState();

  let isLoading = !props.testimonial;
  let showData = !isLoading;
  let rowData = [];

  const deleteTestimonial = (_id) => {
    setDeleteId(_id);
    axios({
      method: "put",
      url: `/content/updateTestimonial`,
      data: {
        _id: _id,
        deleted: true,
      },
    })
      .then((res) => {
        props.getTestimonial(10, 1, "");
        props.setActiveTab("TESTIMONIAL");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateStatus = (_id, status) => {
    axios({
      method: "put",
      url: `/content/updateTestimonial`,
      data: {
        _id: _id,
        status: status,
      },
    })
      .then((res) => {
        props.getTestimonial(10, 1, "");
        props.setActiveTab("TESTIMONIAL");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChange = (event, value) => {
    setPage(value);
    props.handleTestimonial(value);
  };
  !isLoading &&
    props.testimonial &&
    props.testimonial.forEach((data) => {
      rowData.push({
        ...data,
        date: moment(data.createdAt).format("DD MMM YYYY, h:mm A"),
        img: (
          <>
            <img
              src={data && data?.image}
              alt="NoImage"
              width="100"
              height="100"
            />
          </>
        ),
        status: (
          <Switch
            value={data.status}
            onChange={() => updateStatus(data._id, !data.status)}
            checked={data.status}
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
        ),
        action: (
          <div className={styles.actionButton}>
            <img
              onClick={() => props.handleState("EDIT_TESTIMONIAL", data)}
              style={{ marginRight: "0.8rem", cursor: "pointer" }}
              src={editIconSvg}
            />
            {data._id === deleteId ? (
              "...Deleting"
            ) : (
              <DeleteSweepIcon onClick={() => deleteTestimonial(data._id)} />
            )}
          </div>
        ),
      });
    });

  return (
    <div className={styles.content}>
      {isLoading && <AppLoader />}

      {showData && (
        <div className="table">
          <DataTable
            noHeader={true}
            fixedHeader={true}
            pagination={false}
            fixedHeaderScrollHeight={"calc(100vh - 220px)"}
            columns={[
              {
                name: "NAME",
                selector: "name",
                width:"150px",
                minWidth: "150px",
              },
              {
                name: "MEDIA UPLOADED",
                selector: "img",
                sortable: true,
                minWidth: "130px",
              },
              {
                name: "TIMESTAMP",
                selector: "date",
                sortable: true,
                minWidth: "150px",
              },
              {
                name: "POSITION",
                selector: "position",
                sortable: true,
                maxWidth: "200px",
              },
              {
                name: "DESCRIPTION",
                selector: "description",
                sortable: true,
                minWidth: "200px",
                maxWidth: "400px",
              },
              { name: "ACTION", selector: "action",width:"140px" },
              { name: "STATUS", selector: "status",width:"140px" },
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
export default Testimonial;
