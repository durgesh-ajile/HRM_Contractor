import "./Profile.css"
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import { Avatar, CardHeader } from '@mui/material';
import { Grid } from '@mui/joy';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import Cardss from "./Cards"
import { useEffect } from "react";
import { asyncThunkGetOwnDetails } from "../../redux/createAsyncThunk";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../../redux/errorSlice/errorSlice";

export default function Profile() {

    const dispatch = useDispatch()
    const { ContractorDataById } = useSelector(store => store.admin)
    // const { first_name, last_name, email } = ContractorDataById

    const navigate = useNavigate()
    const { UpdateContractorProfileData, ContractorItSelfDetailsData: [ContractorItSelfDetails] } = useSelector(store => store.admin)
    // const { _id, first_name, last_name, email, password, profileId } = ContractorItSelfDetails
    // const { ActualAadharNo, ActualName, ActualPanNo, , BankAccNo, BankName, BeneficiaryAadharNo, BeneficiaryName, BeneficiaryPanNo, , ContractName, , EmergencyContactNumber, EmergencyContactRelation, , IFSCcode, IsApproved, IsDecline, , Nationality, Religion, } = profileId
    const [profileDataObj] = UpdateContractorProfileData;

    const handleNavigateToCalendar = (path) => navigate(path)

    useEffect(() => {
        profileDataObj?.isContractorProfileUpdated && dispatch(showToast({ type: "success", message: "Contractor Updated Successfully" }))
    }, [dispatch, profileDataObj?.isContractorProfileUpdated])

    useEffect(() => {
        dispatch(asyncThunkGetOwnDetails())
    }, [dispatch])

    return (
        <>
            {
                ContractorItSelfDetails?.profileId?.IsApproved && !ContractorItSelfDetails?.profileId?.IsDecline &&
                (<div className='section' style={{ width: "100%", height: "100%" }}>
                    <Card

                        variant="solid"

                        invertedColors
                        sx={{
                            width: "100%",
                            position: "relative",
                            backgroundColor: "white",
                            color: "black",
                            flexGrow: 1,
                            p: 2,
                            mx: -3,
                            my: -3,
                            borderRadius: { xs: 0, sm: 'xs' },
                            height: "50%",
                        }}
                    >

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', md: 'row' },

                                alignItems: { md: 'flex-start' },
                                justifyContent: 'space-around',
                                flexWrap: 'wrap',
                                gap: 2,

                            }}
                        >


                            <Grid item style={{ display: "flex", flexDirection: "row", marginTop: "30px", marginLeft: "0px" }}>
                                <Avatar aria-label="recipe" style={{ height: "100px", width: "100px", borderRadius: "50%" }}>
                                    <img src={'https://mui.com/static/images/avatar/3.jpg'} style={{ height: "100%", width: "100%", objectFit: "cover", objectPosition: "center" }} />
                                </Avatar>
                                <Grid item style={{ marginTop: "-22px", marginLeft: "40px", }}>

                                    <h1 style={{ fontWeight: "666", marginBottom: '15px' }}>{ContractorItSelfDetails?.first_name} {ContractorItSelfDetails?.last_name}</h1>
                                    <p style={{ marginTop: "-25px", color: "gray", fontWeight: "666" }}>{ContractorItSelfDetails?.profileId?.Address}</p>

                                    <button onClick={() => handleNavigateToCalendar('/calender')} id='btn' style={{ marginTop: "10px", height: "40px", width: "160px", border: "none", borderRadius: "3%" }}>Open Calendar</button>
                                    <button onClick={() => handleNavigateToCalendar('/contractorform')} id='btn' style={{ marginTop: "10px", height: "40px", width: "160px", border: "none", borderRadius: "3%" }}>Open Form</button>

                                </Grid>

                            </Grid>
                            <CardHeader />
                            <List
                                size="sm"
                                orientation="horizontal"
                                wrap
                                sx={{ flexGrow: 0, '--ListItem-radius': '8px' }}
                                style={{ marginLeft: "0px", color: "black", marginTop: "20px" }}
                            >
                                <ListItem nested sx={{ width: { xs: '50%', md: 140, color: "black" } }}>

                                    <List>
                                        <ListItem >
                                            <ListItem style={{ color: "black", fontWeight: "666" }}>Phone:</ListItem>
                                        </ListItem>
                                        <ListItem>
                                            <ListItem style={{ color: "black", fontWeight: "666" }}>Email:</ListItem>
                                        </ListItem>
                                        <ListItem>
                                            <ListItem style={{ color: "black", fontWeight: "666" }}>Birthday:</ListItem>
                                        </ListItem>
                                        <ListItem>
                                            <ListItem style={{ color: "black", fontWeight: "666" }}>Address:</ListItem>
                                        </ListItem>
                                        <ListItem>
                                            <ListItem style={{ color: "black", fontWeight: "666" }}>Gender:</ListItem>
                                        </ListItem>
                                        <ListItem>
                                            <ListItem style={{ color: "black", fontWeight: "666" }}>Reports to:</ListItem>
                                        </ListItem>
                                    </List>
                                </ListItem>
                                <ListItem nested sx={{ width: { xs: '50%', md: 180 } }}>

                                    <List sx={{ '--ListItemDecorator-size': '32px' }}>
                                        <ListItem>
                                            <ListItem style={{ color: "blue", fontWeight: "666" }}>

                                                {ContractorItSelfDetails?.profileId?.EmergencyContactNumber}
                                            </ListItem>
                                        </ListItem>
                                        <ListItem>
                                            <ListItem style={{ color: "blue", fontWeight: "666" }}>

                                                {ContractorItSelfDetails?.email}
                                            </ListItem>
                                        </ListItem>
                                        <ListItem>
                                            <ListItem style={{ color: "gray", fontWeight: "666" }}>

                                                {ContractorItSelfDetails?.profileId?.Birthday}
                                            </ListItem>
                                        </ListItem>
                                        <ListItem>
                                            <ListItem style={{ color: "gray", fontWeight: "666" }}>

                                                {ContractorItSelfDetails?.profileId?.Address}

                                            </ListItem>

                                        </ListItem>
                                        <ListItem>
                                            <ListItem style={{ color: "gray", fontWeight: "666" }}>
                                                {ContractorItSelfDetails?.profileId?.Gender}
                                            </ListItem>
                                        </ListItem>
                                        <ListItem>
                                            <ListItem style={{ gap: "10px", color: "blue", fontWeight: "666" }}>
                                                <Avatar  >
                                                    <img src={'https://mui.com/static/images/avatar/3.jpg'} style={{ height: "100%", width: "100%", objectFit: "cover", objectPosition: "center" }} />
                                                </Avatar>
                                                {ContractorItSelfDetails?.profileId?.ReportTo}
                                            </ListItem>
                                        </ListItem>
                                    </List>
                                </ListItem>
                            </List>
                            <span style={{ height: "39px", width: "39px", backgroundColor: "lightgray", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "20px", marginLeft: "10px" }} >
                                <EditIcon color="disabled" />
                            </span>
                        </Box>

                    </Card >
                    <Cardss ContractorItSelfDetails={ContractorItSelfDetails} />
                </div>

                )
            }
            {!ContractorItSelfDetails?.profileId?.IsApproved && <h1>We are reviewing yout profile ! please wait</h1>}
            {ContractorItSelfDetails?.profileId?.IsDecline && <> <h1>Sorry this couldn&apos;t workout !</h1><h1>Please check yout email for more feedback !</h1></>}
        </>
    );
}
