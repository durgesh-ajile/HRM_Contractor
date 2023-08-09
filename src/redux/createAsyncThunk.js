import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchSignUp, fetchLogin, fetchAddContractor, fetchContractorById, fetchApprovedContractorById, fetchUpdateContractorProfile, fetchContractorItSelfDetailsData, fetchAddContractorTaskInCalender, fetchGetContractorTaskInCalender, fetchForgotPassword, fetchResetPassword } from "./admin/databaseSlice";
import { showToast } from "./errorSlice/errorSlice";

// // SIGN_UP
// export const asyncThunkSignUp = createAsyncThunk("post/asyncThunkSignUp", async (payload, { dispatch }) => {
//     await axios.post(`${import.meta.env.VITE_BASE_URL + import.meta.env.VITE_SIGN_UP}`, payload)
//         .then(res => {
//             if (res.status !== 201) return
//             dispatch(fetchSignUp({ ...res?.data?.data, isPageRedirect: true }))
//             dispatch(showToast({ type: "success", message: "SignUp Successfully" }))
//         }).catch(err => {
//             dispatch(fetchSignUp([]))
//             dispatch(showToast({ type: "error", message: "Something Went Wrong !" }))
//             console.error(err);
//         })
// })

// LOGIN
export const asyncThunkLogin = createAsyncThunk("post/asyncThunkLogin", async (payload, { dispatch }) => {
    await axios.post(`${import.meta.env.VITE_BASE_URL + import.meta.env.VITE_LOGIN_CONTRACTOR}`, payload)
        .then(res => {
            if (res.status !== 201) return
            dispatch(fetchLogin(res?.data?.Token))
            dispatch(showToast({ type: "success", message: "Login Successfully" }))
        }).catch(error => {
            console.log("error", error)
            dispatch(fetchLogin([]))
            dispatch(showToast({ type: "error", message: "Something Went Wrong !" }))
        })
})

// ADD_CONTRACTOR
export const asyncThunkAddContractor = createAsyncThunk("post/asyncThunkAddContractor", async (payload, { dispatch }) => {
    const { usertoken } = JSON.parse(localStorage.getItem('token'))
    const headers = { 'Authorization': `Bearer ${usertoken}` };
    usertoken ?
        await axios.post(`${import.meta.env.VITE_BASE_URL + import.meta.env.VITE_ADD_CONTRACTOR}`, payload, { headers })
            .then(res => {
                if (res.status !== 201) return
                dispatch(fetchAddContractor([res?.data?.data]))
                dispatch(showToast({ type: "success", message: "Contractor Added Successfully" }))
            }).catch((error) => {
                console.log("error", error)
                dispatch(fetchAddContractor([]))
                dispatch(showToast({ type: "error", message: "Something Went Wrong !" }))
            })
        :
        dispatch(showToast({ type: "error", message: "token expired ! please signin again" }))
})

// UPDATE_CONTRACTOR_PROFILE
export const asyncThunkUpdateContractorProfile = createAsyncThunk("post/asyncThunkUpdateContractorProfile", async (payload, { dispatch }) => {
    const { usertoken } = JSON.parse(localStorage.getItem('token'))
    const headers = {
        'Authorization': `Bearer ${usertoken}`,
        'Content-Type': 'multipart/form-data'
    };
    usertoken ?
        await axios.post(`${import.meta.env.VITE_BASE_URL + import.meta.env.VITE_UPDATE_CONTRACTOR_PROFILE}`, payload, { headers })
            .then(res => {
                if (res.status !== 201) return
                dispatch(fetchUpdateContractorProfile([{ ...res?.data, isContractorProfileUpdated: true }]))
                dispatch(showToast({ type: "success", message: "Contractor Updated Successfully" }))
            }).catch((error) => {
                console.error(error)
                dispatch(fetchUpdateContractorProfile([{ isContractorProfileUpdated: false }]))
                dispatch(showToast({ type: "error", message: error?.response?.data?.message ? error?.response?.data?.message : error?.message + ' Or Server Down !' }))
            })
        :
        dispatch(showToast({ type: "error", message: "token expired ! please signin again" }))
})

