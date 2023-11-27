import React, {useEffect, useState} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function NearestEvent() { 

      const [events, setEvents] = useState([]);
      const [isError, setIsError] = useState(false);

      useEffect(() => {
        fetch("http://localhost:3000/api/events")
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw "Error getting events";
            }
          })
          .then((data) => {
            
  // Ordena los eventos por fecha de forma descendente
  const sortedEvents = data.sort((a, b) => new Date(a.date) - new Date(b.date));
  // Toma los primeros cinco eventos (los más recientes)
  const latestFiveEvents = sortedEvents.slice(0, 5);
  setEvents(latestFiveEvents); // Actualiza el estado con los eventos más recientes
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
              <TableCell align="left">Price</TableCell>
              <TableCell align="left">Category</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Time</TableCell>
              <TableCell align="left">Stock</TableCell>
              <TableCell align="left">Description</TableCell>
              {/*<TableCell align="left">Image</TableCell>*/}
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 15 } }}
              >
                <TableCell component="th" scope="row">
                  {event.id}
                </TableCell>
                <TableCell align="left">{event.name}</TableCell>
                <TableCell align="left">{event.price}</TableCell>
                <TableCell align="left">{event.category.name}</TableCell>
                <TableCell align="left">{event.date}</TableCell>
                <TableCell align="left">{event.time}</TableCell>
                <TableCell align="left">{event.stock}</TableCell>
                <TableCell align="left">{event.description}</TableCell>
                  {/*<TableCell align="left">
                  <img src={event.image} alt={`Event ${event.id}`} /> 
                  </TableCell>*/}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </main>
  );
}

export default NearestEvent