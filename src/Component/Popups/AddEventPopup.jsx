import { useState } from 'react';
import './New.css';
import { useDispatch } from 'react-redux';
import { asyncThunkCreateTask } from '../../redux/createAsyncThunk';
import { Button } from '@mui/material';


// eslint-disable-next-line react/prop-types
function AddEventPopup({ setShowPopup, dateState, monthState, organization }) {

  const [timesheetDetails, setTimesheetDetails] = useState({});
  const dispatch = useDispatch();

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleInputChange = (e) => {
    setTimesheetDetails((prev) => {
      prev[e.target.name] = e.target.name === 'workingHour' ? parseInt(e.target.value) <= 0 ? 0 : parseInt(e.target.value) >= 24 ? 24 : parseInt(e.target.value) : e.target.value;
      return { ...prev }
    })
  };


  const handleAddEvents = () => {
    const payload = {
      "date": dateState,"organization" : organization, ...timesheetDetails, "month": monthState
    }
    console.log(organization)
    dispatch(asyncThunkCreateTask(payload))
    closePopup();
  };
  console.log(dateState)

  return (
    <div className="popup">
      <div className="popup" onClick={closePopup}></div>
      <div className="popup-inner">
        <h2>Add Timesheet</h2>
        <form>
          <label htmlFor="date">Date:</label>
          <input type="text" id="date" name="date" disabled value={dateState} />

          <label htmlFor="task">Task:</label>
          <input type="text" id="task" name="task" value={timesheetDetails.task} onChange={handleInputChange} />

          <label htmlFor="time">Working Hours:</label>
          <input type="number" id="time" name="workingHour" value={timesheetDetails.workingHour} onChange={handleInputChange} />

          <button disabled={timesheetDetails?.task && timesheetDetails?.workingHour ? false : true} style={{ cursor: !timesheetDetails?.task && !timesheetDetails?.workingHour && 'no-drop' }} type="button" className='add-button' onClick={handleAddEvents}>ADD</button>
          <Button variant="outlined" color="error" sx={{ mt: "15px" }} onClick={closePopup}>Close</Button>
        </form>
      </div>
    </div>
  );
}

export default AddEventPopup;