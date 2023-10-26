import { useEffect, useState } from "react";
import moment from "moment";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./Calender.css";
import AddEventPopup from "../../Component/Popups/AddEventPopup";
import {
  asyncThunkGetOwnDetails,
  asyncThunkGetTask,
} from "../../redux/createAsyncThunk";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
import { Button, NativeSelect } from "@mui/material";
import Email from "../../Component/Email/Email";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

moment.locale("en-GB");

export default function ReactBigCalendar() {
  const [showPopup, setShowPopup] = useState(false);
  const [dateState, setdateState] = useState();
  const [monthState, setMonthState] = useState();
  const [organization, setOrganization] = useState("");
  const [organizationEmail, setOrganizationEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkProfile, setCheckProfile] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { GetContractorTaskInCalenderData } = useSelector(
    (store) => store.admin
  );

  const {
    ContractorItSelfDetailsData: [ContractorItSelfDetails],
  } = useSelector((store) => store.admin);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  useEffect(() => {
    setLoading(true);
    dispatch(asyncThunkGetOwnDetails({ setLoading, setCheckProfile }));
  }, [dispatch]);

  const handleDateClick = (e) => {
    let [day, month, year] = e.date.toLocaleDateString("pt-PT").split("/");
    day = day.padStart(2, "0");
    month = month.padStart(2, "0");
    let formattedDate = `${day}/${month}/${year}`;
    console.log(formattedDate);
    setdateState(formattedDate);
    let formattedMonth = `${month}/${year}`;
    setMonthState(formattedMonth)
    togglePopup();
  };

  const handleDateSet = (e, organization) => {
    let [, month, year] = e.end.toLocaleDateString("pt-PT").split("/");
    let formattedDate = `${
      month - 1 == 0 ? 12 : month - 1 <= 9 ? `0${month - 1}` : month - 1
    }/${year}`;
    console.log(formattedDate);
    dispatch(asyncThunkGetTask({ formattedDate, organization: organization }));
  };

  function rearrangeEvent(GetContractorTaskInCalenderData) {
    let output1 = [];
    let output2 = [];
    for (let i = 0; i < GetContractorTaskInCalenderData.length; i++) {
      output1.push({
        date: GetContractorTaskInCalenderData[i].date,
        title: GetContractorTaskInCalenderData[i].title,
        // "isHour": false
      });
    }
    for (let i = 0; i < GetContractorTaskInCalenderData.length; i++) {
      output1.push({
        date: GetContractorTaskInCalenderData[i].date,
        title: GetContractorTaskInCalenderData[i].workingHour,
        // "isHour": true
      });
    }
    return [...output1, ...output2];
  }

  const headers = [
    { label: "Date", key: "date" },
    { label: "Task", key: "title" },
    { label: "WorkingHour", key: "workingHour" },
  ];

  useEffect(() => {
    if (!organization) {
      setOrganization(ContractorItSelfDetails?.profileId?.SelfOrganization[0]?.id._id);
      setOrganizationEmail(ContractorItSelfDetails?.profileId?.SelfOrganization[0]?.id.clientEmail)
    }
  }, [ContractorItSelfDetails]);
  console.log(ContractorItSelfDetails)
  // console.log(GetContractorTaskInCalenderData)


  return (
    <>
      <Email organization={organization} organizationEmail={organizationEmail} />
      <div className="calender-div">
        {showPopup && (
          <AddEventPopup
            dateState={dateState}
            monthState={monthState}
            setShowPopup={setShowPopup}
            showPopup={showPopup}
            organization={organization}
          />
        )}
        {ContractorItSelfDetails && (
          <Box sx={{ width: 270, marginBottom:3 }}>
            <FormControl fullWidth>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Organization
              </InputLabel>
              <NativeSelect
                value={organization}
                inputProps={{
                  name: "organization",
                  id: "uncontrolled-native",
                }}
                onChange={(e) => {
                  setOrganization(e.target.value);
                }}
              >
                {ContractorItSelfDetails?.profileId?.SelfOrganization.map(
                  (organization) => {
                    return <option value={organization.id._id}>{organization.id.clientName}</option>;
                  }
                )}
              </NativeSelect>
            </FormControl>
          </Box>
        )}
        <div className="Full-Calender">
          <Button id="export-btn" variant="contained">
            <CSVLink
              data={GetContractorTaskInCalenderData}
              headers={headers}
              filename="MyMonthlyTask.csv"
            >
              Export
            </CSVLink>
          </Button>
          <FullCalendar
            key={organization}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            dateClick={(e) => handleDateClick(e)}
            events={rearrangeEvent(GetContractorTaskInCalenderData)}
            datesSet={(e) => {
              handleDateSet(e, organization);
            }}
            eventContent={renderEventContent}
          />
        </div>
      </div>
    </>
  );
}

function renderEventContent(eventInfo) {
  return (
    <div style={{ background: "#0B666A" }}>
      <i className="event-detail">{eventInfo.event.title}</i>
    </div>
  );
}
