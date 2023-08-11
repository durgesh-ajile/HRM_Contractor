import "./Cards.css";
// import { HiOutlinePencilSquare } from "react-icons/hi2";


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from "@mui/material";


// eslint-disable-next-line react/prop-types
const Cards = ({ ContractorItSelfDetails }) => {

  // eslint-disable-next-line react/prop-types
  const { _id, first_name, last_name, email, password, profileId } = ContractorItSelfDetails
  // eslint-disable-next-line react/prop-types
  const { ActualAadharNo, ActualName, ActualPanNo, Address, BankAccNo, BankName, BeneficiaryAadharNo, BeneficiaryName, BeneficiaryPanNo, Birthday, ContractName, EmergencyContactName, EmergencyContactNumber, EmergencyContactRelation, Gender, IFSCcode, IsApproved, IsDecline, JoinDate, Nationality, Religion, ReportTo } = profileId

  function createData(name, calories) { return { name, calories }; }
  const PersonalInfo = [
    createData('Personal Information', null),
    createData('Birthday', Birthday),
    createData('ActualAadharNo', ActualAadharNo),
    createData('ActualName', ActualName),
    createData('ActualPanNo', ActualPanNo),
    createData('Address', Address),
    createData('ContractName', ContractName),
    createData('EmergencyContactName', EmergencyContactName),
    createData('EmergencyContactRelation', EmergencyContactRelation),
    createData('Gender', Gender),
    createData('JoinDate', JoinDate),
    createData('Nationality', Nationality),
    createData('Religion', Religion),
    createData('ReportTo', ReportTo),
    createData('EmergencyContactNumber', EmergencyContactNumber)
  ];

  const Beneficiary = [
    createData('Beneficiary Information', null),
    createData('BeneficiaryName', ActualAadharNo),
    createData('BeneficiaryAadharNo', BeneficiaryAadharNo),
    createData('BeneficiaryPanNo', BeneficiaryPanNo)
  ];

  const Bank = [
    createData('Bank Information', null),
    createData('BankName', BankName),
    createData('IFSCcode', IFSCcode),
    createData('BankAccNo', BankAccNo),
  ];

  return (
    <>
      <Box sx={{ display: 'flex', marginTop: '30px', justifyContent: 'center', flexDirection: { xs: 'column', lg: 'row' } }}>
        <Box>
          <TableContainer component={Paper} sx={{ width: '400px', border: '1px solid gray', borderRadius: '10px', marginRight: '20px' }} >
            <Table aria-label="simple table">
              <TableBody>
                {PersonalInfo.map((row) => (<TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row" sx={{ fontSize: '15px', fontWeight: '700', paddingLeft: '9%' }}>
                    {row.name}
                  </TableCell>
                  <TableCell align="right" sx={{ fontSize: '15px', fontWeight: '700', paddingRight: '9%' }}>{row.calories}</TableCell>
                </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box>
          <TableContainer component={Paper} sx={{ width: '400px', border: '1px solid gray', borderRadius: '10px', marginTop: {xs:'30px',lg:'0px'}, marginRight: '20px' }} >
            <Table aria-label="simple table">
              <TableBody>
                {Beneficiary.map((row) => (<TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row" sx={{ fontSize: '15px', fontWeight: '700', paddingLeft: '9%' }}>
                    {row.name}
                  </TableCell>
                  <TableCell align="right" sx={{ fontSize: '15px', fontWeight: '700', paddingRight: '9%' }}>{row.calories}</TableCell>
                </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box>
          <TableContainer component={Paper} sx={{ width: '400px', border: '1px solid gray', borderRadius: '10px', marginTop: {xs:'30px',lg:'0px'} }} >
            <Table aria-label="simple table">
              <TableBody>
                {Bank.map((row) => (<TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row" sx={{ fontSize: '15px', fontWeight: '700', paddingLeft: '9%' }}>
                    {row.name}
                  </TableCell>
                  <TableCell align="right" sx={{ fontSize: '15px', fontWeight: '700', paddingRight: '9%' }}>{row.calories}</TableCell>
                </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
};

export default Cards;
