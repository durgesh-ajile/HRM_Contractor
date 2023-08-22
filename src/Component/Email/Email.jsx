import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { AiTwotoneMail } from "react-icons/ai";
import { TiAttachment } from 'react-icons/ti'
// import { BsFillChatRightFill } from "react-icons/bs";
import { BsSendFill } from "react-icons/bs";
import './Email.css'

const Email = () => {

    const [MailBox, setMailBox] = useState(false);
    const [Subject, setSubject] = useState("");
    const [Mail, setMail] = useState("");
    // const [role, setrole] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };
    // const data = {
    //     Subject: Subject,
    //     Mail: Mail,
    // };


    // const fetchid = async () => {
    //     const response = await axios({
    //         method: "post",
    //         data: data,
    //         headers: {
    //             "Content-type": "application/json; charset=UTF-8",
    //         },
    //     });

    //     if (response) {
    //         setMailBox(false);
    //     }
    // };

    // const SendMAil = () => {
    //     fetchid();
    // };

    // const Role_Fun = () => {
    //     let user_role = localStorage.getItem("role");
    //     setrole(user_role);
    // };

    // useEffect(() => {
    //     Role_Fun();
    // }, []);

    return (
        <>

            {
                MailBox &&
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
                            <h4>To <b>All Client</b></h4>
                        </div>

                        <div className="mail-box-subject">
                            <input
                                className="mail-box-input"
                                type="text"
                                placeholder="Subject"
                                onChange={(e) => {
                                    setSubject(e.target.value);
                                }}

                            />
                        </div>
                        <div className="mail-box-content">
                            <textarea
                                className="mail-box-textarea"
                                type="text"
                                onChange={(e) => {
                                    setMail(e.target.value);
                                }}
                            />
                        </div>
                        <div className=" mail-box-subject">

                            <input type="file" id="attachment" accept=".xlsx"
                                onChange={handleFileChange}
                            />
                            <label htmlFor="attachment" className="attachment">

                                <TiAttachment className="attachment-icon " />
                            </label>
                            <div className="selected-file">
                                {selectedFile ? selectedFile.name : 'No file selected'}
                            </div>
                            <div
                                className="mail-box-send-icon mail-box-send-button"
                                onClick={() => {
                                    SendMAil();
                                }}
                            >
                                <BsSendFill />
                            </div>
                        </div>
                    </div>
                </>
            }
            <>
                <div className="floating-button">
                    <div
                        className="floating-button-icon"
                        onClick={() => { setMailBox(!MailBox); }}
                    >
                        <AiTwotoneMail />
                    </div>
                </div>
            </>




            {/* {!MailBox ? (
                role === "employee" ? (
                    <></>
                ) : (
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
                                <h4>To <b>All Client</b></h4>
                            </div>

                            <div className="mail-box-subject">
                                <input
                                    className="mail-box-input"
                                    type="text"
                                    placeholder="Subject"
                                    onChange={(e) => {
                                        setSubject(e.target.value);
                                    }}

                                />
                            </div>
                            <div className="mail-box-content">
                                <textarea
                                    className="mail-box-textarea"
                                    type="text"
                                    onChange={(e) => {
                                        setMail(e.target.value);
                                    }}
                                />
                            </div>
                            <div className=" mail-box-subject">

                                <input type="file" id="attachment" accept=".xlsx"
                                    onChange={handleFileChange}
                                />
                                <label htmlFor="attachment" className="attachment">

                                    <TiAttachment className="attachment-icon " />
                                </label>
                                <div className="selected-file">
                                    {selectedFile ? selectedFile.name : 'No file selected'}
                                </div>
                                <div
                                    className="mail-box-send-icon mail-box-send-button"
                                    onClick={() => {
                                        SendMAil();
                                    }}
                                >
                                    <BsSendFill />
                                </div>
                            </div>
                        </div>
                    </>
                )
            ) : role === "employee" ? (
                <></>
            ) : (
                <>
                    <div className="floating-button">
                        <div
                            className="floating-button-icon"
                            onClick={() => { setMailBox(true); }}
                        >
                            <AiTwotoneMail />
                        </div>
                    </div>
                </>
            )} */}
        </>
    );
};

export default Email;