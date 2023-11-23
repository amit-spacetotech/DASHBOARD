import React from "react";
import styles from "./Faq.module.css";
import DataTable from "react-data-table-component";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import editIconSvg from "../../../assets/svg/editIcon.svg";
import AppLoader from "../../utils/AppLoader/AppLoader";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Faq = (props) => {
  const [page, setPage] = React.useState(1);

  let isLoading = !props.faq;
  let showData = !isLoading;
  let rowData = [];

  const handleChange = (event, value) => {
    setPage(value);
    props.handleFaq(value);
  };
  !isLoading &&
    props.faq.forEach((data) => {
      rowData.push({
        ...data,
        categoryName: data?.category?.categoryName,
        action: (
          <div className={styles.actionButton}>
            <img
              style={{ marginRight: "0.8rem", cursor: "pointer" }}
              src={editIconSvg}

            />
            <DeleteSweepIcon />
          </div>
        ),
      });
    });

  return (
    <div className={styles.content}>
      {isLoading && <AppLoader />}

      {showData && (
        <DataTable
          noHeader={true}
          fixedHeader={true}
          pagination={false}
          fixedHeaderScrollHeight={"calc(100vh - 220px)"}
          columns={[
            {
              name: "CATEGORY",
              selector: "categoryName",
              sortable: true,
            },
            {
              name: "QUESTION",
              selector: "question",
              sortable: true,
              minWidth: "350px",
            },
            {
              name: "ANSWER",
              selector: "answer",
              sortable: true,
              minWidth: "350px",
            },
            { name: "ACTION", selector: "action" },
          ]}
          data={rowData}
        />
      )}
      <Stack spacing={2} className="pagination">
        <Pagination count={props.count} page={page} onChange={handleChange} />
      </Stack>
    </div>
  );
};
export default Faq;
