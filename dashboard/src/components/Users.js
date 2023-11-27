import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function Users() {

    const [users, setUsers] = useState([]);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        fetch("http://localhost:3000/api/users")
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw "Error getting events";
            }
          })
          .then((data) => {
            setUsers(data);
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
              <TableCell align="left">Image</TableCell>  
              <TableCell>ID</TableCell>
              <TableCell align="left">First Name</TableCell>
              <TableCell align="left">Last Name</TableCell>
              <TableCell align="left">Username</TableCell>
              <TableCell align="left">Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 15 } }}
              >
                <TableCell component="th" scope="row">
                  <img src={`http://localhost:3000/img/profile-pictures/` + user.image} className="user-profile-picture"></img>
                </TableCell>
                <TableCell align="left">{user.uuid}</TableCell>      
                <TableCell align="left">{user.first_name}</TableCell>
                <TableCell align="left">{user.last_name}</TableCell>
                <TableCell align="left">{user.username}</TableCell>
                <TableCell align="left">{user.email}</TableCell>        
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </main>
  )
}

export default Users