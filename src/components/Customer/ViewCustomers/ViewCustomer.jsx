import React from "react";
import styles from "../Customer.module.css";
import {
  TextField,
  FormControlLabel,
  InputAdornment,
  Checkbox,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Switch, { SwitchProps } from "@mui/material/Switch";
import moment from "moment";
import SearchIcon from "@mui/icons-material/Search";
import DataTable from "react-data-table-component";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import AppLoader from "../../utils/AppLoader/AppLoader";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getAllCustomers } from "../../../actions/customer/action";

import axios from "axios";
import editIconSvg from "../../../assets/svg/editIcon.svg";
import { showAlert } from "../../../actions/auth/action";
const Customer = (props) => {
  const [page, setPage] = React.useState(1);
  const [checkList, setCheckList] = React.useState([]);
  const [searchVal, setSearchVal] = React.useState("");
  const [deleteId, setDeleteId] = React.useState();
  const [exporting, setExporting] = React.useState(false);

  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 36,
    height: 16,
    padding: 0,
    marginLeft: 20,
    display: "flex",
    "&:active": {
      "& .MuiSwitch-thumb": {
        width: 15,
      },
      "& .MuiSwitch-switchBase.Mui-checked": {
        transform: "translateX(9px)",
      },
    },
    "& .MuiSwitch-switchBase": {
      padding: 2,
      "&.Mui-checked": {
        // transform: 'translateX(12px)',
        color: "#F8CD46",
        "& + .MuiSwitch-track": {
          opacity: 1,
          border: "solid 1px black",
          backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "white",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(["width"], {
        duration: 200,
      }),
    },

    "& .MuiSwitch-track": {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === "dark" ? "white" : "rgba(0,0,0,.25)",
      boxSizing: "border-box",
    },
  }));

  const downloadCsv = () => {
    setExporting(true);
    axios({
      method: "post",
      url: `/utils/downloadMatesCsv`,
      basic: true,
      headers: {
        Authorization:
          "Basic SE9NRVNIQVJFOlJBTkRPTUhPTUVTSEFSRVBBU1NXT1JEUE9JVVlUUkVRV0VSVFlVSQ==",
      },
      data: {
        id: checkList.length > 0 ? checkList : false,
      },
    })
      .then((res) => {
        setExporting(false);
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "user.csv"); //or any other extension
        document.body.appendChild(link);
        link.click();
      })
      .catch((err) => {
        setExporting(false);
        console.log(err);
      });
  };

  React.useEffect(() => {
    props.getAllCustomers(10, page, "");
  }, []);
  const handleChange = (event, value) => {
    setPage(value);
    props.getAllCustomers(10, value, searchVal);
  };
  const handleSearch = (search) => {
    setSearchVal(search);
    props.getAllCustomers(10, 1, search ?? searchVal);
  };

  const updateAllCheckList = () => {
    props.customer &&
      props.customer.map((val) => {
        if (!checkList.includes(val._id)) {
          setCheckList((prevCheckList) => [...prevCheckList, val._id]);
        } else {
          setCheckList([]);
        }
      });
  };
  // const updateAllCheckList = () => {
  //   props.customer &&
  //     props.customer.map((val) => {
  //       if (!checkList.includes(val._id)) {
  //         setCheckList([...checkList, val._id]);
  //       } else {
  //         setCheckList([]);
  //       }
  //     });
  // };

  const updateSingleCheckList = (value) => {
    if (checkList.includes(value)) {
      // Filter out the value if it's already present
      const filteredCheckList = checkList.filter((item) => item !== value);
      setCheckList(filteredCheckList);
    } else {
      // Add the value to the checkList
      setCheckList([...checkList, value]);
    }
  };

  const updateUser = (_id, data) => {
    axios({
      method: "put",
      url: `/customer/updateCustomer`,
      data: {
        _id,
        ...data,
      },
    })
      .then((res) => {
        props.getAllCustomers(10, page, "");
        props.showAlert(`${data.deleted ? "Deleted" : "Updated"} Successfully`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let isLoading = !props.customer;
  let showData = !isLoading;
  let rowData = [];

  function checkIdsExist(array1, array2) {
    if (array2.length === 0) {
      return false;
    }
    const idsSet = new Set(array2);
    return array1.every(item => idsSet.has(item._id));
  }

  !isLoading &&
    props.customer.forEach((user) => {
      rowData.push({
        ...user,
        select: (
          <Checkbox
            checked={checkList.includes(user._id)}
            onChange={() => updateSingleCheckList(user._id)}
          />
        ),
        email: user.email,
        lastName: user?.userProfile?.lastName,
        profileCreated: moment(user?.userProfile?.createdAt).format(
          "DD MMM YYYY, h:mm A"
        ),
        accountCreated: moment(user?.createdAt).format("DD MMM YYYY, h:mm A"),
        location: user?.userProfile?.location,
        name: (
          <span
            style={{ textDecoration: "underline", cursor: "pointer" }}
            onClick={() => props.handleClick(user, "USER-INFO")}
          >
            {user?.userProfile?.firstName}
          </span>
        ),
        type: !user.isAdminRegistered ? "Registered" : "Not-Registered",
        action:
          deleteId === user._id ? (
            "...Deleting"
          ) : (
            <DeleteSweepIcon
              style={{ cursor: "pointer" }}
              onClick={() => {
                setDeleteId(user._id);
                updateUser(user._id, { deleted: true });
              }}
            />
          ),

        // </div>
        status: (
          <FormControlLabel
            control={
              <AntSwitch
                value={user.status}
                onChange={() => {
                  updateUser(user._id, { status: !user.status });
                }}
                checked={user.status}
              />
            }
            label={
              <span style={{ marginLeft: "8px" }}>
                {user.status ? "Active" : "Inactive"}
              </span>
            }
            labelPlacement="end"
          />
        ),
      });
    });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.leftHeader}>User Management</div>

        <div className={styles.rightHeader}>
          <TextField
            fullWidth
            sx={{ background: "white" }}
            inputProps={{
              style: {
                height: "45px",
                padding: 0,
              },
              sx: {
                "&::placeholder": {
                  fontSize: "0.9rem",
                  color: "#B7B7B7",
                  fontFamily: "var(--poppins-font)",
                },
              },
            }}
            InputProps={{
              style: {
                color: "#B7B7B7",
                border: "solid 1px #707070",
                borderRadius: "10px",
              },
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon style={{ color: "#B7B7B7" }} />
                </InputAdornment>
              ),
            }}
            placeholder="Search Via Name,ID"
            className={styles.search}
            value={searchVal}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <button
            style={{
              background: "white",
              color: "#323232",
              border: "solid 1px #707070",
              borderRadius: "10px",
            }}
            onClick={() => downloadCsv()}
          >
            {exporting ? "Exporting.." : "Export"}
          </button>
          <button onClick={() => props.setState("ADD-CUSTOMER")}>
            Add New
          </button>
        </div>
      </div>

      {isLoading && <AppLoader />}

      {showData && (
        <div className="table">
          <DataTable
            noHeader={true}
            fixedHeader={true}
            pagination={false}
            fixedHeaderScrollHeight={"calc(100vh - 250px)"}
            columns={[
              {
                name: (
                  <Checkbox
                    onChange={() => updateAllCheckList()}
                    checked={checkIdsExist(
                      props.customer && props.customer,
                      checkList
                    )}
                  />
                ),
                selector: "select",
                sortable: false,
                width: "70px",
              },
              {
                name: "USER ID",
                selector: "_id",
                width: "250px",
              },
              {
                name: "FIRST NAME",
                selector: "name",
                minWidth: "100px",
                width: "130px",
              },
              {
                name: "LAST NAME",
                selector: "lastName",
                sortable: true,
                minWidth: "100px",
                width: "130px",
              },
              {
                name: "EMAIL ID",
                selector: "email",
                sortable: true,

                minWidth: "270px",
              },

              { name: "LOCATION", selector: "location" },
              {
                name: "ACCOUNT CREATED AT",
                selector: "accountCreated",
                minWidth: "190px",
              },
              {
                name: "PROFILE CREATED AT",
                selector: "profileCreated",
                minWidth: "190px",
              },

              { name: "ACTION", selector: "action" },
              { name: "STATUS", selector: "status", minWidth: "250px" },
            ]}
            data={rowData}
          />
        </div>
      )}
      <Stack spacing={2} className="pagination">
        <Pagination
          count={props.customerCount}
          page={page}
          onChange={handleChange}
        />
      </Stack>
    </div>
  );
};
const mapStateToProps = (state) => ({
  customer: state.customer.customer,
  customerCount: state.customer.customerCount,
});
export default withRouter(
  connect(mapStateToProps, { getAllCustomers, showAlert })(Customer)
);