// REUPDATE_PROFILE
export const asyncThunkReUpdateContractorProfile = createAsyncThunk("post/asyncThunkReUpdateContractorProfile", async (payload, { dispatch }) => {
    const { usertoken } = JSON.parse(localStorage.getItem('token'))
    const headers = {
        'Authorization': `Bearer ${usertoken}`,
        'Content-Type': 'multipart/form-data'
    };
    usertoken ?
        await axios.patch(`${import.meta.env.VITE_BASE_URL + import.meta.env.VITE_REUPDATE_PROFILE}`, payload, { headers })
            .then(res => {
                if (res.status !== 200) return
                dispatch(fetchUpdateContractorProfile([{ ...res?.data, isContractorProfileUpdated: true }]))
                dispatch(showToast({ type: "success", message: "Contractor ReUpdated Successfully" }))
            }).catch((error) => {
                console.error(error)
                dispatch(fetchUpdateContractorProfile([{ isContractorProfileUpdated: false }]))
                dispatch(showToast({ type: "error", message: error?.response?.data?.message ? error?.response?.data?.message : error?.message + ' Or Server Down !' }))
            })
        :
        dispatch(showToast({ type: "error", message: "token expired ! please signin again" }))
})

// GET_CONTRACTOR
export const asyncThunkGetContractor = createAsyncThunk("post/asyncThunkGetContractor", async (payload, { dispatch }) => {
    const { usertoken } = JSON.parse(localStorage.getItem('token'))
    const headers = { 'Authorization': `Bearer ${usertoken}` };
    usertoken ?
        await axios(`${import.meta.env.VITE_BASE_URL + import.meta.env.VITE_GET_CONTRACTOR + '?page=' + payload}`, { headers })
            .then(res => {
                if (res.status !== 200) return
                dispatch(fetchAddContractor(res?.data))
                // dispatch(showToast({ type: "success", message: "Contractor Added Successfully" }))
            }).catch((error) => {
                console.error(error);
                dispatch(fetchAddContractor([]))
                dispatch(showToast({ type: "error", message: error.response.data.message + ' !' }))
            })
        :
        dispatch(showToast({ type: "error", message: "token expired ! please signin again" }))
})

// APPROVE_CONTRACTOR
export const asyncThunkApproveContractor = createAsyncThunk("get/asyncThunkApproveContractor", async (payload, { dispatch }) => {
    const { usertoken } = JSON.parse(localStorage.getItem('token'))
    const headers = { 'Authorization': `Bearer ${usertoken}` };
    usertoken ?
        await axios.patch(`${import.meta.env.VITE_BASE_URL + import.meta.env.VITE_APPROVE_CONTRACTOR}`, payload, { headers })
            .then(res => {
                if (res.status !== 201) return
                dispatch(fetchApprovedContractorById({ ...res?.data, isAproved: true }))
                dispatch(showToast({ type: "success", message: "Successfully approved contractor" }))
            }).catch((error) => {
                console.log("error", error)
                dispatch(fetchApprovedContractorById({ ...error, isAproved: false }))
                dispatch(showToast({ type: "error", message: "Something Went Wrong !" }))
            })
        :
        dispatch(showToast({ type: "error", message: "token expired ! please signin again" }))
})

// GET_DETAILS_OF_CONTRACTOR
export const asyncThunkGetDitailsOfContractor = createAsyncThunk("get/asyncThunkGetDitailsOfContractor", async (payload, { dispatch }) => {
    const { usertoken } = JSON.parse(localStorage.getItem('token'))
    const headers = { 'Authorization': `Bearer ${usertoken}` };
    usertoken ?
        await axios(`${import.meta.env.VITE_BASE_URL + import.meta.env.VITE_GET_DETAILS_OF_CONTRACTOR + '?contractorId=' + payload?.contractorId}`, { headers })
            .then(res => {
                if (res.status !== 200) return
                dispatch(fetchContractorById(res?.data?.data))
                // dispatch(showToast({ type: "success", message: "Contractor Added Successfully" }))
            }).catch((error) => {
                console.log("error", error)
                dispatch(fetchContractorById([]))
                dispatch(showToast({ type: "error", message: "Something Went Wrong !" }))
            })
        :
        dispatch(showToast({ type: "error", message: "token expired ! please signin again" }))
})

