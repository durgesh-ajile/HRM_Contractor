import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import ReactBigCalendar from "./src/Pages/Calenders/Calender";
import Profile from "./src/Component/profile/Profile";
import ResponsiveDrawer from "./src/Component/SIdebar/Sidebar";
import Fourzerofour from "./src/Component/Fourzerofour/Fourzerofour.jsx";
import ContractorForm from "./src/Pages/ContractorForm/ContractorForm";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "./src/redux/errorSlice/errorSlice";

const Landing = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [token, setToken] = useState(null)
  const { ContractorItSelfDetailsData: [ContractorItSelfDetails] } = useSelector(store => store.admin)

  useEffect(() => {
    try {

      const { usertoken } = JSON.parse(localStorage.getItem('token'))
      setToken(usertoken && usertoken)
    } catch (error) {
      navigate('/login')
      dispatch(showToast({ type: "error", message: "please signin again !" }))
    }
  }, [dispatch, navigate])

  return (
    <div className="landing">
      {token && <><ResponsiveDrawer />
        <div className="right-container">
          <Routes>
            <Route path="/" element={<Profile />} />
            <Route path="*" element={<Fourzerofour  />} />
            {
              ContractorItSelfDetails?.profileId?.IsApproved && !ContractorItSelfDetails?.profileId?.IsDecline &&
              <Route path="/calender" element={<ReactBigCalendar />} />
            }
          </Routes>
        </div>
      </>}
    </div>
  );
};

export default Landing;
