import React, { useState } from 'react';
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';

const Table = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const columns = [
    { headerName: "First Name", field: "first_name", width: 150 },
    { headerName: "Last Name", field: "last_name", width: 150 },
    { headerName: "Gender", field: "sex", width: 100 },
    { headerName: "Date of Birth", field: "dob", width: 200 },
    { headerName: "Father Name", field: "father_name", width: 200 },
    { headerName: "Address", field: "address", width: 300 },
    { headerName: "Aadhar", field: "aadhar", width: 300 },
    { headerName: "Credit Card Number", field: "credit_card_number", width: 300 },
    { headerName: "Credit Card Provider", field: "credit_card_provider", width: 300 },
    { headerName: "Debit Card Number", field: "debit_card_number", width: 300 },
    { headerName: "Debit Card Provider", field: "debit_card_provider", width: 300 },
    { headerName: "Driving Licence Number", field: "driving_licence_number", width: 300 },
    { headerName: "Driving Licence Date of Issue", field: "driving_licence_date_of_issue", width: 300 },
    { headerName: "Driving Licence Date of Expiry", field: "driving_licence_date_of_expiry", width: 300 },
    { headerName: "PAN Number", field: "pan_number", width: 300 },
    { headerName: "PAN Status", field: "pan_status", width: 300 },
    { headerName: "Passport Number", field: "passport_number", width: 300 },
    { headerName: "Passport Date of Issue", field: "passport_date_of_issue", width: 300 },
    { headerName: "Passport Date of Expiry", field: "passport_date_of_expiry", width: 300 },
    { headerName: "Nationality", field: "nationality", width: 300 },
    { headerName: "Passport Type", field: "passport_type", width: 300 }
  ];

  const filteredData = data.filter(item =>
    columns.some(col => 
      String(item[col.field]).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div style={{ width: '100%', padding: '20px', boxSizing: 'border-box', marginRight: '10px' }}>
     <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        className='search-input'
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <TableContainer component={Paper} mt={5}>
        <MuiTable>
          <TableHead>
            <TableRow>
              {columns.map(col => (
                <TableCell key={col.field} style={{ width: col.width }}>
                  {col.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((item, index) => (
              <TableRow key={index}>
                {columns.map(col => (
                  <TableCell key={col.field}>
                    {item[col.field]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
    </div>
  );
};

export default Table;
