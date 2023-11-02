import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { AiTwotoneMail } from "react-icons/ai";
import { TiAttachment } from "react-icons/ti";
// import { BsFillChatRightFill } from "react-icons/bs";
import { BsSendFill } from "react-icons/bs";
import "./Email.css";
import { Button } from "@mui/material";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { showToast } from "../../redux/errorSlice/errorSlice";
import { useDispatch } from "react-redux";

const Email = ({ organization, organizationEmail }) => {
  const [MailBox, setMailBox] = useState(false);
  const [Subject, setSubject] = useState("");
  const [Mail, setMail] = useState("");
  // const [role, setrole] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const location = useLocation();

  const dispatch = useDispatch();

  // Function to retrieve the access token query parameter from the URL
  function getAccessToken() {
    const urlParams = new URLSearchParams(location.search);
    return urlParams.get("accessToken");
  }

  // Retrieve the access token query parameter
  const accessToken = getAccessToken();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleAccess = () => {
    try {
      window.open("https://braided-complex-403612.el.r.appspot.com/api/get-user-consent", "_self");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("accessToken", accessToken);
    formData.append("OrganizationMail", organizationEmail);
    formData.append("TimesheetFile", selectedFile);

    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    axios({
      method: "post",
      url: "https://braided-complex-403612.el.r.appspot.com/api/send-mail-of-timesheet",
      data: formData,
    })
      .then((res) => {
        console.log(res);
        dispatch(showToast({ type: "success", message: res.data.message}));
    })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {MailBox && (
        <>
          <div className="mail-box">
            <div className="mail-box-header">
              <h1 className="mail-box-title"> Mail</h1>

              <h1
                className="mail-box-close"
                onClick={() => {
                  setMailBox(false);
                }}
              >
                <AiOutlineClose />
              </h1>
            </div>
            <div className="mail-box-recipients">
              <h4>
                To <b>{organizationEmail}</b>
              </h4>
            </div>
            {!accessToken ? (
              <div className="get-access-btn">
                <Button variant="outlined" onClick={handleAccess}>
                  Get microsoft access
                </Button>
              </div>
            ) : (
              <div className=" mail-box-subject">
                <input
                  type="file"
                  id="attachment"
                  accept=".csv"
                  onChange={handleFileChange}
                />
                <label htmlFor="attachment" className="attachment">
                  <TiAttachment className="attachment-icon " />
                </label>
                <div className="selected-file">
                  {selectedFile ? selectedFile.name : "No file selected"}
                </div>
                <Button
                  variant="contained"
                  style={{ margin: "25px" }}
                  onClick={(e) => {
                    handleSend(e);
                  }}
                >
                  Send
                </Button>
                {/* kk
                            <div
                                className="mail-box-send-icon mail-box-send-button"
                                onClick={() => {
                                    SendMAil();
                                }}
                            >
                                jjjj<BsSendFill />
                            </div> */}
              </div>
            )}
          </div>
        </>
      )}
      <>
        <div className="floating-button">
          <div
            className="floating-button-icon"
            onClick={() => {
              setMailBox(!MailBox);
            }}
          >
            <AiTwotoneMail />
          </div>
        </div>
      </>
    </>
  );
};

export default Email;
