import * as Yup from 'yup';

export  const contract = Yup.object(
    {
        actualName : Yup.string().min(2).max(25).required("Required Field*"),
        actualAadharNo : Yup.number().required("Required Field*"),
        actualPanNo : Yup.string().min(2).max(25).required("Required Field*"),      
beneficiaryName : Yup.string().min(2).max(25).required("Required Field*"),
beneficiaryAadharNo : Yup.number().required("Required Field*"),
beneficiaryPanNo: Yup.string().min(2).max(25).required("Required Field*"),
bankName : Yup.string().min(2).max(25).required("Required Field*"),
bankAccNo : Yup.number().required("Required Field*"),
ifscCode : Yup.string().min(2).max(25).required("Required Field*"),
contractName : Yup.string().min(2).max(25).required("Required Field*"),
joinDate : Yup.string().min(2).max(25).required("Required Field*"),
birthday : Yup.string().min(2).max(25).required("Required Field*"),
address : Yup.string().min(2).max(25).required("Required Field*"),

reportTo: Yup.string().min(2).max(25).required("Required Field*"),
nationality : Yup.string().min(2).max(25).required("Required Field*"),
// religion : Yup.string().min(2).max(25).required("Required Field*"),
emergencyContactName : Yup.string().min(2).max(25).required("Required Field*"),
emergencyContactRelation: Yup.string().min(2).max(25).required("Required Field*"),
emergencyContactNumber: Yup.string().min(2).max(25).required("Required Field*"),

// ActualPan: Yup.required("Required Field*"),
// ActualAadhar: Yup.required("Required Field*"),
// ActualBeneficiaryPan: Yup.required("Required Field*"),
// ActualBeneficiaryAadhar: Yup.required("Required Field*"),
    }
)