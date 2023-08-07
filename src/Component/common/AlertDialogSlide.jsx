import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Link, TextField } from '@mui/material';
import WhiteButton from './WhiteButton';
import { forwardRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
    const [open, setOpen] = useState(false);
    const [inputForgotPassword, setInputForgotPassword] = useState({});
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangeInputForgotPassword = e => {
        setInputForgotPassword(prev => (prev[e.target.name] = e.target.value, { ...prev }))
    }

    const handleForgotPassword = () => {
        dispatch(asyncThunkForgotPassword(inputForgotPassword))
        setOpen(false);
        navigate(`/registration`)
        // const url = `https://www.google.com/search?q=${encodeURIComponent('https://mail.google.com/')}`;
        // window.open(url, '_blank');
        // navigate(`https://www.google.com/search?q=${`https://mail.google.com/`}`)
    };

    return (
        <div>
            <Link onClick={handleClickOpen} variant="body2" >
                Forgot password?
            </Link>
            {/* <Button variant="outlined" onClick={handleClickOpen}>
                Slide in alert dialog
            </Button> */}
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Are you sure you want to Change the Password ?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Enter your Email and Click on the Send button then check your email
                    </DialogContentText>
                    <TextField onChange={e => handleChangeInputForgotPassword(e)} fullWidth type='email' name='email' id="standard-basic" label="Type your Email Here" variant="standard" />
                </DialogContent>
                <DialogActions>
                    <WhiteButton onClick={handleClose} text={'Cancle'} />
                    <WhiteButton onClick={() => handleForgotPassword()} text={'Send'} />
                </DialogActions>
            </Dialog>
        </div>
    );
}
