import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  SignUpData: [],
  LoginData: [],
  ContractorData: [],
  ContractorDataById: [],
  ApprovedContractorDataById: [],
  UpdateContractorProfileData: [],
  ContractorItSelfDetailsData: [],
}

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    fetchSignUp: (state, action) => {
      state.SignUpData = action.payload
    },
    fetchLogin: (state, action) => {
      state.LoginData = action.payload
      localStorage.setItem('token', JSON.stringify(action.payload))
    },
    fetchAddContractor: (state, action) => {
      state.ContractorData = action.payload
    },
    fetchContractorById: (state, action) => {
      state.ContractorDataById = action.payload
    },
    fetchApprovedContractorById: (state, action) => {
      state.ApprovedContractorDataById = action.payload
    },
    fetchUpdateContractorProfile: (state, action) => {
      state.UpdateContractorProfileData = action.payload
    },
    fetchContractorItSelfDetailsData: (state, action) => {
      state.ContractorItSelfDetailsData = action.payload
    },
  },
})

export const { fetchSignUp, fetchLogin, fetchAddContractor, fetchContractorById, fetchApprovedContractorById, fetchUpdateContractorProfile, fetchContractorItSelfDetailsData } = adminSlice.actions

export default adminSlice.reducer