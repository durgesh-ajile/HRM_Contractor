import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import ReactBigCalendar from "./src/Pages/Calenders/Calender";
import Profile from "./src/Component/profile/Profile";
import ResponsiveDrawer from "./src/Component/SIdebar/Sidebar";
import ContractorForm from "./src/Pages/ContractorForm/ContractorForm";
import { useDispatch } from "react-redux";
import { showToast } from "./src/redux/errorSlice/errorSlice";

const Landing = () => {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [token, setToken] = useState(null)

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
            <Route path="/contractorForm" element={<ContractorForm />} />
            <Route path="/calender" element={<ReactBigCalendar />} />
          </Routes>
        </div>
      </>}
    </div>
  );
};

export default Landing;