// GET_OWN_DETAILS
export const asyncThunkGetOwnDetails = createAsyncThunk("get/asyncThunkGetOwnDetails", async (payload, { dispatch }) => {
    const { usertoken } = JSON.parse(localStorage.getItem('token'))
    const headers = { 'Authorization': `Bearer ${usertoken}` };
    usertoken ?
        await axios(`${import.meta.env.VITE_BASE_URL + import.meta.env.VITE_GET_OWN_DETAILS}`, { headers })
            .then(res => {
                if (res.status !== 200) return
                dispatch(fetchContractorItSelfDetailsData([{ ...res?.data?.data }]))
                // dispatch(showToast({ type: "success", message: "Contractor Added Successfully" }))
            }).catch((error) => {
                console.log("error", error)
                dispatch(fetchContractorItSelfDetailsData([]))
                dispatch(showToast({ type: "error", message: "Something Went Wrong !" }))
            })
        :
        dispatch(showToast({ type: "error", message: "token expired ! please signin again" }))
})

// CALENDAR
// CREATE_TASK
export const asyncThunkCreateTask = createAsyncThunk("post/asyncThunkCreateTask", async (payload, { dispatch }) => {
    const { usertoken } = JSON.parse(localStorage.getItem('token'))
    const headers = { 'Authorization': `Bearer ${usertoken}` };
    usertoken ?
        await axios.post(`${import.meta.env.VITE_BASE_URL + import.meta.env.VITE_CREATE_TASK}`, payload, { headers })
            .then(res => {
                if (res.status !== 201) return
                dispatch(fetchAddContractorTaskInCalender([{ ...res?.data?.data }]))
                dispatch(showToast({ type: "success", message: res?.data?.message }))

                let [, month, year] = new Date().toLocaleDateString('pt-PT').split('/');
                let formattedDate = `${month == 0 ? 12 : month <= 9 ? `${month}` : month}/${year}`;

                dispatch(asyncThunkGetTask(formattedDate))
            }).catch((error) => {
                console.log("error", error)
                // dispatch(fetchAddContractorTaskInCalender([]))
                dispatch(showToast({ type: "error", message: error?.response?.data?.message }))
            })
        :
        dispatch(showToast({ type: "error", message: "token expired ! please signin again" }))
})

// GET_TASK
export const asyncThunkGetTask = createAsyncThunk("get/asyncThunkGetTask", async (payload, { dispatch }) => {
    const { usertoken } = JSON.parse(localStorage.getItem('token'))
    const headers = { 'Authorization': `Bearer ${usertoken}` };
    usertoken ?
        await axios.get(`${import.meta.env.VITE_BASE_URL + import.meta.env.VITE_GET_TASK + `?date=${payload}`}`, { headers })
            .then(res => {
                if (res.status !== 200) return
                dispatch(fetchGetContractorTaskInCalender(res?.data?.data))
                dispatch(showToast({ type: "success", message: 'Events Found !' }))
            }).catch((error) => {
                console.error("error", error)
                dispatch(fetchGetContractorTaskInCalender([]))
                dispatch(showToast({ type: "error", message: 'No Task Found For This Month' }))
            })
        :
        dispatch(showToast({ type: "error", message: "token expired ! please signin again" }))
})

// CONTRACTOR_FORGOT_PASSWORD
export const asyncThunkContractorForgotPassword = createAsyncThunk("get/asyncThunkContractorForgotPassword", async (payload, { dispatch }) => {
    await axios.post(`${import.meta.env.VITE_BASE_URL + import.meta.env.VITE_CONTRACTOR_FORGOT_PASSWORD}`, payload)
    .then(res => {
        console.log(res)
        if (res.status !== 200) return
        dispatch(fetchForgotPassword([{ ...res?.data, isEmailSend: true }]))
        dispatch(showToast({ type: "success", message: res?.data?.message }))
    }).catch((error) => {
        console.error(error)
        dispatch(fetchForgotPassword([{ isEmailSend: false }]))
        dispatch(showToast({ type: "error", message: error?.response?.data?.message }))
    })
})

// CONTRACTOR_RESET_PASSWORD
export const asyncThunkContractorResetPassword = createAsyncThunk("get/asyncThunkContractorResetPassword", async (payload, { dispatch }) => {
    await axios.post(`${import.meta.env.VITE_BASE_URL + import.meta.env.VITE_CONTRACTOR_RESET_PASSWORD + `/${payload?.Token}`}`, payload?.inputValue)
    .then(res => {
        console.log("res", res)
        if (res.status !== 200) return
        dispatch(fetchResetPassword([{ ...res.data, isPasswordChanged: true }]))
        dispatch(showToast({ type: "success", message: res.data.message }))
    }).catch((error) => {
        console.error(error)
        dispatch(fetchResetPassword([{ isPasswordChanged: false }]))
        dispatch(showToast({ type: "error", message: error?.response?.data?.msg }))
    })
})