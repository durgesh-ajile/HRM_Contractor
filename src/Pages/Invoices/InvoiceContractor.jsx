import React, { useEffect, useState } from "react";
import "./InvoiceContractor.css";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Loading from "../../Component/common/Loading";
import ViewInvoice from "../../Component/ViewInvoice/ViewInvoice";
import { BsFillEyeFill } from "react-icons/bs";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Pagination from "../../Component/common/Pagination";
import { useSearchParams } from "react-router-dom";
import { showToast } from "../../redux/errorSlice/errorSlice";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const InvoiceContractor = () => {
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [client, setClient] = useState("");
  const [deductedAmount, setdeductedAmount] = useState(0);
  const [file, setFile] = useState();
  const [pendingData, setPendingData] = useState("");
  const [approvedData, setApprovedData] = useState("");
  const [pendingError, setPendingError] = useState("");
  const [approvedError, setApprovedError] = useState("");
  const [imgLink, setImageLink] = useState("");

  const [loading, setLoading] = useState("");
  const [searchParams] = useSearchParams();

  let page = searchParams.get("page");
  let page2 = searchParams.get("page2");

  const { usertoken } = JSON.parse(localStorage.getItem("token"));
  const contractorId = localStorage.getItem("contractorId");

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [open2, setOpen2] = React.useState(false);

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const [open3, setOpen3] = React.useState(false);

  const handleClickOpen3 = () => {
    setOpen3(true);
  };

  const handleClose3 = () => {
    setOpen3(false);
  };

  const handleGetTask = () => {
    let formatDate = convertMonth(month, year);
    axios({
      method: "get",
      url: `https://braided-complex-403612.el.r.appspot.com//api/getTasks?date=${formatDate}&organization=${
        client.split(",")[0]
      }`,
      headers: {
        Authorization: `Bearer ${usertoken}`,
      },
    })
      .then((res) => {
        setdeductedAmount(getDeductedAmount(res.data.data));
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        dispatch(showToast({ type: "error", message: res.data.message}));
      });
  };

  const getPendingInvoice = () => {
    axios({
      method: "get",
      url: `https://braided-complex-403612.el.r.appspot.com//api/getpendinginvoiceforcontractor?contractorId=${contractorId}&page=${page2}`,
      headers: {
        Authorization: `Bearer ${usertoken}`,
      },
    })
      .then((res) => {
        setPendingData(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 404) {
          setPendingError(404);
        } else {
          setPendingError(true);
        }
        dispatch(showToast({ type: "error", message: res.data.message}));
      });
  };

  const getApprovedInvoice = () => {
    axios({
      method: "get",
      url: `https://braided-complex-403612.el.r.appspot.com//api/getinvoicesforcontractor?contractorId=${contractorId}&page=${page}`,
      headers: {
        Authorization: `Bearer ${usertoken}`,
      },
    })
      .then((res) => {
        setApprovedData(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 404) {
          setApprovedError(404);
        } else {
          setApprovedError(true);
        }
        dispatch(showToast({ type: "error", message: err.response.data.message}));
      });
  };

  const handleInvoiceSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("amount", deductedAmount);
    formData.append("month", month);
    formData.append("year", year);
    formData.append("clientId", client.split(",")[0]);
    formData.append("ApprovalSS", file);

    axios({
      method: "post",
      url: `https://braided-complex-403612.el.r.appspot.com//api/createinvoiceapproval`,
      headers: {
        Authorization: `Bearer ${usertoken}`,
      },
      data: formData,
    })
      .then((res) => {
        setLoading(!loading);
        dispatch(showToast({ type: "success", message: res.data.message}));
      })
      .catch((err) => {
        console.log(err);
        dispatch(showToast({ type: "error", message: err.response.data.message}));
      });
  };

  const {
    ContractorItSelfDetailsData: [ContractorItSelfDetails],
  } = useSelector((store) => store.admin);

  useEffect(() => {
    if (month && year && client) {
      handleGetTask();
    } else {
      setdeductedAmount(0);
    }
  }, [month, year, client, file]);

  useEffect(() => {
    getPendingInvoice();
    getApprovedInvoice();
  }, [loading]);

  useEffect(()=>{
    getApprovedInvoice();
  }, [page])

  useEffect(()=>{
    getPendingInvoice();
  }, [page2])

  const convertMonth = () => {
    // Convert selectedMonth to a two-digit string
    const selectedMonth = month.padStart(2, "0");

    // Format the result as "MM/YYYY"
    const formattedDate = `${selectedMonth}/${year}`;

    return formattedDate;
  };

  const getDeductedAmount = (arr) => {
    if (arr) {
      let amount = (arr.length * Number(client.split(",")[1])) / Number(client.split(",")[2]);
      amount = Math.floor(amount);
      return amount;
    }
  };

  function getMonthAndYearFromDate(dateString) {
    const date = new Date(dateString);
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();
    return `${month} ${year}`;
  }

  // console.log(approvedError);

  return (
    <div className="invoice">
      <div className="invoice-table">
        <Typography id="invoice-head" variant="h6">
          Pending Invoices
        </Typography>
        {pendingData ? (
          <div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Sr. No</StyledTableCell>
                  <StyledTableCell align="right">Client Name</StyledTableCell>
                  <StyledTableCell align="right">Invoice Date</StyledTableCell>
                  <StyledTableCell align="right">Amount</StyledTableCell>
                  <StyledTableCell align="center">
                    View Screenshot
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pendingData.ApprovedInvoice.map((row, index) => (
                  <StyledTableRow key={row._id}>
                    <StyledTableCell component="th" scope="row">
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell align="right" component="th" scope="row">
                      {row.clientId.clientName}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {getMonthAndYearFromDate(row.InvoiceMonth)}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.amount}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      id="eye"
                      onClick={() => {
                        setImageLink(row.ApprovalScreenshot);
                        handleClickOpen2();
                      }}
                    >
                      <BsFillEyeFill />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination totalPages={pendingData.totalPage} page2={true} />
          </div>
        ) : (
          <Loading query="pending invoice" error={pendingError} />
        )}
      </div>

      <div className="approved-invoice">
        <Typography id="invoice-head" variant="h6">
          Approved Invoices
        </Typography>

        {approvedData ? (
          <div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Sr. No</StyledTableCell>
                    <StyledTableCell align="right">Client Name</StyledTableCell>
                    <StyledTableCell align="right">
                      Invoice Date
                    </StyledTableCell>
                    <StyledTableCell align="right">Amount</StyledTableCell>
                    <StyledTableCell align="center">
                      View Screenshot
                    </StyledTableCell>
                    <StyledTableCell align="right"></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {approvedData.ApprovedInvoice.map((row, index) => (
                    <StyledTableRow key={row._id}>
                      <StyledTableCell component="th" scope="row">
                        {index + 1}
                      </StyledTableCell>
                      <StyledTableCell align="right" component="th" scope="row">
                        {row.clientId.clientName}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {getMonthAndYearFromDate(row.InvoiceMonth)}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.amount}
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        id="eye"
                        onClick={() => {
                          setImageLink(row.ApprovalScreenshot);
                          handleClickOpen2();
                        }}
                      >
                        <BsFillEyeFill />
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Button variant="outlined" onClick={handleClickOpen3}>
                          View Invoice
                        </Button>
                      </StyledTableCell>
                      <Dialog fullScreen open={open3} onClose={handleClose3}>
                        <ViewInvoice
                          invoiceId={row._id}
                          usertoken={usertoken}
                          handleClose={handleClose3}
                        />
                      </Dialog>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
              
            </TableContainer>
            <Pagination totalPages={approvedData.totalPage} />
          </div>
        ) : (
          <Loading query="approved invoice" error={approvedError} />
        )}
        <Dialog
                fullScreen
                open={open2}
                onClose={handleClose2}
                TransitionComponent={Transition}
              >
                <AppBar sx={{ position: "relative" }}>
                  <Toolbar>
                    <IconButton
                      edge="start"
                      color="inherit"
                      onClick={handleClose2}
                      aria-label="close"
                    >
                      <CloseIcon />
                    </IconButton>
                    <Typography
                      sx={{ ml: 2, flex: 1 }}
                      variant="h6"
                      component="div"
                    >
                      ScreenShot
                    </Typography>
                    <Button autoFocus color="inherit" onClick={handleClose2}>
                      Cancel
                    </Button>
                  </Toolbar>
                </AppBar>
                <img
                  src={`https://braided-complex-403612.el.r.appspot.com/${imgLink.split("public")[1]}`}
                />
              </Dialog>
      </div>

      <div className="apply-invoice">
        <Button
          id="add-invoice-btn"
          variant="contained"
          onClick={() => {
            handleClickOpen();
          }}
        >
          Apply for invoice
        </Button>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"Add an organization below"}
          </DialogTitle>
          <DialogContent>
            <div className="select-org">
              <Typography variant="h6">Organization:</Typography>
              <select
                value={client}
                onChange={(e) => {
                  setClient(e.target.value);
                }}
                className="custom-select"
              >
                <option selected value="">
                  Select
                </option>
                {ContractorItSelfDetails?.profileId?.SelfOrganization.map(
                  (organization) => {
                    return (
                      <option
                        value={[organization.id._id, organization.amount, organization.businessDays]}
                      >
                        {organization.id.clientName}
                      </option>
                    );
                  }
                )}
              </select>
            </div>
            <div>
              <br />
              <div id="period-div">
                <Typography variant="h6">Select Period:</Typography>
                <select
                  className="custom-select"
                  id="select-month"
                  value={month}
                  onChange={(e) => {
                    setMonth(e.target.value);
                  }}
                >
                  <option selected value="">
                    Select Month
                  </option>
                  <option value="01">January</option>
                  <option value="02">February</option>
                  <option value="03">March</option>
                  <option value="04">April</option>
                  <option value="05">May</option>
                  <option value="06">June</option>
                  <option value="07">July</option>
                  <option value="08">August</option>
                  <option value="09">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
                <select
                  value={year}
                  onChange={(e) => {
                    setYear(e.target.value);
                  }}
                  className="custom-select"
                >
                  <option selected value="">
                    Select Year
                  </option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="2029">2029</option>
                  <option value="2030">2030</option>
                  <option value="2031">2031</option>
                </select>
              </div>
              <br />

              <div className="screenshot">
                <input
                  type="file"
                  placeholder="Select file"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                  accept="image/*"
                />
              </div>

              <Typography variant="h6">
                Invoice amount as per timesheet is: {deductedAmount}
              </Typography>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleClose();
              }}
              autoFocus
            >
              Cancel
            </Button>
            <Button
              onClick={(e) => {
                handleClose();
                handleInvoiceSubmit(e);
              }}
              autoFocus
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default InvoiceContractor;
