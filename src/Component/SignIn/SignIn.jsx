import { useEffect, useState } from 'react';
import styles from './Sign.module.css';
import { BsPersonCircle } from 'react-icons/bs';
import { AiFillLock } from 'react-icons/ai'
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import { asyncThunkLogin } from '../../redux/createAsyncThunk';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AlertDialogSlide from '../common/AlertDialogSlide';


const SingIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { LoginData: { usertoken, expiry }, ContractorItSelfDetailsData } = useSelector((store) => store.admin)
    const [profileData] = ContractorItSelfDetailsData
    const handleLogin = (event) => {
        event.preventDefault();
        dispatch(asyncThunkLogin({ email, password }))
        setTimeout(() => {
            setTimeout(() => {
                usertoken && profileData?.profileId ? navigate('/') : navigate('/contractorform/update')
            }, 0);
        }, 1000);
    };

    return (
        <div className={styles.container}>
            <div className={styles.innerBox}>
                <h5 className={styles.heading} style={{ textAlign: 'center' }}>Login to your account</h5>
                <p style={{ textAlign: 'center', columnGap: '-10px' }} className='para'>Enter your credentials below</p>

                <form onSubmit={(e) => handleLogin(e)}>
                    <label className="py-2">Email</label>

                    <div className="input-group input-group-lg mb-3 flex-nowrap">
                        <span className="input-group-text" id="basic-addon1"><BsPersonCircle />
                        </span>
                        <input type="email" className="form-control py-2" placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required

                        />
                    </div>
                    <label className="py-2">Password</label>
                    <div className="input-group input-group-lg mb-3 ">
                        <span className="input-group-text" id="basic-addon1"><AiFillLock />
                        </span>
                        <input type="password" className="form-control" placeholder="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <Grid container style={{ paddingTop: '10px', cursor: 'pointer' }}>
                        <Grid item>
                            <AlertDialogSlide />
                        </Grid>
                    </Grid>

                    <div className={styles.footer} style={{ marginTop: '10px' }}>
                        <button>Sign  in</button>
                    </div>


                    <div className={styles.paragraph}>
                        <p>By continuing, you're confirming that you've read our <span style={{ color: 'blue' }}>Tearms & Condition
                            <span style={{ color: 'black' }}> and </span>
                            Cookie Policy</span></p>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default SingIn
