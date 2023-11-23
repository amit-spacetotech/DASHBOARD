import React from "react";
import styles from "../Vendor.module.css";
import {
  TextField,
  Switch,
  FormControlLabel,
  InputAdornment,
  Radio,
} from "@mui/material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import SearchIcon from "@mui/icons-material/Search";
import DataTable from "react-data-table-component";
import Visibility from "@mui/icons-material/Visibility";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import AppLoader from "../../utils/AppLoader/AppLoader";
import { connect } from "react-redux";
import moment from "moment";
import { withRouter } from "react-router-dom";
import { getAllMoveIns } from "../../../actions/moveIn/action";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import axios from "axios";
import Modal from "../../utils/Modal/Modal";
import closeicon from "../../../assets/svg/closeIcon.svg";
const ViewVendor = (props) => {
  const [page, setPage] = React.useState(1);
  const [searchVal, setSearchVal] = React.useState("");
  const [focus, setFocused] = React.useState(false);
  const [hasValue, setHasValue] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [focusSec, setFocusedSec] = React.useState(false);
  const [hasValueSec, setHasValueSec] = React.useState(false);
  const [exporting, setExporting] = React.useState(false);
  const [filter, setFilter] = React.useState({
    startDate: "",
    endDate: "",
    status: "",
  });
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  const onFocusSec = () => setFocusedSec(true);
  const onBlurSec = () => setFocusedSec(false);
  React.useEffect(() => {
    if (!props.moveIn) {
      props.getAllMoveIns(page, 10, searchVal);
    }
  }, []);
  const handleFilter = () => {
    props.getAllMoveIns(
      1,
      10,
      searchVal,
      filter.startDate,
      filter.endDate,
      filter.status
    );
    setOpen(false);
  };

  const handleChange = (event, value) => {
    setPage(value);
    props.getAllMoveIns(
      value,
      10,
      searchVal,
      filter.startDate,
      filter.endDate,
      filter.status
    );
  };
  const downloadCsv = () => {
    setExporting(true);
    axios({
      method: "get",
      url: `/moveIn/downloadMoveinCsvv`,
      basic: true,
      headers: {
        Authorization:
          "Basic SE9NRVNIQVJFOlJBTkRPTUhPTUVTSEFSRVBBU1NXT1JEUE9JVVlUUkVRV0VSVFlVSQ==",
      },
    })
      .then((res) => {
        setExporting(false);
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "moveIn.csv"); //@INFO : CAN GIVE OTHER EXT TOO
        document.body.appendChild(link);
        link.click();
      })
      .catch((err) => {
        setExporting(false);
        console.log(err);
      });
  };
  console.log(props.count);
  const handleSearch = (search) => {
    setSearchVal(search);
    props.getAllMoveIns(page, 10, search ?? searchVal);
  };

  let isLoading = !props.moveIn;
  let showData = !isLoading;
  let rowData = [];

  !isLoading &&
    props.moveIn &&
    props.moveIn.forEach((data) => {
      rowData.push({
        _id: data._id,
        propertyName: data?.ownerIdProfile?.firstName + "'s home",
        ownerName:
          data.moveInStatus === "BUDDIES"
            ? "N/A"
            : data?.ownerIdProfile?.firstName,
        createdAt: moment(data.createdAt).format("DD MMM YYYY, h:mm A"),
        location: data?.ownerIdProfile?.location,
        initiatedBy: data?.intiatedByProfile?.firstName,
        status:
          (data.moveInStatus === "ACCEPTED" && "Accepted") ||
          (data.moveInStatus === "REJECTED" && "Rejected") ||
          (data.moveInStatus === "BUDDIES" && "Buddies") ||
          (data.moveInStatus === "PAYMENT" && "Accepted"),

        action: (
          <div
            className={styles.actionButton}
            onClick={() => props.handleClick(data)}
          >
            <Visibility />
          </div>
        ),
      });
    });

  return (
    <div className={styles.section}>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        bodyStyle={{
          borderRadius: "30px",
          border: 0,
          background: "#f6f1e9",
          width: "570px",
          height: "530px",
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
              <h3>Move in Management</h3>
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

              <h3>Move ins status</h3>
              <div
                style={{ width: "35%", display: "flex", alignItems: "center" }}
              >
                <Radio
                  value={filter.status}
                  style={{ color: "#F8CD46" }}
                  checked={filter.status === "ACCEPTED"}
                  onChange={() => setFilter({ ...filter, status: "ACCEPTED" })}
                />
                <p>Accepted</p>
              </div>
              <div
                style={{ width: "35%", display: "flex", alignItems: "center" }}
              >
                <Radio
                  style={{ color: "#F8CD46" }}
                  value={filter.status}
                  checked={filter.status === "REJECTED"}
                  onChange={() => setFilter({ ...filter, status: "REJECTED" })}
                />
                <p>Rejected</p>
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
        <div className={styles.leftHeader}>Move ins</div>

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
              background: "#fdfbf7",
              height: "45px",
              color: "#323232",
              border: "solid 1px #707070",
              borderRadius: "10px",
            }}
            onClick={() => downloadCsv()}
          >
            {exporting ? "Exporting.." : "Export"}
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
            fixedHeaderScrollHeight={"calc(100vh - 220px)"}
            columns={[
              {
                name: "MEET UP ID",
                selector: "_id",
                sortable: true,
                width: "240px",
              },
              {
                name: "PROPERTY NAME",
                selector: "propertyName",
                sortable: true,
                width: "180px",
              },
              { name: "OWNER NAME", selector: "ownerName", minWidth: "100px" },
              { name: "TIMESTAMP", selector: "createdAt", minWidth: "200px" },
              { name: "LOCATION", selector: "location" },
              { name: "INTIATED BY", selector: "initiatedBy" },
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
const mapStateToProps = (state) => ({
  moveIn: state.moveIn.moveIn,
  count: state.moveIn.moveInCount,
});
export default withRouter(
  connect(mapStateToProps, { getAllMoveIns })(ViewVendor)
);
