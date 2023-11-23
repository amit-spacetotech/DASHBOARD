import React from "react";
import styles from "../Property.module.css";
import {
  TextField,
  Switch,
  FormControlLabel,
  InputAdornment,
  Checkbox,
  Radio,
  styled,
} from "@mui/material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import SearchIcon from "@mui/icons-material/Search";
import DataTable from "react-data-table-component";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import AppLoader from "../../utils/AppLoader/AppLoader";
import { connect } from "react-redux";
import { getAllProperty } from "../../../actions/property/action";
import { withRouter } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import editIconSvg from "../../../assets/svg/editIcon.svg";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Modal from "../../utils/Modal/Modal";
import closeicon from "../../../assets/svg/closeIcon.svg";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../config/config";
const ViewProperty = (props) => {
  const [page, setPage] = React.useState(1);
  const [checkList, setCheckList] = React.useState([]);
  const [searchVal, setSearchVal] = React.useState("");
  const [filter, setFilter] = React.useState({
    startDate: "",
    endDate: "",
    location: "",
    minRent: "",
  });
  const [focus, setFocused] = React.useState(false);
  const [hasValue, setHasValue] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [focusSec, setFocusedSec] = React.useState(false);
  const [hasValueSec, setHasValueSec] = React.useState(false);
  const [exporting, setExporting] = React.useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  const onFocusSec = () => setFocusedSec(true);
  const onBlurSec = () => setFocusedSec(false);
  const downloadCsv = () => {
    setExporting(true);
    axios({
      method: "post",
      url: `/home/downloadHomeCsv`,
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
        link.setAttribute("download", "property.csv"); //@INFO : CAN GIVE OTHER EXT TOO
        document.body.appendChild(link);
        link.click();
      })
      .catch((err) => {
        setExporting(false);
        console.log(err);
      });
  };
  const deleteDocument = async (userId) => {
    try {
      const docRef = doc(db, `userList/${userId}`);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };
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
  function checkIdsExist(array1, array2) {
    if (array2.length === 0) {
      return false;
    }
    const idsSet = new Set(array2);
    return array1.every((item) => idsSet.has(item._id));
  }

  const updateStatus = (_id, status) => {
    axios({
      method: "put",
      url: `/home/updateStatus`,
      data: {
        homeId: _id,
        status,
      },
    })
      .then((res) => {
        props.getAllProperty(10, page, "");
        props.showAlert(`Status updated Successfully`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    props.getAllProperty(10, page, "");
  }, []);
  const handleChange = (event, value) => {
    setPage(value);
    props.getAllProperty(
      10,
      value,
      searchVal,
      filter.startDate,
      filter.endDate,
      filter.location,
      filter.minRent
    );
  };
  const handleFilter = () => {
    props.getAllProperty(
      10,
      1,
      searchVal,
      filter.startDate,
      filter.endDate,
      filter.location,
      filter.minRent
    );
    setOpen(false);
  };
  const handleSearch = (search) => {
    setSearchVal(search);
    props.getAllProperty(10, 1, search ?? searchVal);
  };

  const updateAllCheckList = () => {
    props.properties &&
      props.properties.map((val) => {
        if (!checkList.includes(val._id)) {
          setCheckList((prevCheckList) => [...prevCheckList, val._id]);
        } else {
          setCheckList([]);
        }
      });
  };

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

  const deleteHome = (_id) => {
    axios({
      method: "post",
      url: `/customer/updateHome`,
      data: {
        homeId: _id,
        deleted: true,
      },
    })
      .then((res) => {
        deleteDocument(_id);
        props.getAllProperty(10, page, "");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let isLoading = !props.properties;
  let showData = !isLoading;
  let rowData = [];

  !isLoading &&
    props.properties.forEach((user) => {
      rowData.push({
        ...user,
        select: (
          <Checkbox
            checked={checkList.includes(user._id)}
            onChange={() => updateSingleCheckList(user._id)}
          />
        ),
        owner: user.userProfile.firstName,
        location: user.userProfile.location,
        createdAt: moment(user.createdAt).format("DD MMM YYYY, h:mm A"),
        name: (
          <span
            style={{ textDecoration: "underline", cursor: "pointer" }}
            onClick={() => props.handleClick(user, "USER-INFO")}
          >
            {user.userProfile.firstName}'s home
          </span>
        ),
        type: !user.isAdminRegistered ? "Registered" : "Not-Registered",
        action: (
          <div className={styles.actionButton}>
            <img
              onClick={() => props.handleClick(user, "EDIT-CUSTOMER")}
              src={editIconSvg}
              alt="EDIT"
              style={{ marginRight: "0.5rem", cursor: "pointer" }}
            />
            <DeleteSweepIcon onClick={() => deleteHome(user._id)} />
          </div>
        ),
        status: (
          <FormControlLabel
            control={
              <AntSwitch
                value={user.status}
                onChange={() => {
                  updateStatus(user._id, !user.status);
                }}
                checked={user.status}
              />
            }
            label={
              <span style={{ marginLeft: "8px" }}>
                {user.status ? "Active" : "Inactive"}
              </span>
            }
          />
        ),
      });
    });

  return (
    <div className={styles.container}>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        bodyStyle={{
          borderRadius: "30px",
          border: 0,
          background: "#f6f1e9",
          width: "570px",
          height: "600px",
        }}
        bodyContent={
          <div className={styles.paymentModal}>
            <div
              style={{ width: "100%", textAlign: "right", cursor: "pointer" }}
            >
              <img src={closeicon} onClick={() => setOpen(false)} />
            </div>
            <div className={styles.modalHeader}>
              <FilterAltIcon fontSize="30px" />
              Filter
            </div>
            <div className={styles.modalContent}>
              <h3>Property Management</h3>
              <label className={styles.label}>Date</label>
              <div className={styles.flexComp}>
                <TextField
                  onFocus={onFocus}
                  onBlur={onBlur}
                  value={filter.startDate}
                  onChange={(e) => {
                    if (e.target.value) {
                      setFilter({ ...filter, startDate: e.target.value });
                      setHasValue(true);
                    } else setHasValue(false);
                  }}
                  type={hasValue || focus ? "date" : "text"}
                  id="outlined-basic"
                  label="From"
                  variant="outlined"
                  sx={{
                    background: "white",
                    borderRadius: "10px",
                    width: "45%",
                  }}
                  inputProps={{
                    sx: {
                      "&::placeholder": {
                        fontSize: "13px",
                        color: "#A4A4A4",
                        fontFamily: "var(--poppins-font)",
                      },
                    },
                  }}
                  InputProps={{
                    style: {
                      color: "#A4A4A4",
                      border: "none",
                      borderRadius: "10px",
                    },
                  }}
                />
                <TextField
                  onFocus={onFocusSec}
                  onBlur={onBlurSec}
                  sx={{
                    background: "white",
                    borderRadius: "10px",
                    marginLeft: "15px",
                    width: "45%",
                  }}
                  inputProps={{
                    sx: {
                      "&::placeholder": {
                        fontSize: "13px",
                        color: "#A4A4A4",
                        fontFamily: "var(--poppins-font)",
                      },
                    },
                  }}
                  InputProps={{
                    style: {
                      color: "#A4A4A4",
                      border: "none",
                      borderRadius: "10px",
                    },
                  }}
                  value={filter.endDate}
                  onChange={(e) => {
                    if (e.target.value) {
                      setHasValueSec(true);
                      setFilter({ ...filter, endDate: e.target.value });
                    } else setHasValueSec(false);
                  }}
                  type={hasValueSec || focusSec ? "date" : "text"}
                  id="outlined-basic"
                  label="To"
                  variant="outlined"
                />
              </div>
              <label className={styles.label}>Price</label>
              <div className={styles.flexComp}>
                <TextField
                  sx={{
                    background: "white",
                    borderRadius: "10px",
                    width: "45%",
                  }}
                  value={filter.minRent}
                  onChange={(e) => {
                    if (e.target.value.length <= 6) {
                      setFilter({ ...filter, minRent: e.target.value });
                    }
                  }}
                  inputProps={{
                    sx: {
                      "&::placeholder": {
                        fontSize: "13px",
                        color: "#A4A4A4",
                        fontFamily: "var(--poppins-font)",
                      },
                    },
                  }}
                  InputProps={{
                    style: {
                      color: "#A4A4A4",
                      border: "none",
                      borderRadius: "10px",
                    },
                    startAdornment: (
                      <InputAdornment position="start">R</InputAdornment>
                    ),
                  }}
                  // onChange={(e) => {
                  //   if (e.target.value) setHasValueSec(true);
                  //   else setHasValueSec(false);
                  // }}
                  type="number"
                  id="outlined-basic"
                  variant="outlined"
                />
              </div>
              <h3>Location</h3>
              <div className={styles.flexComp}>
                <TextField
                  placeholder="Enter location"
                  sx={{
                    background: "white",
                    borderRadius: "10px",
                  }}
                  inputProps={{
                    sx: {
                      "&::placeholder": {
                        fontSize: "13px",
                        color: "grey",
                        fontFamily: "var(--poppins-font)",
                      },
                    },
                  }}
                  InputProps={{
                    style: {
                      color: "#A4A4A4",
                      border: "none",
                      borderRadius: "10px",
                    },
                  }}
                  value={filter.location}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    const alphabeticValue = inputValue.replace(
                      /[^a-zA-Z]/g,
                      ""
                    );

                    setFilter({ ...filter, location: alphabeticValue });
                  }}
                  // onChange={(e) => {
                  //   if (e.target.value) setHasValueSec(true);
                  //   else setHasValueSec(false);
                  // }}
                  type="text"
                  id="outlined-basic"
                  variant="outlined"
                />
              </div>

              <div className={styles.footer}>
                {" "}
                <button onClick={() => handleFilter()}>Apply</button>
              </div>
            </div>
          </div>
        }
      />
      <div className={styles.header}>
        <div className={styles.leftHeader}>Property Management</div>

        <div className={styles.rightHeader}>
          <TextField
            fullWidth
            sx={{ background: "white" }}
            inputProps={{
              style: {
                height: "45px",
                padding: 0,
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
              background: "#fdfbf7",
              display: "flex",
              height: "45px",
              color: "#B7B7B7",
              border: "solid 1px #707070",
              borderRadius: "10px",
            }}
            onClick={() => setOpen(true)}
          >
            <FilterAltOutlinedIcon style={{ fontSize: "1.1rem" }} />
            Filter
          </button>
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
                      props.properties && props.properties,
                      checkList
                    )}
                  />
                ),
                selector: "select",
                sortable: false,
                width: "70px",
              },
              {
                name: "PROPERTY ID",
                selector: "_id",
                width: "240px",
              },
              {
                name: "NAME",
                selector: "name",
                width: "140px",
              },
              {
                name: "OWNER NAME",
                selector: "owner",
                sortable: true,
                minWidth: "140px",
              },

              { name: "LOCATION", selector: "location", minWidth: "100px" },
              {
                name: "DATE REGISTERED",
                selector: "createdAt",
                minWidth: "170px",
              },
              { name: "ACTION", selector: "action" },
              { name: "STATUS", selector: "status", width: "200px" },
            ]}
            data={rowData}
          />
        </div>
      )}
      <Stack spacing={2} className="pagination">
        <Pagination
          count={props.propertyCount}
          page={page}
          onChange={handleChange}
        />
      </Stack>
    </div>
  );
};
const mapStateToProps = (state) => ({
  properties: state.property.property,
  propertyCount: state.property.propertyCount,
});
export default withRouter(
  connect(mapStateToProps, { getAllProperty })(ViewProperty)
);
