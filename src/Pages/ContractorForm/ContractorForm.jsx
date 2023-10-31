import "./Contractor.css";
import { useState } from "react";
import { useFormik } from "formik";
import {
  AiOutlineUserAdd,
  AiFillIdcard,
  AiOutlineCreditCard,
  AiFillFlag,
  AiOutlineFileWord,
  AiOutlineContacts,
  AiOutlineBarcode,
  AiOutlineHome,
} from "react-icons/ai";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncThunkReUpdateContractorProfile,
  asyncThunkUpdateContractorProfile,
} from "../../redux/createAsyncThunk";
import { showToast } from "../../redux/errorSlice/errorSlice";
import { useNavigate, useParams } from "react-router-dom";
import Contractorpopup1 from "./Contractorpop1";
import Contractorpopup2 from "./Contractorpop2";
import { Button } from "@mui/material";
import axios from "axios";

function Contractor() {
  const [input, setInput] = useState({});
  const [activateError, setActivateError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [inputErrors, setInputErrors] = useState({});
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    UpdateContractorProfileData,
    ContractorItSelfDetailsData: [ContractorItSelfDetails],
  } = useSelector((store) => store.admin);
  const [profileDataObj] = UpdateContractorProfileData;
  const { updateType } = useParams();
  const [contractorDetails, setContractorDetails] = useState("");

  useEffect(() => {
    let token = null;
    try {
      token = JSON.parse(localStorage.getItem("token"));

      token === null &&
        dispatch(
          showToast({
            type: "warning",
            message: "Token Has Expited ! Please SignIn Again",
          })
        );
    } catch (error) {
      dispatch(
        showToast({
          type: "warning",
          message: "Token Has Expited ! Please SignIn Again",
        })
      );
    }
    !token?.usertoken && navigate("/signin");
  }, [dispatch, navigate]);

  const handleChangeInput = (e, isFiles) => {
    setInput((prev) => {
      prev[e.target.name] = isFiles ? e.target.files[0] : e.target.value;
      localStorage.setItem("contractorFormData", JSON.stringify(prev));
      return { ...prev };
    });
  };

  const handleError = () => {
    const data = JSON.parse(localStorage.getItem("contractorFormData"));
    if (
      !data?.actualName ||
      !data?.actualAadharNo ||
      !data?.actualPanNo ||
      !data?.address ||
      !data?.bankAccNo ||
      !data?.bankName ||
      !data?.beneficiaryAadharNo ||
      !data?.beneficiaryName ||
      !data?.beneficiaryPanNo ||
      !data?.birthday ||
      !data?.contractName ||
      !data?.emergencyContactName ||
      !data?.emergencyContactNumber ||
      !data?.emergencyContactRelation ||
      !data?.ifscCode ||
      !data?.joinDate ||
      !data?.nationality ||
      !data?.gender ||
      !data?.reportTo
    ) {
      setActivateError(true);
    }
  };

  useEffect(() => {
    const { usertoken } = JSON.parse(localStorage.getItem("token"));

    axios({
      method: "get",
      url: `https://braided-complex-403612.el.r.appspot.com//api/getownDetails`,
      headers: { Authorization: `Bearer ${usertoken}` },
    })
      .then((res) => {
        setContractorDetails(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (
    contractorDetails?.profileId &&
    contractorDetails?.profileId?.IsApproved === true
  ) {
    navigate("/");
  }

  const onSubmit = (e) => {
    e.preventDefault();
  
    const errors = {};
  
  // Name validation
  if (!/^[a-zA-Z\s]*$/.test(input.actualName)) {
    errors.actualName = "Please enter a valid Name (only alphabets and spaces are allowed).";
  }

  // Beneficiary Name validation
  if (!/^[a-zA-Z\s]*$/.test(input.beneficiaryName)) {
    errors.beneficiaryName = "Please enter a valid Name (only alphabets and spaces are allowed).";
  }

  // Contract Name validation
  if (!/^[a-zA-Z\s]*$/.test(input.contractName)) {
    errors.contractName = "Please enter a valid Name (only alphabets and spaces are allowed).";
  }

  // Emergency Contact Name validation
  if (!/^[a-zA-Z\s]*$/.test(input.emergencyContactName)) {
    errors.emergencyContactName = "Please enter a valid Name (only alphabets and spaces are allowed).";
  }

  // PAN number validation
  if (!/^[A-Z0-9]{10}$/.test(input.actualPanNo)) {
    errors.actualPanNo = "Please enter a valid PAN number.";
  }

  // Beneficiary PAN number validation
  if (!/^[A-Z0-9]{10}$/.test(input.beneficiaryPanNo)) {
    errors.beneficiaryPanNo = "Please enter a valid PAN number.";
  }

  // Emergency Contact Number validation
  if (!/^\d{10}$/.test(input.emergencyContactNumber)) {
    errors.emergencyContactNumber = "Please enter a valid Emergency Contact Number (10 digits required).";
  }

  // Aadhar Number validation
  if (!/^\d{12}$/.test(input.actualAadharNo)) {
    errors.actualAadharNo = "Please enter a valid Aadhar Number (12 digits required).";
  }

  // Beneficiary Aadhar Number validation
  if (!/^\d{12}$/.test(input.beneficiaryAadharNo)) {
    errors.beneficiaryAadharNo = "Please enter a valid Aadhar Number (12 digits required).";
  }

  // Bank Account Number validation
  if (!/^\d{16}$/.test(input.bankAccNo)) {
    errors.bankAccNo = "Please enter a valid Bank Account Number (16 digits required).";
  }

  // IFSC Code validation
  if (!/^[A-Z0-9]{11}$/.test(input.ifscCode)) {
    errors.ifscCode = "Please enter a valid IFSC Code (e.g., ABCD0123456).";
  }

    // Set errors in the state
    setInputErrors(errors);
  
    // Check if there are any errors
    if (Object.keys(errors).length === 0) {
      // If no errors, proceed with form submission
      setLoading(true);
      
      const navigateAfterUpdate = () => {
        setTimeout(() => {
          navigate("/");
        }, 1500);
      };
  
      if (!contractorDetails?.profileId) {
        dispatch(
          asyncThunkUpdateContractorProfile({
            input,
            setLoading,
            navigateAfterUpdate,
          })
        );
      }
  
      if (ContractorItSelfDetails?.profileId) {
        dispatch(
          asyncThunkReUpdateContractorProfile({
            input,
            setLoading,
            navigateAfterUpdate,
          })
        );
      }
    }
  };
  
  useEffect(() => {
    let contractorFormData = null;
    try {
      contractorFormData = JSON.parse(
        localStorage.getItem("contractorFormData")
      );
      contractorFormData === null &&
        dispatch(
          showToast({
            type: "error",
            message: "input field is empty please fill it.",
          })
        );
    } catch (error) {
      dispatch(
        showToast({
          type: "error",
          message: "input field is empty please fill it.",
        })
      );
    }
    contractorFormData !== null && setInput(contractorFormData);
  }, [dispatch]);

  return (
    <>
      {/* contractor list here */}
      <div
        className="flex flex-col items-center contractor container"
        id="container"
        style={{ background: "white" }}
      >
        <form className="contractor_form" onSubmit={(e) => onSubmit(e)}>
          <h1 className="form-heading">Contractor Profile Form</h1>
          <div className="Upper ">
            <div className="UpperLeft mt-3 ">
              <div className="ActualName">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold px-4 mb-2 "
                  htmlFor="actualName"
                >
                  Actual Name :
                </label>
                <div className="cont">
                  <span className="in">
                    {" "}
                    <AiOutlineUserAdd />{" "}
                  </span>
                  <input
                    className="common appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded  px-5   leading-tight focus:outline-none focus:bg-white mx-4"
                    id="actualName"
                    type="text"
                    placeholder="Actual Name"
                    required
                    onChange={(e) => handleChangeInput(e, false)}
                    value={input?.actualName}
                    name="actualName"
                  />{" "}
                  {!input.actualName && activateError ? (
                    <small className="form-error">Required*</small>
                  ) : null}
                  {inputErrors.actualName && (
                     <small className="form-error">{inputErrors.actualName}</small> 
                  )}

                </div>
              </div>

              <div className="ActualAadharNo">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold px-4 mb-2"
                  htmlFor="actualAadharNo"
                >
                  Actual Aadhar No :
                </label>
                <div className="cont">
                  <span className="in">
                    {" "}
                    <AiOutlineCreditCard />{" "}
                  </span>
                  <input
                    className="common appearance-none block w-full bg-gray-200 text-gray-700 border
               border-gray-200 rounded  px-5  leading-tight focus:outline-none focus:bg-white mx-4"
                    id="actualAadharNo"
                    type="number"
                    placeholder="Actual Aadhar No"
                    required
                    onChange={(e) => handleChangeInput(e, false)}
                    value={input?.actualAadharNo}
                    name="actualAadharNo"
                  />
                  {!input.actualAadharNo && activateError ? (
                    <small className="form-error">Required*</small>
                  ) : null}
                   {inputErrors.actualAadharNo && (
                     <small className="form-error">{inputErrors.actualAadharNo}</small> 
                  )}

                </div>
              </div>

              <div className="ActuaPanNo">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold  px-4  mb-2"
                  htmlFor="actualPanNo"
                >
                  Actual Pan No :
                </label>
                <div className="cont">
                  <span className="in">
                    {" "}
                    <AiOutlineCreditCard />{" "}
                  </span>
                  <input
                    className="common appearance-none block w-full bg-gray-200 text-gray-700 border
               border-gray-200 rounded  px-5  leading-tight focus:outline-none focus:bg-white mx-4 inputField"
                    id="actualPanNo"
                    type="text"
                    placeholder="Actual Pan No"
                    required
                    onChange={(e) => handleChangeInput(e, false)}
                    value={input?.actualPanNo}
                    name="actualPanNo"
                  />
                  {!input.actualPanNo && activateError ? (
                    <small className="form-error">Required*</small>
                  ) : null}
                   {inputErrors.actualPanNo && (
                     <small className="form-error">{inputErrors.actualPanNo}</small> 
                  )}
                </div>
              </div>

              <div className="BeneficiaryName">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold px-4  mb-2"
                  htmlFor="beneficiaryName"
                >
                  Beneficiary Name :
                </label>
                <div className="cont">
                  <span className="in">
                    {" "}
                    <AiOutlineUserAdd />{" "}
                  </span>
                  <span>
                    <Contractorpopup1 />
                  </span>
                  <input
                    className="common appearance-none block w-full bg-gray-200 text-gray-700 border 
               border-gray-200 rounded  px-5  leading-tight focus:outline-none focus:bg-white mx-4"
                    id="beneficiaryName"
                    type="text"
                    placeholder="Beneficiary Name"
                    required
                    onChange={(e) => handleChangeInput(e, false)}
                    value={input?.beneficiaryName}
                    name="beneficiaryName"
                  />
                  {!input.beneficiaryName && activateError ? (
                    <small className="form-error">Required*</small>
                  ) : null}
                   {inputErrors.beneficiaryName && (
                     <small className="form-error">{inputErrors.beneficiaryName}</small> 
                  )}
                </div>
              </div>

              <div className="BeneficiaryAadharNo">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold px-4  mb-2"
                  htmlFor="beneficiaryAadharNo"
                >
                  Beneficiary Aadhar No :
                </label>
                <div className="cont">
                  <span className="in">
                    {" "}
                    <AiOutlineCreditCard />{" "}
                  </span>
                  <input
                    className="common appearance-none block w-full bg-gray-200 text-gray-700 border
               border-gray-200 rounded  px-5  leading-tight focus:outline-none focus:bg-white mx-4 "
                    id="beneficiaryAadharNo"
                    type="number"
                    placeholder="Beneficiary Aadhar No"
                    required
                    onChange={(e) => handleChangeInput(e, false)}
                    value={input?.beneficiaryAadharNo}
                    name="beneficiaryAadharNo"
                  />
                  {!input.beneficiaryAadharNo && activateError ? (
                    <small className="form-error">Required*</small>
                  ) : null}
                   {inputErrors.beneficiaryAadharNo && (
                     <small className="form-error">{inputErrors.beneficiaryAadharNo}</small> 
                  )}
                </div>
              </div>

              <div className="BeneficiaryPanNo">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold px-4  mb-2"
                  htmlFor="beneficiaryPanNo"
                >
                  Beneficiary Pan No :
                </label>
                <div className="cont">
                  <span className="in">
                    {" "}
                    <AiOutlineCreditCard />{" "}
                  </span>
                  <input
                    className="common appearance-none block w-full bg-gray-200 text-gray-700 border
               border-gray-200 rounded  px-5  leading-tight focus:outline-none focus:bg-white mx-4 "
                    id="beneficiaryPanNo"
                    type="text"
                    placeholder="Beneficiary Pan No"
                    required
                    // value={values.beneficiaryPanNo}
                    // onChange={handleChange}
                    onChange={(e) => handleChangeInput(e, false)}
                    value={input?.beneficiaryPanNo}
                    name="beneficiaryPanNo"
                    //onBlur={handleBlur}
                  />
                  {!input.beneficiaryPanNo && activateError ? (
                    <small className="form-error">Required*</small>
                  ) : null}
                   {inputErrors.beneficiaryPanNo && (
                     <small className="form-error">{inputErrors.beneficiaryPanNo}</small> 
                  )}
                </div>
              </div>
            </div>
            <div className="UpperRight mt-3 ">
              <div className="BankName">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold px-4  mb-2"
                  htmlFor="bankName"
                >
                  Bank Name :
                </label>
                <div className="cont">
                  <span className="in">
                    {" "}
                    <AiOutlineUserAdd />{" "}
                  </span>
                  <input
                    className="common appearance-none block w-full bg-gray-200 text-gray-700 border
               border-gray-200 rounded  px-5  leading-tight focus:outline-none focus:bg-white mx-4"
                    id="bankName"
                    type="name"
                    placeholder="Bank Name"
                    required
                    onChange={(e) => handleChangeInput(e, false)}
                    value={input?.bankName}
                    name="bankName"
                  />
                  {!input.bankName && activateError ? (
                    <small className="form-error1">Required*</small>
                  ) : null}
                </div>
              </div>

              <div className="BankAccNo">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold px-4  mb-2 mx-auto"
                  htmlFor="bankAccNo "
                >
                  Bank Account No :
                </label>
                <div className="cont">
                  <span className="in">
                    {" "}
                    <AiOutlineCreditCard />{" "}
                  </span>
                  <input
                    className="common appearance-none block w-full bg-gray-200 text-gray-700 border
               border-gray-200 rounded  px-5  leading-tight focus:outline-none focus:bg-white mx-4"
                    id="bankAccNo "
                    type="Number"
                    placeholder="Bank Acc No"
                    required
                    onChange={(e) => handleChangeInput(e, false)}
                    value={input?.bankAccNo}
                    name="bankAccNo"
                  />
                  {!input.bankAccNo && activateError ? (
                    <small className="form-error1">Required*</small>
                  ) : null}
                   {inputErrors.bankAccNo && (
                     <small className="form-error">{inputErrors.bankAccNo}</small> 
                  )}
                </div>
              </div>

              <div className="IfscCode">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold px-4  mb-2"
                  htmlFor="ifscCode"
                >
                  Ifsc Code :
                </label>
                <div className="cont">
                  <span className="in">
                    {" "}
                    <AiOutlineBarcode />{" "}
                  </span>
                  <input
                    className="common appearance-none block w-full bg-gray-200 text-gray-700 border
               border-gray-200 rounded  px-5  leading-tight focus:outline-none focus:bg-white mx-4"
                    id="ifscCode"
                    type="text"
                    placeholder="Ifsc Code"
                    required
                    onChange={(e) => handleChangeInput(e, false)}
                    value={input?.ifscCode}
                    name="ifscCode"
                  />
                  {!input.ifscCode && activateError ? (
                    <small className="form-error1">Required*</small>
                  ) : null}
                   {inputErrors.ifscCode && (
                     <small className="form-error">{inputErrors.ifscCode}</small> 
                  )}
                </div>
              </div>

              <div className="ContractorName">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold px-4 mb-2"
                  htmlFor="contractName"
                >
                  Contract Name
                </label>
                <div className="cont">
                  <span className="in">
                    {" "}
                    <AiOutlineUserAdd />{" "}
                  </span>

                  <span>
                    <Contractorpopup2 />
                  </span>
                  <input
                    className="common appearance-none block w-full bg-gray-200 text-gray-700 border
               border-gray-200 rounded  px-5  leading-tight focus:outline-none focus:bg-white mx-4"
                    id="contractName"
                    type="name"
                    placeholder="Contractor Name"
                    required
                    onChange={(e) => handleChangeInput(e, false)}
                    value={input?.contractName}
                    name="contractName"
                  />
                  {!input.contractName && activateError ? (
                    <small className="form-error1">Required*</small>
                  ) : null}
                   {inputErrors.contractName && (
                     <small className="form-error">{inputErrors.contractName}</small> 
                  )}
                </div>
              </div>

              <div className="JoinDate">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold  px-4 mb-2"
                  htmlFor="joinDate"
                >
                  Join Date :
                </label>
                <div className="cont">
                  <input
                    className="common appearance-none block w-full bg-gray-200 text-gray-700 border
               border-gray-200 rounded  px-4  leading-tight focus:outline-none focus:bg-white mx-4"
                    id="joinDate"
                    type="date"
                    placeholder="Join Date"
                    required
                    onChange={(e) => handleChangeInput(e, false)}
                    value={input?.joinDate}
                    name="joinDate"
                  />
                  {!input.joinDate && activateError ? (
                    <small className="form-error">Required*</small>
                  ) : null}
                </div>
              </div>

              <div className="Birthday">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold  px-4 mb-2"
                  htmlFor="birthday"
                >
                  Birthday :
                </label>
                <div className="cont">
                  <input
                    className="common appearance-none block w-full bg-gray-200 text-gray-700 border
               border-gray-200 rounded  px-4  leading-tight focus:outline-none focus:bg-white mx-4"
                    id="birthday"
                    type="date"
                    placeholder="Birthday"
                    required
                    onChange={(e) => handleChangeInput(e, false)}
                    value={input?.birthday}
                    name="birthday"
                  />
                  {!input.birthday && activateError ? (
                    <small className="form-error">Required*</small>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="Upper">
            <div className="Upperleft ">
              <div className="Address">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold px-4  mb-2"
                  htmlFor="address"
                >
                  Address :
                </label>
                <div className="cont">
                  <span className="in">
                    {" "}
                    <AiOutlineHome />{" "}
                  </span>
                  <input
                    className="com common appearance-none block w-full bg-gray-200 text-gray-700 border
               border-gray-200 rounded  px-5 leading-tight focus:outline-none focus:bg-white "
                    id="address"
                    type="text"
                    placeholder="Address"
                    required
                    onChange={(e) => handleChangeInput(e, false)}
                    value={input?.address}
                    name="address"
                  />
                  {!input.address && activateError ? (
                    <small className="form-error1">Required*</small>
                  ) : null}
                </div>
              </div>

              <div className="Gender">
                <label
                  className=" uppercase tracking-wide text-gray-700 text-xs font-bold mb-4 px-4 mx-1 '"
                  htmlFor="Gender"
                >
                  Gender :
                </label>

                <select
                  name="gender"
                  className="gender"
                  onChange={(e) => handleChangeInput(e, false)}
                  value={input?.gender}
                  required
                >
                  <option selected value="">
                    Select
                  </option>
                  <option value="Male">
                    Male
                  </option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {!input.gender && activateError ? (
                  <small className="form-error1">Required*</small>
                ) : null}
              </div>

              <div className="ReportTo">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 px-4 "
                  htmlFor="reportTo"
                >
                  Report To :
                </label>
                <div className="cont">
                  <span className="in">
                    {" "}
                    <AiOutlineFileWord />{" "}
                  </span>
                  <input
                    className="com common appearance-none block w-full bg-gray-200 text-gray-700 border
               border-gray-200 rounded  px-5  leading-tight focus:outline-none focus:bg-white mx-4"
                    id="reportTo"
                    type="text"
                    placeholder="Report To"
                    required
                    onChange={(e) => handleChangeInput(e, false)}
                    value={input?.reportTo}
                    name="reportTo"
                  />
                  {!input.reportTo && activateError ? (
                    <small className="form-error1">Required*</small>
                  ) : null}
                </div>
              </div>

              <div className="Nationality">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 px-4 "
                  htmlFor="nationality"
                >
                  Nationality :
                </label>
                <div className="cont">
                  <span className="in">
                    {" "}
                    <AiFillFlag />{" "}
                  </span>
                  <input
                    className="com common appearance-none block w-full bg-gray-200 text-gray-700 border
               border-gray-200 rounded  px-5  leading-tight focus:outline-none focus:bg-white mx-4"
                    id="nationality"
                    type="text"
                    placeholder="Nationality"
                    required
                    onChange={(e) => handleChangeInput(e, false)}
                    value={input?.nationality}
                    name="nationality"
                  />
                  {!input.nationality && activateError ? (
                    <small className="form-error1">Required*</small>
                  ) : null}
                </div>
              </div>

              <div className="Religion">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 px-4 "
                  htmlFor="religion"
                >
                  Religion :
                </label>
                <div className="cont">
                  <span className="in">
                    {" "}
                    <AiFillIdcard />{" "}
                  </span>
                  <input
                    className="com common appearance-none block w-full bg-gray-200 text-gray-700 border
               border-gray-200 rounded  px-5  leading-tight focus:outline-none focus:bg-white mx-4"
                    id="religion"
                    type="text"
                    placeholder="Religion"
                    required
                    onChange={(e) => handleChangeInput(e, false)}
                    value={input?.religion}
                    name="religion"
                  />
                  {!input.religion && activateError ? (
                    <small className="form-error1">Required*</small>
                  ) : null}
                </div>
              </div>

              <div className="EmergencyContactName">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold px-4  mb-2"
                  htmlFor="EmergencyContactName"
                >
                  Emergency Contact Name :
                </label>
                <div className="cont">
                  <span className="in">
                    {" "}
                    <AiOutlineCreditCard />{" "}
                  </span>
                  <input
                    className="com common appearance-none block w-full bg-gray-200 text-gray-700 border
               border-gray-200 rounded  px-5  leading-tight focus:outline-none focus:bg-white mx-4"
                    id="EmergencyContactName"
                    type="text"
                    placeholder="EmergencyContactName"
                    required
                    onChange={(e) => handleChangeInput(e, false)}
                    value={input?.emergencyContactName}
                    name="emergencyContactName"
                  />
                  {!input.emergencyContactName && activateError ? (
                    <small className="form-error1">Required*</small>
                  ) : null}
                      {inputErrors.emergencyContactName && (
                     <small className="form-error">{inputErrors.emergencyContactName}</small> 
                  )}
                </div>
              </div>
            </div>

            <div className="UpperRight ">
              <div className="up EmergencyContactRelation px-4">
                <label
                  className="bl block uppercase tracking-wide text-gray-700 text-xs font-bold  mb-2"
                  htmlFor="EmergencyContactRelation"
                >
                  Emergency Contact Relation :
                </label>
                <div className="cont">
                  <span className="int">
                    {" "}
                    <AiOutlineCreditCard />{" "}
                  </span>
                  <input
                    className="emer common appearance-none block w-full bg-gray-200 text-gray-700 border
               border-gray-200 rounded  px-5  leading-tight focus:outline-none focus:bg-white "
                    id="EmergencyContactRelation"
                    type="text"
                    placeholder="Emergency Contact Relation"
                    required
                    onChange={(e) => handleChangeInput(e, false)}
                    value={input?.emergencyContactRelation}
                    name="emergencyContactRelation"
                  />
                  {!input.emergencyContactRelation && activateError ? (
                    <small id="form-error-id" className="form-error">
                      Required*
                    </small>
                  ) : null}
                </div>
              </div>

              <div className="up EmergencyContactNumber px-4">
                <label
                  className="bl block uppercase tracking-wide text-gray-700 text-xs font-bold  mb-2 "
                  htmlFor="Emergency Contact Number"
                >
                  Emergency Contact Number :
                </label>
                <div className="cont">
                  <span className="int">
                    {" "}
                    <AiOutlineContacts />{" "}
                  </span>
                  <input
                    className="emer common appearance-none block w-full bg-gray-200 text-gray-700 border
               border-gray-200 rounded  px-5  leading-tight focus:outline-none focus:bg-white "
                    id="EmergencyContactNumber"
                    type="number"
                    required
                    placeholder="Emergency Contact Number"
                    onChange={(e) => handleChangeInput(e, false)}
                    value={input?.emergencyContactNumber}
                    name="emergencyContactNumber"
                  />
                  {!input.emergencyContactNumber && activateError ? (
                    <small id="form-error-id" className="form-error">
                      Required*
                    </small>
                  ) : null}
                    {inputErrors.emergencyContactNumber && (
                     <small className="form-error">{inputErrors.emergencyContactNumber}</small> 
                  )}
                </div>
              </div>

              <div className="up ActualPan px-4">
                <label
                  className="bl block uppercase tracking-wide text-gray-700 text-xs font-bold  mb-2 "
                  htmlFor="ActualPan"
                >
                  Actual Pan Card Image :
                </label>

                <input
                  className="emer common appearance-none block w-full bg-gray-200 text-gray-700 border
               border-gray-200 rounded  px-4  leading-tight focus:outline-none focus:bg-white "
                  id="ActualPan"
                  type="file"
                  placeholder="Actual Pan Image"
                  accept="image/*"
                  onChange={(e) => handleChangeInput(e, true)}
                  name="actualPanImage"
                />
              </div>

              <div className="up ActualAadhar px-4">
                <label
                  className="bl block uppercase tracking-wide text-gray-700 text-xs font-bold  mb-2"
                  htmlFor="ActualAadhar"
                >
                  Actual Aadhar Image :
                </label>

                <input
                  className="emer common appearance-none block w-full bg-gray-200 text-gray-700 border
               border-gray-200 rounded  px-4  leading-tight focus:outline-none focus:bg-white "
                  id="ActualAadhar"
                  type="file"
                  placeholder="Actual Aadhar Image"
                  accept="image/*"
                  onChange={(e) => handleChangeInput(e, true)}
                  name="actualAdharImage"
                />
              </div>

              <div className="up ActualBeneficiaryPan px-4">
                <label
                  className="bl block uppercase tracking-wide text-gray-700 text-xs font-bold  mb-2 "
                  htmlFor="ActualBeneficiaryPan"
                >
                  Actual Beneficiary Pan Image :
                </label>

                <input
                  className="emer common appearance-none block  bg-gray-200 text-gray-700 border
               border-gray-200 rounded  px-4  leading-tight focus:outline-none focus:bg-white "
                  id="ActualBeneficiaryPan"
                  type="file"
                  placeholder="Actual Beneficiary Pan Image"
                  accept="image/*"
                  onChange={(e) => handleChangeInput(e, true)}
                  name="beneficiaryPanImage"
                />
              </div>

              <div className="up ActualBeneficiaryPan px-4">
                <label
                  className="bl block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mx-4"
                  htmlFor="Actual Beneficiary Pan"
                >
                  Actual Beneficiary Aadhar Image :
                </label>
                <input
                  className="emer common appearance-none block  bg-gray-200 text-gray-700 border
               border-gray-200 rounded  px-4  leading-tight focus:outline-none focus:bg-white "
                  id="ActualBeneficiaryAadhar"
                  type="file"
                  accept="image/*"
                  placeholder="Actual Beneficiary Pan"
                  onChange={(e) => handleChangeInput(e, true)}
                  name="beneficiaryAadharImage"
                  // style={{marginLeft:"0px !important"}}
                />
              </div>
              <div id="submit-div">
                <div className="submit-div">
                  {loading ? (
                    <span className="loader"></span>
                  ) : (
                    <Button
                      variant="contained"
                      type="submit"
                      onClick={handleError}
                    >
                      Submit
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Contractor;