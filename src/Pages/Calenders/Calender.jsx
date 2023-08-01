import React, { useState } from "react";
import moment from "moment";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./Calender.css"
import AddEventPopup from "../../Component/Popups/AddEventPopup";
moment.locale("en-GB");


export default function ReactBigCalendar() {
  const [eventsData, setEventsData] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleDateClick = (arg) => {
    togglePopup()
  };

  const handleDateSet = (date) => {
    console.log(date.start);
    console.log(date.end);
  };

  return (
    <>
      <div className="calender-div">
      {showPopup && ( <AddEventPopup setShowPopup={setShowPopup} showPopup={showPopup}/> )}
        <div className="Full-Calender">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            dateClick={(e) => handleDateClick(e)}
            events={[
              { title: "8 hours", date: "2023-07-07", time: true },
              { title: "event 1", date: "2023-07-07", time: false },
              { title: "event 1", date: "2023-07-17", time: false },
            ]}
            datesSet={(date) => handleDateSet(date)}
            eventContent={renderEventContent}
          />
        </div>
      </div>
    </>
  );
}

function renderEventContent(eventInfo) {
  return (
    <div
      style={
        eventInfo.event.time ? { background: "red" } : { background: "green" }
      }
    >
      <i>{eventInfo.event.title}</i>
    </div>
  );
}
