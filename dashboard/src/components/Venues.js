import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function Venues() {

    const [venues, setVenues] = useState([]);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        fetch("http://localhost:3000/api/events/venues")
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw "Error getting events";
            }
          })
          .then((data) => {
            setVenues(data);
          })
          .catch((error) => {
            setIsError(true);
          });
      }, []);



  return (
    <main className="main-container">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {venues.map((venue, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 15 } }}
              >
                <TableCell component="th" scope="row">
                  {venue.id}
                </TableCell>
                <TableCell align="left">{venue.name}</TableCell>        
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </main>
  )
}

export default Venues