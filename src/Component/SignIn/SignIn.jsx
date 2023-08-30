import { useEffect, useState } from "react";
import styles from "./Sign.module.css";
import { BsPersonCircle } from "react-icons/bs";
import { AiFillLock } from "react-icons/ai";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import { asyncThunkLogin } from "../../redux/createAsyncThunk";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AlertDialogSlide from "../common/AlertDialogSlide";
import { showToast } from "../../redux/errorSlice/errorSlice";

const SingIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    LoginData: { usertoken, expiry },
  } = useSelector((store) => store.admin);

  const handleLogin = (event) => {
    event.preventDefault();
    // // if (isValid) {
      setLoading(true);
  
      const navigateAfterLogin = () => setTimeout(() => navigate("/"), 2000)
  
      dispatch(asyncThunkLogin({
        email: email, password: password, navigateAfterLogin: navigateAfterLogin, setLoading: setLoading,
      }));
    // } else {
    //   dispatch(showToast({ type: "warning", message: "Email Type Should be @ajiledone.com" }))

    // }
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h5 className={styles.heading} style={{ textAlign: "center" }}>
          Login to your account
        </h5>
        <p style={{ textAlign: "center", columnGap: "-10px" }} className="para">
          Enter your credentials below
        </p>

        <form onSubmit={(e) => handleLogin(e)}>
          <label className="py-2">Email</label>

          <div className="input-group input-group-lg mb-3 flex-nowrap">
            <span className="input-group-text" id="basic-addon1">
              <BsPersonCircle />
            </span>
            <input
              type="email"
              className="form-control py-2"
              placeholder="Example@ajiledone.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setIsValid(e.target.value.endsWith('@ajiledone.com'))
              }}
              required
            />
          </div>
          <label className="py-2">Password</label>
          <div className="input-group input-group-lg mb-3 ">
            <span className="input-group-text" id="basic-addon1">
              <AiFillLock />
            </span>
            <input
              type="password"
              className="form-control"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Grid container style={{ paddingTop: "10px", cursor: "pointer" }}>
            <Grid item>
              <AlertDialogSlide />
            </Grid>
          </Grid>

          {loading ? (
            <div className={styles.animatefooter}>
              <div className={styles.loader}></div>
            </div>
          ) : (
            <div className={styles.footer}>
              <button>Sign In</button>
            </div>
          )}

          <div className={styles.paragraph}>
            <p>
              By continuing, you're confirming that you've read our{" "}
              <span style={{ color: "blue" }}>
                Terms & Condition
                <span style={{ color: "black" }}> and </span>
                Cookie Policy
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SingIn;
