import "./Contractor.css";
import React, { useState } from "react";
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
import { GrCircleInformation } from "react-icons/gr";
// import Popup1 from "./Popup1";
// import Popup2 from "./Popup2";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncThunkUpdateContractorProfile } from "../../redux/createAsyncThunk";
import { showToast } from "../../redux/errorSlice/errorSlice";
import { useNavigate } from "react-router-dom";
import Contractorpopup1 from "./Contractorpop1";
import Contractorpopup2 from "./Contractorpop2";
import { contract } from "./Contractschema";

function Contractor() {
  const initialValues = {
    actualName: "",
    actualAadharNo: "",
    actualPanNo: "",
    beneficiaryName: "",
    beneficiaryAadharNo: "",
    beneficiaryPanNo: "",
    bankName: "",
    bankAccNo: "",
    ifscCode: "",
    contractName: "",
    joinDate: "",
    birthday: "",
    address: "",
    gender: "",
    reportTo: "",
    nationality: "",
    religion: "",
    emergencyContactName: "",
    emergencyContactRelation: "",
    emergencyContactNumber: "",
    ActualPan: "",
    ActualAadhar: "",
    ActualBeneficiaryPan: "",
    ActualBeneficiaryAadhar: "",
  };
  const { values, errors, touched, handleBlur, handleSubmit, handleChange } =
    useFormik({
      initialValues: initialValues,
      validationSchema: contract,
      // onSubmit: (values, action) => {
      //   console.log("submitted", values);
      //   action.resetForm();
      //   alert("submitted");
      // },
    });

  const [input, setInput] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { UpdateContractorProfileData } = useSelector((store) => store.admin);
  const [profileDataObj] = UpdateContractorProfileData;
  const data = JSON.parse(
    localStorage.getItem("contractorFormData")
  )

  const handleChangeInput = (e, isFiles) => {
    handleChange(e)
    setInput((prev) => {
      prev[e.target.name] = isFiles ? e.target.files[0] : e.target.value;
      localStorage.setItem("contractorFormData", JSON.stringify(prev));
      return { ...prev };
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(asyncThunkUpdateContractorProfile(input));
  };

  useEffect(() => {
    profileDataObj?.isContractorProfileUpdated &&
      navigate("/profile/:contractorId");
  }, [navigate, profileDataObj?.isContractorProfileUpdated]);

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
            message: "token expired ! please signin again",
          })
        );
    } catch (error) {
      dispatch(
        showToast({
          type: "error",
          message: "token expired ! please signin again",
        })
      );
    }
    contractorFormData !== null && setInput(contractorFormData);
  }, [dispatch]);

  console.log(values)
  console.log(data)
  return (
    <>
      <h1 className="heading text-center">Contractor Profile Form</h1>
      {/* contractor list here */}
      <div
        className="flex flex-col items-center contractor container"
        id="container"
        style={{ background: "white" }}
      >
        <form className="contractor_form " onSubmit={(e) => onSubmit(e)}>
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
                    className="common appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded  px-5 mb-3  leading-tight focus:outline-none focus:bg-white mx-4"
                    id="actualName"
                    type="text"
                    placeholder="Actual Name"
                    required
                    // value={values.actualName}
                    // onChange={handleChange}
                    onChange={(e) => handleChangeInput(e, false)}
                    value={input?.actualName}
                    name="actualName"
                    onBlur={handleBlur}
                  />{" "}
                </div>
              </div>

              {errors.actualName && touched.actualName ? (
                <small className="form-error1">{errors.actualName}</small>
              ) : null}

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
               border-gray-200 rounded  px-5 mb-3 leading-tight focus:outline-none focus:bg-white mx-4"
                    id="actualAadharNo"
                    type="number"
                    placeholder="Actual Aadhar No"
                    required
                    //value={values.actualAadharNo}
                    //  onChange={handleChange}
                    onChange={(e) => handleChangeInput(e, false)}
                    value={input?.actualAadharNo}
                    name="actualAadharNo"
                    onBlur={handleBlur}
                  />
                </div>
              </div>
              {errors.actualAadharNo && touched.actualAadharNo ? (
                <small className="form-error">{errors.actualAadharNo}</small>
              ) : null}

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
               border-gray-200 rounded  px-5 mb-3 leading-tight focus:outline-none focus:bg-white mx-4 inputField"
                    id="actualPanNo"
                    type="text"
                    placeholder="Actual Pan No"
                    required
                    // value={values.actualPanNo}
                    // onChange={handleChange}
                    onChange={(e) => handleChangeInput(e, false)}
                    value={input?.actualPanNo}
                    name="actualPanNo"
                    onBlur={handleBlur}
                  />
                </div>
              </div>
              {errors.actualPanNo && touched.actualPanNo ? (
                <small className="form-error">{errors.actualPanNo}</small>
              ) : null}

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
               border-gray-200 rounded  px-5 mb-3 leading-tight focus:outline-none focus:bg-white mx-4"
                    id="beneficiaryName"
                    type="text"
                    placeholder="Beneficiary Name"
                    required
                    // value={values.beneficiaryName}
                    // onChange={handleChange}
                    onChange={(e) => handleChangeInput(e, false)}
                    value={input?.beneficiaryName}
                    name="beneficiaryName"
                    onBlur={handleBlur}
                  />
                </div>
              </div>
              {errors.beneficiaryName && touched.beneficiaryName ? (
                <small className="form-error">{errors.beneficiaryName}</small>
              ) : null}

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
               border-gray-200 rounded  px-5 mb-3 leading-tight focus:outline-none focus:bg-white mx-4 "
                    id="beneficiaryAadharNo"
                    type="number"
                    placeholder="Beneficiary Aadhar No"
                    required
                    // value={values.beneficiaryAadharNo}
                    //  onChange={handleChange}
                    onChange={(e) => handleChangeInput(e, false)}
                    value={input?.beneficiaryAadharNo}
                    name="beneficiaryAadharNo"
                    onBlur={handleBlur}
                  />
                </div>
              </div>
              {errors.beneficiaryAadharNo && touched.beneficiaryAadharNo ? (
                <small className="form-error">
                  {errors.beneficiaryAadharNo}
                </small>
              ) : null}

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
               border-gray-200 rounded  px-5 mb-3 leading-tight focus:outline-none focus:bg-white mx-4 "
                    id="beneficiaryPanNo"
                    type="text"
                    placeholder="Beneficiary Pan No"
                    required
                    // value={values.beneficiaryPanNo}
                    // onChange={handleChange}
                    onChange={(e) => handleChangeInput(e, false)}
                    value={input?.beneficiaryPanNo}
                    name="beneficiaryPanNo"
                    onBlur={handleBlur}
                  />
                </div>
              </div>
              {errors.beneficiaryPanNo && touched.beneficiaryPanNo ? (
                <small className="form-error">{errors.beneficiaryPanNo}</small>
              ) : null}
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
               border-gray-200 rounded  px-5 mb-3 leading-tight focus:outline-none focus:bg-white mx-4"
                    id="bankName"
                    type="name"
                    placeholder="Bank Name"
                    required
                    // value={values.bankName}
                    // onChange={handleChange}
                    onChange={(e) => handleChangeInput(e, false)}
                    value={input?.bankName}
                    name="bankName"
                    onBlur={handleBlur}
                  />
                </div>
              </div>
              {errors.bankName && touched.bankName ? (
                <small className="form-error1">{errors.bankName}</small>
              ) : null}
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
               border-gray-200 rounded  px-5 mb-3 leading-tight focus:outline-none focus:bg-white mx-4"
                    id="bankAccNo "
                    type="Number"
                    placeholder="Bank Acc No"
                    required
                    // value={values.bankAccNo}
                    // onChange={handleChange}
                    onChange={(e) => handleChangeInput(e, false)}
                    value={input?.bankAccNo}
                    name="bankAccNo"
                    onBlur={handleBlur}
                  />
                </div>
              </div>
              {errors.bankAccNo && touched.bankAccNo ? (
                <small className="form-error1">{errors.bankAccNo}</small>
              ) : null}
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
               border-gray-200 rounded  px-5 mb-3 leading-tight focus:outline-none focus:bg-white mx-4"
                    id="ifscCode"
                    type="text"
                    placeholder="Ifsc Code"
                    required
                    // value={values.ifscCode}
                    // onChange={handleChange}
                    onChange={(e) => handleChangeInput(e, false)}
                    value={input?.ifscCode}
                    name="ifscCode"
                    onBlur={handleBlur}
                  />
                </div>
              </div>
              {errors.ifscCode && touched.ifscCode ? (
                <small className="form-error1">{errors.ifscCode}</small>
              ) : null}
              <div className="ContractorName">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold px-4 mb-2"
                  htmlFor="contractName"
                >
                  Contractor Name
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
               border-gray-200 rounded  px-5 mb-3 leading-tight focus:outline-none focus:bg-white mx-4"
                    id="contractName"
                    type="name"
                    placeholder="Contractor Name"
                    required
                    // value={values.contractName}
                    // onChange={handleChange}
                    onChange={(e) => handleChangeInput(e, false)}
                    value={input?.contractName}
                    name="contractName"
                    onBlur={handleBlur}
                  />
                </div>
              </div>
              {errors.contractName && touched.contractName ? (
                <small className="form-error1">{errors.contractName}</small>
              ) : null}

              <div className="JoinDate">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold  px-4 mb-2"
                  htmlFor="joinDate"
                >
                  Join Date :
                </label>

                <input
                  className="common appearance-none block w-full bg-gray-200 text-gray-700 border
               border-gray-200 rounded  px-4 mb-3 leading-tight focus:outline-none focus:bg-white mx-4"
                  id="joinDate"
                  type="date"
                  placeholder="Join Date"
                  required
                  // value={values.joinDate}
                  // onChange={handleChange}
                  onChange={(e) => handleChangeInput(e, false)}
                  value={input?.joinDate}
                  name="joinDate"
                  onBlur={handleBlur}
                />
              </div>
              {errors.joinDate && touched.joinDate ? (
                <small className="form-error">{errors.joinDate}</small>
              ) : null}

              <div className="Birthday">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold  px-4 mb-2"
                  htmlFor="birthday"
                >
                  Birthday :
                </label>

                <input
                  className="common appearance-none block w-full bg-gray-200 text-gray-700 border
               border-gray-200 rounded  px-4 mb-3 leading-tight focus:outline-none focus:bg-white mx-4"
                  id="birthday"
                  type="date"
                  placeholder="Birthday"
                  required
                  // value={values.birthday}
                  // onChange={handleChange}
                  onChange={(e) => handleChangeInput(e, false)}
                  value={input?.birthday}
                  name="birthday"
                  onBlur={handleBlur}
                />
              </div>
              {errors.birthday && touched.birthday ? (
                <small className="form-error">{errors.birthday}</small>
              ) : null}
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
                  <span className="int">
                    {" "}
                    <AiOutlineHome />{" "}
                  </span>
                  <input
                    className="com common appearance-none block w-full bg-gray-200 text-gray-700 border
               border-gray-200 rounded  px-5 mb-5 leading-tight focus:outline-none focus:bg-white "
                    id="address"
                    type="text"
                    placeholder="Address"
                    required
                    // value={values.address}
                    // onChange={handleChange}
                    onChange={(e) => handleChangeInput(e, false)}
                    value={input?.address}
                    name="address"
                    onBlur={handleBlur}
                  />
                </div>
              </div>
              {errors.address && touched.address ?
                  (<small className='form-error1'>{errors.address}</small>)
                  : null}

              <div className="Gender">
                <label
                  className=" uppercase tracking-wide text-gray-700 text-xs font-bold mb-4 px-4 mx-1 '"
                  htmlFor="Gender"
                >
                  Gender
                </label>

                <input type="radio" id="Male" name="fav_language" />
                <label htmlFor="Male" className="px-2 ">
                  Male
                </label>
                <input type="radio" id="Female" name="fav_language" />
                <label htmlFor="Female" className="px-2">
                  Female
                </label>
                <input type="radio" id="Other" name="fav_language" />
                <label htmlFor="Other" className="px-2">
                  Other
                </label>
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
               border-gray-200 rounded  px-5 mb-3 leading-tight focus:outline-none focus:bg-white mx-4"
                    id="reportTo"
                    type="text"
                    placeholder="Report To"
                    required
                    // value={values.reportTo}
                    // onChange={handleChange}
                    onChange={(e) => handleChangeInput(e, false)}
                    value={input?.reportTo}
                    name="reportTo"
                    onBlur={handleBlur}
                  />
                </div>
              </div>
              {errors.reportTo && touched.reportTo ? (
                <small className="form-error1">{errors.reportTo}</small>
              ) : null}

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
               border-gray-200 rounded  px-5 mb-3 leading-tight focus:outline-none focus:bg-white mx-4"
                    id="nationality"
                    type="text"
                    placeholder="Nationality"
                    required
                    onChange={(e) => handleChangeInput(e, false)}
                    value={input?.nationality}
                    name="nationality"
                    //  value={values.nationality}
                    //  onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
              </div>
              {errors.nationality && touched.nationality ? (
                <small className="form-error1">{errors.nationality}</small>
              ) : null}

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
               border-gray-200 rounded  px-5 mb-3 leading-tight focus:outline-none focus:bg-white mx-4"
                    id="religion"
                    type="text"
                    placeholder="Religion"
                    required
                    //  value={values.religion}
                    //  onChange={handleChange}
                    onChange={(e) => handleChangeInput(e, false)}
                    value={input?.religion}
                    name="religion"
                    onBlur={handleBlur}
                  />
                </div>
              </div>
              {errors.religion && touched.religion ? (
                <small className="form-error1">{errors.religion}</small>
              ) : null}

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
               border-gray-200 rounded  px-5 mb-3 leading-tight focus:outline-none focus:bg-white mx-4"
                    id="EmergencyContactName"
                    type="text"
                    placeholder="EmergencyContactName"
                    required
                    //  value={values.EmergencyContactName}
                    //  onChange={handleChange}
                    onChange={(e) => handleChangeInput(e, false)}
                    value={input?.emergencyContactName}
                    name="emergencyContactName"
                    onBlur={handleBlur}
                  />
                </div>
              </div>
              {errors.emergencyContactName && touched.emergencyContactName ?
                   (<small className='form-error1'>{errors.emergencyContactName}</small>)
                   : null}
            </div>

            <div className="UpperRight ">
              <div className="up Emergency Contact Relation px-4">
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
               border-gray-200 rounded  px-5 mb-3 leading-tight focus:outline-none focus:bg-white "
                    id="EmergencyContactRelation"
                    type="text"
                    placeholder="Emergency Contact Relation"
                    required
                    //  value={values.EmergencyContactRelation}
                    //  onChange={handleChange}
                    onChange={(e) => handleChangeInput(e, false)}
                    value={input?.emergencyContactRelation}
                    name="emergencyContactRelation"
                    onBlur={handleBlur}
                  />
                </div>
              </div>
              {errors.emergencyContactRelation && touched.emergencyContactRelation ?
                   (<small className='form-error'>{errors.emergencyContactRelation}</small>)
                   : null}

              <div className="up Emergency Contact Number px-4">
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
               border-gray-200 rounded  px-5 mb-3 leading-tight focus:outline-none focus:bg-white "
                    id="EmergencyContactNumber"
                    type="number"
                    placeholder="Emergency Contact Number"
                    required
                    // value={values.EmergencyContactNumber}
                    //  onChange={handleChange}
                    onChange={(e) => handleChangeInput(e, false)}
                    value={input?.emergencyContactNumber}
                    name="emergencyContactNumber"
                    onBlur={handleBlur}
                  />
                </div>
              </div>
              {errors.emergencyContactNumber &&
              touched.emergencyContactNumber ? (
                <small className="form-error">
                  {errors.emergencyContactNumber}
                </small>
              ) : null}

              <div className="up ActualPan px-4">
                <label
                  className="bl block uppercase tracking-wide text-gray-700 text-xs font-bold  mb-2 "
                  htmlFor="ActualPan"
                >
                  Actual PanCard Image :
                </label>

                <input
                  className="emer common appearance-none block w-full bg-gray-200 text-gray-700 border
               border-gray-200 rounded  px-4 mb-3 leading-tight focus:outline-none focus:bg-white "
                  id="ActualPan"
                  type="file"
                  placeholder="Actual Pan Image"
                  accept=".pdf, .docx, .jpeg, .png"
                  required
                  //  value={values.ActualPan}
                  //  onChange={handleChange}
                  onChange={(e) => handleChangeInput(e, true)}
                  name="actualPanImage"
                  onBlur={handleBlur}
                />
              </div>
              {errors.ActualPan && touched.ActualPan ? (
                <small className="form-error">{errors.ActualPan}</small>
              ) : null}

              <div className="up ActualAadhar px-4">
                <label
                  className="bl block uppercase tracking-wide text-gray-700 text-xs font-bold  mb-2"
                  htmlFor="ActualAadhar"
                >
                  Actual Aadhar Image :
                </label>

                <input
                  className="emer common appearance-none block w-full bg-gray-200 text-gray-700 border
               border-gray-200 rounded  px-4 mb-3 leading-tight focus:outline-none focus:bg-white "
                  id="ActualAadhar"
                  type="file"
                  placeholder="Actual Aadhar Image"
                  accept=".pdf, .docx, .jpeg, .png"
                  required
                  //  value={values.ActualAadhar}
                  //  onChange={handleChange}
                  onChange={(e) => handleChangeInput(e, true)}
                  name="actualAdharImage"
                  onBlur={handleBlur}
                />
              </div>

              {errors.ActualAadhar && touched.ActualAadhar ? (
                <small className="form-error">{errors.ActualAadhar}</small>
              ) : null}

              <div className="up ActualBeneficiaryPan px-4">
                <label
                  className="bl block uppercase tracking-wide text-gray-700 text-xs font-bold  mb-2 "
                  htmlFor="ActualBeneficiaryPan"
                >
                  Actual Beneficiary Pan Image :
                </label>

                <input
                  className="emer common appearance-none block  bg-gray-200 text-gray-700 border
               border-gray-200 rounded  px-4 mb-3 leading-tight focus:outline-none focus:bg-white "
                  id="ActualBeneficiaryPan"
                  type="file"
                  placeholder="Actual Beneficiary Pan Image"
                  accept=".pdf, .docx, .jpeg, .png"
                  required
                  //  value={values.ActualBeneficiaryPan}
                  //  onChange={handleChange}
                  onChange={(e) => handleChangeInput(e, true)}
                  name="beneficiaryPanImage"
                  onBlur={handleBlur}
                />
              </div>
              {errors.ActualBeneficiaryPan && touched.ActualBeneficiaryPan ? (
                <small className="form-error">
                  {errors.ActualBeneficiaryPan}
                </small>
              ) : null}

              <div className="up ActualBeneficiaryPan px-2">
                <label
                  className="bl block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mx-4"
                  htmlFor="Actual Beneficiary Pan"
                >
                  Actual Beneficiary Aadhar Image :
                </label>
                <input
                  className="emer common appearance-none block  bg-gray-200 text-gray-700 border
               border-gray-200 rounded  px-4 mb-3 leading-tight focus:outline-none focus:bg-white "
                  id="Actual Beneficiary Aadhar"
                  type="file"
                  placeholder="Actual Beneficiary Pan"
                  onChange={(e) => handleChangeInput(e, true)}
                  name="beneficiaryAadharImage"
                  required
                />
              </div>
            </div>
          </div>
          <button
            className="btn-submit"
            onClick={() => {
              alert("Submitted");
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Contractor;

// import { Box } from "@mui/material"
// import { TextField, Button } from '@mui/material';
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { asyncThunkUpdateContractorProfile } from "../../redux/createAsyncThunk";
// import { showToast } from "../../redux/errorSlice/errorSlice";
// import { useNavigate } from "react-router-dom";

// const ContractorForm = () => {

//     const [input, setInput] = useState({})
//     const dispatch = useDispatch()
//     const navigate = useNavigate()
//     const { UpdateContractorProfileData} = useSelector(store => store.admin)
//     const [profileDataObj] = UpdateContractorProfileData;

//     const handleChangeInput = (e, isFiles) => {
//         setInput((prev) => {
//             prev[e.target.name] = isFiles ? e.target.files[0] : e.target.value;
//             localStorage.setItem('contractorFormData', JSON.stringify(prev))
//             return { ...prev }
//         })
//     }
//     const onSubmit = (e) => {
//         e.preventDefault();
//         dispatch(asyncThunkUpdateContractorProfile(input))
//     }

//     useEffect(()=>{
//         profileDataObj?.isContractorProfileUpdated && navigate('/profile/:contractorId')
//     },[navigate, profileDataObj?.isContractorProfileUpdated])

//     useEffect(() => {
//         let contractorFormData = null
//         try {
//             contractorFormData = JSON.parse(localStorage.getItem('contractorFormData'))
//             contractorFormData === null && dispatch(showToast({ type: "error", message: "token expired ! please signin again" }))
//         } catch (error) {
//             dispatch(showToast({ type: "error", message: "token expired ! please signin again" }))
//         }
//         contractorFormData !== null && setInput(contractorFormData)
//     }, [dispatch])

//     return (
//         <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
//             <Box sx={{ width: '90%' }}>

//                 <form onSubmit={(e) => onSubmit(e)}>
//                     <Box sx={{ width: '100%', display: 'flex', flexDirection: { md: "row", xs: "column" } }}>
//                         <TextField onChange={(e) => handleChangeInput(e, false)} value={input?.actualName} name='actualName' sx={{ width: { md: '50%', xs: '100%' }, marginRight: '20px' }} id="standard-basic" label="Enter Your ActualName" variant="standard" type="text" required />
//                         <TextField onChange={(e) => handleChangeInput(e, false)} value={input?.actualAadharNo} name='actualAadharNo' sx={{ width: { md: '50%', xs: '100%' } }} id="standard-basic" label="Enter Actual Aadhar No" variant="standard" type="number" required />
//                     </Box>
//                     <Box sx={{ width: '100%', display: 'flex', flexDirection: { md: "row", xs: "column" } }}>
//                         <TextField onChange={(e) => handleChangeInput(e, false)} value={input?.actualPanNo} name='actualPanNo' sx={{ width: { md: '50%', xs: '100%' }, marginRight: '20px' }} id="standard-basic" label="Enter Your Actual Pan No" variant="standard" type="text" required />
//                         <TextField onChange={(e) => handleChangeInput(e, false)} value={input?.beneficiaryName} name='beneficiaryName' sx={{ width: { md: '50%', xs: '100%' } }} id="standard-basic" label="Enter Your Beneficiary Name" variant="standard" type="text" required />
//                     </Box>
//                     <Box sx={{ width: '100%', display: 'flex', flexDirection: { md: "row", xs: "column" } }}>
//                         <TextField onChange={(e) => handleChangeInput(e, false)} value={input?.beneficiaryAadharNo} name='beneficiaryAadharNo' sx={{ width: { md: '50%', xs: '100%' }, marginRight: '20px' }} id="standard-basic" label="Enter Your Beneficiary Aadhar No" variant="standard" type="number" required />
//                         <TextField onChange={(e) => handleChangeInput(e, false)} value={input?.beneficiaryPanNo} name='beneficiaryPanNo' sx={{ width: { md: '50%', xs: '100%' } }} id="standard-basic" label="Enter Your Beneficiary Pan No" variant="standard" type="text" required />
//                     </Box>
//                     <Box sx={{ width: '100%', display: 'flex', flexDirection: { md: "row", xs: "column" } }}>
//                         <TextField onChange={(e) => handleChangeInput(e, false)} value={input?.bankName} name='bankName' sx={{ width: { md: '50%', xs: '100%' }, marginRight: '20px' }} id="standard-basic" label="Enter Your Bank Name" variant="standard" type="text" required />
//                         <TextField onChange={(e) => handleChangeInput(e, false)} value={input?.bankAccNo} name='bankAccNo' sx={{ width: { md: '50%', xs: '100%' } }} id="standard-basic" label="Enter Your Bank Account No" variant="standard" type="number" required />
//                     </Box>
//                     <Box sx={{ width: '100%', display: 'flex', flexDirection: { md: "row", xs: "column" } }}>
//                         <TextField onChange={(e) => handleChangeInput(e, false)} value={input?.ifscCode} name='ifscCode' sx={{ width: { md: '50%', xs: '100%' }, marginRight: '20px' }} id="standard-basic" label="Enter Your IFSC Code" variant="standard" type="text" required />
//                         <TextField onChange={(e) => handleChangeInput(e, false)} value={input?.contractName} name='contractName' sx={{ width: { md: '50%', xs: '100%' } }} id="standard-basic" label="Enter Your Contract Name" variant="standard" type="text" required />
//                     </Box>
//                     <Box sx={{ width: '100%', display: 'flex', flexDirection: { md: "row", xs: "column" } }}>
//                         <TextField onChange={(e) => handleChangeInput(e, false)} value={input?.joinDate} name='joinDate' sx={{ width: { md: '50%', xs: '100%' }, marginRight: '20px' }} id="standard-basic" variant="standard" type="date" required />
//                         <TextField onChange={(e) => handleChangeInput(e, false)} value={input?.birthday} name='birthday' sx={{ width: { md: '50%', xs: '100%' } }} id="standard-basic" variant="standard" type="date" required />
//                     </Box>
//                     <Box sx={{ width: '100%', display: 'flex', flexDirection: { md: "row", xs: "column" } }}>
//                         <TextField onChange={(e) => handleChangeInput(e, false)} value={input?.address} name='address' sx={{ width: { md: '50%', xs: '100%' }, marginRight: '20px' }} id="standard-basic" label="Enter Your Address" variant="standard" type="text" required />
//                         <TextField onChange={(e) => handleChangeInput(e, false)} value={input?.gender} name='gender' sx={{ width: { md: '50%', xs: '100%' } }} id="standard-basic" label="Enter Your Gender" variant="standard" type="text" required />
//                     </Box>
//                     <Box sx={{ width: '100%', display: 'flex', flexDirection: { md: "row", xs: "column" } }}>
//                         <TextField onChange={(e) => handleChangeInput(e, false)} value={input?.reportTo} name='reportTo' sx={{ width: { md: '50%', xs: '100%' }, marginRight: '20px' }} id="standard-basic" label="Enter Your Report To" variant="standard" type="text" required />
//                         <TextField onChange={(e) => handleChangeInput(e, false)} value={input?.nationality} name='nationality' sx={{ width: { md: '50%', xs: '100%' } }} id="standard-basic" label="Enter Your Nationality" variant="standard" type="text" required />
//                     </Box>
//                     <Box sx={{ width: '100%', display: 'flex', flexDirection: { md: "row", xs: "column" } }}>
//                         <TextField onChange={(e) => handleChangeInput(e, false)} value={input?.religion} name='religion' sx={{ width: { md: '50%', xs: '100%' }, marginRight: '20px' }} id="standard-basic" label="Enter Your Religion" variant="standard" type="text" required />
//                         <TextField onChange={(e) => handleChangeInput(e, false)} value={input?.emergencyContactName} name='emergencyContactName' sx={{ width: { md: '50%', xs: '100%' } }} id="standard-basic" label="Enter Your Emergency Contact Name" variant="standard" type="text" required />
//                     </Box>
//                     <Box sx={{ width: '100%', display: 'flex', flexDirection: { md: "row", xs: "column" } }}>
//                         <TextField onChange={(e) => handleChangeInput(e, false)} value={input?.emergencyContactRelation} name='emergencyContactRelation' sx={{ width: { md: '50%', xs: '100%' }, marginRight: '20px' }} id="standard-basic" label="Enter Your Emergency Contact Relation" variant="standard" type="text" required />
//                         <TextField onChange={(e) => handleChangeInput(e, false)} value={input?.emergencyContactNumber} name='emergencyContactNumber' sx={{ width: { md: '50%', xs: '100%' } }} id="standard-basic" label="Enter Your Emergency Contact Number" variant="standard" type="number" required />
//                     </Box>
//                     <Box sx={{ width: '100%', display: 'flex', flexDirection: { md: "row", xs: "column" } }}>
//                         <TextField onChange={(e) => handleChangeInput(e, true)} name='actualPanImage' accept="image/*" sx={{ width: { md: '50%', xs: '100%' }, marginRight: '20px' }} id="standard-basic" variant="standard" type="file" required />
//                         <TextField onChange={(e) => handleChangeInput(e, true)} name='actualAdharImage' accept="image/*" sx={{ width: { md: '50%', xs: '100%' } }} id="standard-basic" variant="standard" type="file" required />
//                     </Box>
//                     <Box sx={{ width: '100%', display: 'flex', flexDirection: { md: "row", xs: "column" } }}>
//                         <TextField onChange={(e) => handleChangeInput(e, true)} name='beneficiaryPanImage' accept="image/*" sx={{ width: { md: '50%', xs: '100%' }, marginRight: '20px' }} id="standard-basic" variant="standard" type="file" required />
//                         <TextField onChange={(e) => handleChangeInput(e, true)} name='beneficiaryAadharImage' accept="image/*" sx={{ width: { md: '50%', xs: '100%' } }} id="standard-basic" variant="standard" type="file" required />
//                     </Box>
//                     <Box mt={2}>
//                         <Button variant="outlined" color="primary" type="submit">
//                             Submit
//                         </Button>
//                     </Box>
//                 </form>
//             </Box>
//         </Box>
//     )
// }

// export default ContractorForm
