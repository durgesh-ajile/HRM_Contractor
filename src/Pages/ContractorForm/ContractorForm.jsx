import { Box } from "@mui/material"
import { TextField, Button, Container, Grid } from '@mui/material';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncThunkUpdateContractorProfile } from "../../redux/createAsyncThunk";
import { showToast } from "../../redux/errorSlice/errorSlice";
import { useNavigate } from "react-router-dom";

const ContractorForm = () => {

    const [input, setInput] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { UpdateContractorProfileData} = useSelector(store => store.admin)
    const [profileDataObj] = UpdateContractorProfileData;

    const handleChangeInput = (e, isFiles) => {
        setInput((prev) => {
            prev[e.target.name] = isFiles ? e.target.files[0] : e.target.value;
            localStorage.setItem('contractorFormData', JSON.stringify(prev))
            return { ...prev }
        })
    }
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(asyncThunkUpdateContractorProfile(input))
    }
    
    useEffect(()=>{
        profileDataObj?.isContractorProfileUpdated && navigate('/profile/:contractorId')
    },[navigate, profileDataObj?.isContractorProfileUpdated])

    useEffect(() => {
        let contractorFormData = null
        try {
            contractorFormData = JSON.parse(localStorage.getItem('contractorFormData'))
            contractorFormData === null && dispatch(showToast({ type: "error", message: "token expired ! please signin again" }))
        } catch (error) {
            dispatch(showToast({ type: "error", message: "token expired ! please signin again" }))
        }
        contractorFormData !== null && setInput(contractorFormData)
    }, [dispatch])

    return (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ width: '90%' }}>

                <form onSubmit={(e) => onSubmit(e)}>
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: { md: "row", xs: "column" } }}>
                        <TextField onChange={(e) => handleChangeInput(e, false)} value={input?.actualName} name='actualName' sx={{ width: { md: '50%', xs: '100%' }, marginRight: '20px' }} id="standard-basic" label="Enter Your ActualName" variant="standard" type="text" required />
                        <TextField onChange={(e) => handleChangeInput(e, false)} value={input?.actualAadharNo} name='actualAadharNo' sx={{ width: { md: '50%', xs: '100%' } }} id="standard-basic" label="Enter Actual Aadhar No" variant="standard" type="number" required />
                    </Box>
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: { md: "row", xs: "column" } }}>
                        <TextField onChange={(e) => handleChangeInput(e, false)} value={input?.actualPanNo} name='actualPanNo' sx={{ width: { md: '50%', xs: '100%' }, marginRight: '20px' }} id="standard-basic" label="Enter Your Actual Pan No" variant="standard" type="text" required />
                        <TextField onChange={(e) => handleChangeInput(e, false)} value={input?.beneficiaryName} name='beneficiaryName' sx={{ width: { md: '50%', xs: '100%' } }} id="standard-basic" label="Enter Your Beneficiary Name" variant="standard" type="text" required />
                    </Box>
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: { md: "row", xs: "column" } }}>
                        <TextField onChange={(e) => handleChangeInput(e, false)} value={input?.beneficiaryAadharNo} name='beneficiaryAadharNo' sx={{ width: { md: '50%', xs: '100%' }, marginRight: '20px' }} id="standard-basic" label="Enter Your Beneficiary Aadhar No" variant="standard" type="number" required />
                        <TextField onChange={(e) => handleChangeInput(e, false)} value={input?.beneficiaryPanNo} name='beneficiaryPanNo' sx={{ width: { md: '50%', xs: '100%' } }} id="standard-basic" label="Enter Your Beneficiary Pan No" variant="standard" type="text" required />
                    </Box>
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: { md: "row", xs: "column" } }}>
                        <TextField onChange={(e) => handleChangeInput(e, false)} value={input?.bankName} name='bankName' sx={{ width: { md: '50%', xs: '100%' }, marginRight: '20px' }} id="standard-basic" label="Enter Your Bank Name" variant="standard" type="text" required />
                        <TextField onChange={(e) => handleChangeInput(e, false)} value={input?.bankAccNo} name='bankAccNo' sx={{ width: { md: '50%', xs: '100%' } }} id="standard-basic" label="Enter Your Bank Account No" variant="standard" type="number" required />
                    </Box>
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: { md: "row", xs: "column" } }}>
                        <TextField onChange={(e) => handleChangeInput(e, false)} value={input?.ifscCode} name='ifscCode' sx={{ width: { md: '50%', xs: '100%' }, marginRight: '20px' }} id="standard-basic" label="Enter Your IFSC Code" variant="standard" type="text" required />
                        <TextField onChange={(e) => handleChangeInput(e, false)} value={input?.contractName} name='contractName' sx={{ width: { md: '50%', xs: '100%' } }} id="standard-basic" label="Enter Your Contract Name" variant="standard" type="text" required />
                    </Box>
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: { md: "row", xs: "column" } }}>
                        <TextField onChange={(e) => handleChangeInput(e, false)} value={input?.joinDate} name='joinDate' sx={{ width: { md: '50%', xs: '100%' }, marginRight: '20px' }} id="standard-basic" variant="standard" type="date" required />
                        <TextField onChange={(e) => handleChangeInput(e, false)} value={input?.birthday} name='birthday' sx={{ width: { md: '50%', xs: '100%' } }} id="standard-basic" variant="standard" type="date" required />
                    </Box>
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: { md: "row", xs: "column" } }}>
                        <TextField onChange={(e) => handleChangeInput(e, false)} value={input?.address} name='address' sx={{ width: { md: '50%', xs: '100%' }, marginRight: '20px' }} id="standard-basic" label="Enter Your Address" variant="standard" type="text" required />
                        <TextField onChange={(e) => handleChangeInput(e, false)} value={input?.gender} name='gender' sx={{ width: { md: '50%', xs: '100%' } }} id="standard-basic" label="Enter Your Gender" variant="standard" type="text" required />
                    </Box>
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: { md: "row", xs: "column" } }}>
                        <TextField onChange={(e) => handleChangeInput(e, false)} value={input?.reportTo} name='reportTo' sx={{ width: { md: '50%', xs: '100%' }, marginRight: '20px' }} id="standard-basic" label="Enter Your Report To" variant="standard" type="text" required />
                        <TextField onChange={(e) => handleChangeInput(e, false)} value={input?.nationality} name='nationality' sx={{ width: { md: '50%', xs: '100%' } }} id="standard-basic" label="Enter Your Nationality" variant="standard" type="text" required />
                    </Box>
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: { md: "row", xs: "column" } }}>
                        <TextField onChange={(e) => handleChangeInput(e, false)} value={input?.religion} name='religion' sx={{ width: { md: '50%', xs: '100%' }, marginRight: '20px' }} id="standard-basic" label="Enter Your Religion" variant="standard" type="text" required />
                        <TextField onChange={(e) => handleChangeInput(e, false)} value={input?.emergencyContactName} name='emergencyContactName' sx={{ width: { md: '50%', xs: '100%' } }} id="standard-basic" label="Enter Your Emergency Contact Name" variant="standard" type="text" required />
                    </Box>
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: { md: "row", xs: "column" } }}>
                        <TextField onChange={(e) => handleChangeInput(e, false)} value={input?.emergencyContactRelation} name='emergencyContactRelation' sx={{ width: { md: '50%', xs: '100%' }, marginRight: '20px' }} id="standard-basic" label="Enter Your Emergency Contact Relation" variant="standard" type="text" required />
                        <TextField onChange={(e) => handleChangeInput(e, false)} value={input?.emergencyContactNumber} name='emergencyContactNumber' sx={{ width: { md: '50%', xs: '100%' } }} id="standard-basic" label="Enter Your Emergency Contact Number" variant="standard" type="number" required />
                    </Box>
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: { md: "row", xs: "column" } }}>
                        <TextField onChange={(e) => handleChangeInput(e, true)} name='actualPanImage' accept="image/*" sx={{ width: { md: '50%', xs: '100%' }, marginRight: '20px' }} id="standard-basic" variant="standard" type="file" required />
                        <TextField onChange={(e) => handleChangeInput(e, true)} name='actualAdharImage' accept="image/*" sx={{ width: { md: '50%', xs: '100%' } }} id="standard-basic" variant="standard" type="file" required />
                    </Box>
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: { md: "row", xs: "column" } }}>
                        <TextField onChange={(e) => handleChangeInput(e, true)} name='beneficiaryPanImage' accept="image/*" sx={{ width: { md: '50%', xs: '100%' }, marginRight: '20px' }} id="standard-basic" variant="standard" type="file" required />
                        <TextField onChange={(e) => handleChangeInput(e, true)} name='beneficiaryAadharImage' accept="image/*" sx={{ width: { md: '50%', xs: '100%' } }} id="standard-basic" variant="standard" type="file" required />
                    </Box>
                    <Box mt={2}>
                        <Button variant="outlined" color="primary" type="submit">
                            Submit
                        </Button>
                    </Box>
                </form>
            </Box>
        </Box>
    )
}

export default ContractorForm
