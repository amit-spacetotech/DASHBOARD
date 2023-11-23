import React from "react";
import styles from "./Payment.module.css";
import { TextField, InputAdornment, Checkbox, Radio } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DataTable from "react-data-table-component";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import AppLoader from "../utils/AppLoader/AppLoader";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getAllTransaction } from "../../actions/payment/action";
import moment from "moment";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import axios from "axios";
import Modal from "../utils/Modal/Modal";
import closeicon from "../../assets/svg/closeIcon.svg";
const Payment = (props) => {
  const [page, setPage] = React.useState(1);
  const [open, setOpen] = React.useState(false);
  const [exporting, setExporting] = React.useState(false);
  const [checkList, setCheckList] = React.useState([]);
  const [filter, setFilter] = React.useState({
    startDate: "",
    endDate: "",
    status: "",
  });
  const [searchVal, setSearchVal] = React.useState("");
  const [focus, setFocused] = React.useState(false);
  const [hasValue, setHasValue] = React.useState(false);

  const [focusSec, setFocusedSec] = React.useState(false);
  const [hasValueSec, setHasValueSec] = React.useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  const onFocusSec = () => setFocusedSec(true);
  const onBlurSec = () => setFocusedSec(false);

  React.useEffect(() => {
    props.getAllTransaction(1, 10, "");
  }, []);

  function checkIdsExist(array1, array2) {
    if (array2.length === 0) {
      return false;
    }
    const idsSet = new Set(array2);
    return array1.every((item) => idsSet.has(item._id));
  }

  const handleChange = (event, value) => {
    setPage(value);
    props.getAllTransaction(
      value,
      10,
      searchVal,
      filter.startDate,
      filter.endDate,
      filter.status
    );
  };
  const handleSearch = (search) => {
    setSearchVal(search);
    props.getAllTransaction(1, 10, search);
  };
  const handleFilter = () => {
    props.getAllTransaction(
      1,
      10,
      searchVal,
      filter.startDate,
      filter.endDate,
      filter.status
    );
    setOpen(false);
  };

  const downloadCsv = () => {
    setExporting(true);
    axios({
      method: "post",
      url: `/paymnet/downloadTransactionCsv`,
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

  const updateAllCheckList = () => {
    props.payment &&
      props.payment.map((val) => {
        if (!checkList.includes(val._id)) {
          setCheckList((prevCheckList) => [...prevCheckList, val._id]);
        } else {
          setCheckList([]);
        }
      });
  };
  const updateSingleCheckList = (value) => {
    if (checkList.includes(value)) {
      const filteredCheckList = checkList.filter((item) => item !== value);
      setCheckList(filteredCheckList);
    } else {
      setCheckList([...checkList, value]);
    }
  };
  let isLoading = !props.payment;
  let showData = !isLoading;
  let rowData = [];

  !isLoading &&
    props.payment &&
    props.payment.forEach((item) => {
      rowData.push({
        ...item,
        select: (
          <Checkbox
            checked={checkList.includes(item._id)}
            onChange={() => updateSingleCheckList(item._id)}
          />
        ),
        price: "R " + item.amount,
        date: moment(item.createdAt).format("DD MMM YYYY, h:mm A"),
        Status: <div className={styles.status}>{item.status}</div>,
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
              <h3>Payment & Transaction</h3>
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

              <h3>Status</h3>
              <div
                style={{ width: "35%", display: "flex", alignItems: "center" }}
              >
                <Radio
                  style={{ color: "#F8CD46" }}
                  value={filter.status}
                  checked={filter.status === "PAID"}
                  onChange={() => setFilter({ ...filter, status: "PAID" })}
                />
                <p>Paid</p>
              </div>
              <div
                style={{ width: "35%", display: "flex", alignItems: "center" }}
              >
                <Radio
                  style={{ color: "#F8CD46" }}
                  value={filter.status}
                  checked={filter.status === "PENDING"}
                  onChange={() => setFilter({ ...filter, status: "PENDING" })}
                />
                <p>Unpaid</p>
              </div>
              <div className={styles.footer}>
                {" "}
                <button onClick={() => handleFilter()}>Apply</button>
              </div>
            </div>
          </div>
        }
      />

      <div className={styles.section}>
        <div className={styles.header}>
          <div className={styles.leftHeader}>Payment & Transaction</div>

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
              placeholder="Search"
              className={styles.search}
              value={searchVal}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <button
              style={{
                background: "white",
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
              onClick={() => downloadCsv()}
              style={{
                background: "white",
                color: "#323232",
                border: "solid 1px #707070",
                borderRadius: "10px",
                height: "45px",
              }}
            >
              {exporting ? "Exporting..." : "Export"}
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
                  name: (
                    <Checkbox
                      onChange={() => updateAllCheckList()}
                      checked={checkIdsExist(props.payment, checkList)}
                    />
                  ),
                  selector: "select",
                  sortable: false,
                  maxWidth: "50px",
                },
                {
                  name: "TRANSACTION ID",
                  selector: "nonce",
                  sortable: true,
                  width: "300px",
                },
                { name: "TYPE", selector: "type", sortable: true },
                { name: "PRICE", selector: "price" },
                { name: "TIMESTAMP", selector: "date" },
                { name: "STATUS", selector: "Status" },
              ]}
              data={rowData}
            />
          </div>
        )}
        <Stack spacing={2} className="pagination">
          <Pagination
            count={props.pageCount ?? 0}
            page={page}
            onChange={handleChange}
          />
        </Stack>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  payment: state.payment.transactions,
  pageCount: state.payment.transactionInCount,
});
export default withRouter(
  connect(mapStateToProps, { getAllTransaction })(Payment)
);
