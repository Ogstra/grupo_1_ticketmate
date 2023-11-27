import React, {useEffect, useState} from 'react'
import { BsFillBellFill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill } from 'react-icons/bs'
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function Home() {

    const data = [
        {
          name: 'Page A',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Page B',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Page C',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Page D',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Page E',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Page F',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Page G',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
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

      useEffect(() => {
        fetch("http://localhost:3000/api/events/categories")
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw "Error getting categories";
            }
          })
          .then((data) => {
            setCategories(data);
          })
          .catch((error) => {
            setIsError(true);
          });
      }, []);

      useEffect(() => {    
        fetch("http://localhost:3000/api/users")
          .then((response) => {
            if (response.ok) {                       
              return response.json();
            } else {              
              throw "Error getting users";
            }
          })
          .then((data) => {
            setUsers(data);
          })
          .catch((error) => {
            setIsError(true);
          });
      }, []);

      useEffect(() => {
        fetch("http://localhost:3000/api/events/venues")
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw "Error getting venues";
            }
          })
          .then((data) => {
            setVenues(data);
          })
          .catch((error) => {
            setIsError(true);
          });
      }, []);
      
        const [lastEvent, setLastEvent] = useState([]);
  
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
          const sortedEvents = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          // Toma el primer evento (el más reciente)
          const latestEvent = sortedEvents[0];
          setLastEvent([latestEvent]); // Actualiza el estado con el evento más reciente
            })
            .catch((error) => {
              setIsError(true);
            });
        }, []);     
  
      
  return (
    <main className='main-container'>
        <div className='main-title'>
            <h3>DASHBOARD</h3>
        </div>

        <div className='main-cards'>
            <div className='card'>
                <div className='card-inner'>
                <a href='/events'>EVENTS</a>
                    {/*<h3>EVENTS</h3>*/}
                    <BsFillArchiveFill className='card_icon'/>
                </div>
                <h1>{events.length}</h1>
            </div>

            <div className='card'>
                <div className='card-inner'>
                <a href='/categories'>CATEGORIES</a>
                    {/*<h3>CATEGORIES</h3>*/}
                    <BsFillGrid3X3GapFill className='card_icon'/>
                </div>
                <h1>{categories.length}</h1>
            </div>

            <div className='card'>
                <div className='card-inner'>
                <a href='/users'>USERS</a>
                    {/*<h3>USERS</h3>*/}
                    <BsPeopleFill className='card_icon'/>
                </div>
                <h1>{users.length}</h1>
            </div>

            <div className='card'>
                <div className='card-inner'>
                <a href='/venues'>VENUES</a>
                    {/*<h3>VENUES</h3>*/}
                    <BsFillBellFill className='card_icon'/>
                </div>
                <h1>{venues.length}</h1>
            </div>
        </div>

        <div className='main-title'>
            <h3>LAST EVENT LOADED</h3>
        </div>

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
            {lastEvent.map((event, index) => (
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
                {/*<TableCell align="left">{event.image}</TableCell>*/}
                {/*<TableCell align="left">
                  <img src={event.image} alt={`Event ${event.id}`} /> </TableCell>{/* Mostrar la imagen */}
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>



      {/*<div className="image-container">
        {events.map((event, index) => (
          <img
            key={index}
            src={event.image}
            alt={`Evento ${event.id}`}
            className="event-image"
          />
        ))}
        </div>*/}


        <div className='charts'> 
        <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
        </BarChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>

        </div>

    </main>
  )
}

export default Home