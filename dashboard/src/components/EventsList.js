import React, {useEffect, useState} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



function Home() {
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];  

      const [events, setEvents] = useState([]);
      const [categories, setCategories] = useState([]);
      const [users, setUsers] = useState([]);
      const [venues, setVenues] = useState([]);
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
            setEvents(data);
          })
          .catch((error) => {
            setIsError(true);
          });
      }, []);

      function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
          return -1;
        }
        if (b[orderBy] > a[orderBy]) {
          return 1;
        }
        return 0;
      }
      
      function getComparator(order, orderBy) {
        return order === 'desc'
          ? (a, b) => descendingComparator(a, b, orderBy)
          : (a, b) => -descendingComparator(a, b, orderBy);
      }

      function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
          const order = comparator(a[0], b[0]);
          if (order !== 0) {
            return order;
          }
          return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
      }

      function EnhancedTableHead(props) {
        const {
          onSelectAllClick,
          order,
          orderBy,
          numSelected,
          rowCount,
          onRequestSort,
        } = props;
        const createSortHandler = (property) => (event) => {
          onRequestSort(event, property);
        };
      }
      function EnhancedTableHead(props) {
        const {
          onSelectAllClick,
          order,
          orderBy,
          numSelected,
          rowCount,
          onRequestSort,
        } = props;
        const createSortHandler = (property) => (event) => {
          onRequestSort(event, property);
        };
      }


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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </main>
  );
}

export default Home