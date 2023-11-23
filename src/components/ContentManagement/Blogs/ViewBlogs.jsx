import React from "react";
import styles from "./Blogs.module.css";
import DataTable from "react-data-table-component";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import editIconSvg from "../../../assets/svg/editIcon.svg";
import AppLoader from "../../utils/AppLoader/AppLoader";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Switch } from "@mui/material";
import axios from "axios";

const ViewBlogs = (props) => {
  const [page, setPage] = React.useState(1);
  const [deleteId, setDeleteId] = React.useState(false);

  let isLoading = !props.blogs;
  let showData = !isLoading;
  let rowData = [];

  const deleteBlogs = (_id) => {
    setDeleteId(_id);
    axios({
      method: "put",
      url: `/content/updateBlog`,
      data: {
        _id: _id,
        deleted: true,
      },
    })
      .then((res) => {
        props.showAlert("Blog deleted successfully");
        props.getBlogs(10, 1, "");
        props.setActiveTab("BLOGS");
      })
      .catch((err) => {
        setDeleteId(false);
        console.log(err);
      });
  };

  const updateBlogStatus = (_id, status) => {
    axios({
      method: "put",
      url: `/content/updateBlog`,
      data: {
        _id: _id,
        status,
      },
    })
      .then((res) => {
        props.showAlert("Blog status updated successfully");
        props.getBlogs(10, 1, "");
        props.setActiveTab("BLOGS");
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
    props.blogs &&
    props.blogs.forEach((data) => {
      rowData.push({
        ...data,
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
            onChange={() => updateBlogStatus(data._id, !data.status)}
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
              onClick={() => props.handleState("ADD_BLOGS", data)}
              style={{ marginRight: "0.8rem", cursor: "pointer" }}
              src={editIconSvg}
            />
            {deleteId === data._id ? (
              "...deleting"
            ) : (
              <DeleteSweepIcon onClick={() => deleteBlogs(data._id)} />
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
                name: "BLOG NAME",
                selector: "name",
                maxWidth: "200px",
              },
              {
                name: "MEDIA UPLOADED",
                selector: "img",
                sortable: true,
                maxWidth: "200px",
              },
              // {
              //   name: "TIMESTAMP",
              //   selector: "createdAt",
              //   sortable: true,
              //   maxWidth: "200px",
              // },
              {
                name: "DESCRIPTION",
                selector: "description",
                sortable: true,
                minWidth: "400px",
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
export default ViewBlogs;
