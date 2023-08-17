import "./Profile.css";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import { Avatar, CardHeader } from "@mui/material";
import { Grid } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import Cardss from "./Cards";
import { useEffect, useState } from "react";
import { asyncThunkGetOwnDetails } from "../../redux/createAsyncThunk";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../../redux/errorSlice/errorSlice";
import Contractor from "../../Pages/ContractorForm/ContractorForm";
import WhiteButton from "../common/WhiteButton";
import PageAnimation from "../Animation/PageAnimation.jsx"

export default function Profile() {
    const [authScreen, setAuthScreen] = useState(true);
    const [loading, setLoading] = useState(false);
    const [checkProfile, setCheckProfile] = useState(true);
    const [formattedDate, setFormattedDate] = useState();
    let tokenData = localStorage.getItem("token");
    let tokenExpiry;
    let token;
    if (tokenData) {
        tokenExpiry = new Date(JSON.parse(tokenData).expiry);
        token = JSON.parse(tokenData).usertoken;
    }
    let currentDate = new Date();


    const dispatch = useDispatch();
    const { ContractorDataById } = useSelector((store) => store.admin);
    // const { first_name, last_name, email } = ContractorDataById

    const navigate = useNavigate();
    const { UpdateContractorProfileData, ContractorItSelfDetailsData: [ContractorItSelfDetails], } = useSelector((store) => store.admin);
    // const { _id, first_name, last_name, email, password, profileId } = ContractorItSelfDetails
    // const { ActualAadharNo, ActualName, ActualPanNo, , BankAccNo, BankName, BeneficiaryAadharNo, BeneficiaryName, BeneficiaryPanNo, , ContractName, , EmergencyContactNumber, EmergencyContactRelation, , IFSCcode, IsApproved, IsDecline, , Nationality, Religion, } = profileId
    const [profileDataObj] = UpdateContractorProfileData;

    const handleNavigateToCalendar = (path) => navigate(path);

    useEffect(() => {
        profileDataObj?.isContractorProfileUpdated &&
            dispatch(
                showToast({
                    type: "success",
                    message: "Contractor Updated Successfully",
                })
            );
    }, [dispatch, profileDataObj?.isContractorProfileUpdated]);

    useEffect(() => {
        setLoading(true);
        dispatch(asyncThunkGetOwnDetails({ setLoading, setCheckProfile }));
    }, [dispatch]);

    useEffect(() => {
        if (!ContractorItSelfDetails?.profileId && !checkProfile) {
            navigate("/contractorform");
        }
    }, [ContractorItSelfDetails, checkProfile]);

    useEffect(() => {
        if (!tokenData) {
            navigate("/login");
        } else {
            if (currentDate > tokenExpiry) {
                localStorage.removeItem("token");
                navigate("/login");
            }
            setTimeout(() => {
                setAuthScreen(false);
            }, 500);
        }

        // Create a Date object with the provided date and time
        const dateString = "Sat Aug 05 2023 05:30:00 GMT+0530";
        const dateObject = new Date(dateString);

        // Extract the components of the date
        const day = dateObject.getDate();
        const month = dateObject.getMonth() + 1; // Months are zero-based, so add 1
        const year = dateObject.getFullYear() % 100; // Extract last two digits of the year

        // Pad the components with leading zeros if needed
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;
        const formattedYear = year < 10 ? `0${year}` : year;

        // Combine the components into the desired format
        `${formattedDay}/${formattedMonth}/${formattedYear}`;
        setFormattedDate(`${formattedDay}/${formattedMonth}/${formattedYear}`)

        // console.log(formattedDate);

    }, []);

    if (authScreen || !ContractorItSelfDetails) {
        return (
            <>
                <PageAnimation />
            </>
        );
    }

    return (
        <>
            <div className="profileMainDiv">
                {ContractorItSelfDetails &&
                    ContractorItSelfDetails.profileId &&
                    ContractorItSelfDetails?.profileId?.IsApproved &&
                    !ContractorItSelfDetails?.profileId?.IsDecline && (<>
                        <Box sx={{ width: '100%', border: '2px solid black', display: 'flex', justifyContent: 'center' }}>
                            <Box sx={{ width: '40%', border: '2px solid black', backgroundColor: 'white', margin: '20px' }}>
                                <Box sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
                                    <Avatar aria-label="recipe" style={{ height: "100px", width: "100px", borderRadius: "50%", }}>
                                        <img src={"https://mui.com/static/images/avatar/3.jpg"} style={{ height: "100%", width: "100%", objectFit: "cover", objectPosition: "center", }} />
                                    </Avatar>
                                </Box>
                                <Box sx={{textAlign:'center'}}>
                                    <h1 style={{ fontSize: '25px' }}>{ContractorItSelfDetails?.first_name} {ContractorItSelfDetails?.last_name}</h1>
                                    <p style={{ color: "gray",lineHeight:'10px' }}>{ContractorItSelfDetails?.profileId?.Address}</p>
                                </Box>
                            </Box>
                            <Box sx={{ width: '48%', border: '2px solid black' }}>
                                dfg
                            </Box>
                        </Box>

                        <div className="section" style={{ width: "100%", height: "100%" }}>
                            <Card
                                variant="solid"
                                invertedColors
                                sx={{
                                    width: "100%",
                                    backgroundColor: "white",
                                    color: "black",
                                    borderRadius: { xs: 0, sm: "xs" },
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: { xs: "column", md: "row" },
                                        alignItems: { md: "flex-start" },
                                        justifyContent: "space-around",
                                        flexWrap: "wrap",
                                        gap: 2,
                                    }}
                                >
                                    <Grid
                                        item
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            marginTop: "30px",
                                            marginLeft: "0px",
                                        }}
                                    >
                                        <Avatar
                                            aria-label="recipe"
                                            style={{
                                                height: "100px",
                                                width: "100px",
                                                borderRadius: "50%",
                                            }}
                                        >
                                            <img
                                                src={"https://mui.com/static/images/avatar/3.jpg"}
                                                style={{
                                                    height: "100%",
                                                    width: "100%",
                                                    objectFit: "cover",
                                                    objectPosition: "center",
                                                }}
                                            />
                                        </Avatar>
                                        <Grid
                                            item
                                            style={{ marginTop: "-22px", marginLeft: "40px" }}
                                        >
                                            <h1 style={{ fontWeight: "666", marginBottom: "15px" }}>
                                                {ContractorItSelfDetails?.first_name}{" "}
                                                {ContractorItSelfDetails?.last_name}
                                            </h1>
                                            <p
                                                style={{
                                                    marginTop: "-25px",
                                                    color: "gray",
                                                    fontWeight: "666",
                                                }}
                                            >
                                                {ContractorItSelfDetails?.profileId?.Address}
                                            </p>
                                        </Grid>
                                    </Grid>
                                    <CardHeader />
                                    <List
                                        size="sm"
                                        orientation="horizontal"
                                        wrap
                                        sx={{ flexGrow: 0, "--ListItem-radius": "8px" }}
                                        style={{
                                            marginLeft: "0px",
                                            color: "black",
                                            marginTop: "20px",
                                        }}
                                    >
                                        <ListItem
                                            nested
                                            sx={{ width: { xs: "50%", md: 140, color: "black" } }}
                                        >
                                            <List>
                                                <ListItem>
                                                    <ListItem
                                                        style={{ color: "black", fontWeight: "666" }}
                                                    >
                                                        Phone:
                                                    </ListItem>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItem
                                                        style={{ color: "black", fontWeight: "666" }}
                                                    >
                                                        Email:
                                                    </ListItem>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItem
                                                        style={{ color: "black", fontWeight: "666" }}
                                                    >
                                                        Birthday:
                                                    </ListItem>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItem
                                                        style={{ color: "black", fontWeight: "666" }}
                                                    >
                                                        Address:
                                                    </ListItem>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItem
                                                        style={{ color: "black", fontWeight: "666" }}
                                                    >
                                                        Gender:
                                                    </ListItem>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItem
                                                        style={{ color: "black", fontWeight: "666" }}
                                                    >
                                                        Reports to:
                                                    </ListItem>
                                                </ListItem>
                                            </List>
                                        </ListItem>
                                        <ListItem nested sx={{ width: { xs: "50%", md: 180 } }}>
                                            <List sx={{ "--ListItemDecorator-size": "32px" }}>
                                                <ListItem>
                                                    <ListItem
                                                        style={{ color: "blue", fontWeight: "666" }}
                                                    >
                                                        {
                                                            ContractorItSelfDetails?.profileId
                                                                ?.EmergencyContactNumber
                                                        }
                                                    </ListItem>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItem
                                                        style={{ color: "blue", fontWeight: "666" }}
                                                    >
                                                        {ContractorItSelfDetails?.email}
                                                    </ListItem>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItem
                                                        style={{ color: "gray", fontWeight: "666" }}
                                                    >
                                                        {formattedDate}
                                                    </ListItem>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItem
                                                        style={{ color: "gray", fontWeight: "666" }}
                                                    >
                                                        {ContractorItSelfDetails?.profileId?.Address}
                                                    </ListItem>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItem
                                                        style={{ color: "gray", fontWeight: "666" }}
                                                    >
                                                        {ContractorItSelfDetails?.profileId?.Gender}
                                                    </ListItem>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItem
                                                        style={{
                                                            gap: "10px",
                                                            color: "blue",
                                                            fontWeight: "666",
                                                        }}
                                                    >
                                                        <Avatar>
                                                            <img
                                                                src={
                                                                    "https://mui.com/static/images/avatar/3.jpg"
                                                                }
                                                                style={{
                                                                    height: "100%",
                                                                    width: "100%",
                                                                    objectFit: "cover",
                                                                    objectPosition: "center",
                                                                }}
                                                            />
                                                        </Avatar>
                                                        {ContractorItSelfDetails?.profileId?.ReportTo}
                                                    </ListItem>
                                                </ListItem>
                                            </List>
                                        </ListItem>
                                    </List>
                                </Box>
                            </Card>
                            <Box sx={{ display: "flex", justifyContent: "center" }}>
                                <Cardss ContractorItSelfDetails={ContractorItSelfDetails} />
                            </Box>
                        </div>
                    </>
                    )}
                {ContractorItSelfDetails?.profileId?.IsApproved === false &&
                    ContractorItSelfDetails?.profileId?.IsDecline === false && (
                        <>
                            <div className="clockAnimation">
                                <div className="loaders">
                                    <svg
                                        xml: space="preserve"
                                        viewBox="0 0 80 80"
                                        height="80px"
                                        width="80px"
                                        y="0px"
                                        x="0px"
                                        xmlns: xlink="http://www.w3.org/1999/xlink"
                                        xmlns="http://www.w3.org/2000/svg"
                                        id="Layer_1"
                                        version="1.1"
                                        className="clock"
                                    >
                                        {" "}
                                        <image
                                            href="data:image/png;base64,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"
                                            y="0"
                                            x="0"
                                            height="80"
                                            width="80"
                                            id="image0"
                                        ></image>
                                    </svg>
                                    <div className="stage"></div>
                                    <div className="hold">
                                        <div className="ball"></div>
                                    </div>
                                </div>
                                <h1>We are reviewing your profile ! please wait</h1>
                            </div>
                        </>
                    )}
                {ContractorItSelfDetails?.profileId?.IsDecline === true &&
                    ContractorItSelfDetails?.profileId?.IsApproved === false && (
                        <>
                            {" "}
                            <div className="rejectDiv">
                                <img
                                    width="64"
                                    height="64"
                                    src="https://img.icons8.com/wired/64/disapprove.png"
                                    alt="disapprove"
                                />
                                <h1>Sorry this couldn&apos;t workout !</h1>
                                <h1>Please check your email for more feedback !</h1>
                                <WhiteButton text={'Open Form'} onClick={() => handleNavigateToCalendar("/contractorform")} />
                            </div>
                        </>
                    )}
            </div>
        </>
    );
}
