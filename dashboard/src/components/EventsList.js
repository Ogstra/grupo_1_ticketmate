import React, {useEffect, useState} from 'react'

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

  return (
    <main className="main-container">
      {events.map((event) => {
        return (
          <>
            <p>ID: {event.id}</p>
            <p>Name: {event.name}</p>
            <p>Price: {event.price}</p>
            <p>Image: {event.image}</p>
            <p>Category: {event.category.name}</p>
            <p>Venue: {event.venue}</p>
            <p>Date: {event.date}</p>
            <p>Time: {event.time}</p>
            <p>Stock: {event.stock}</p>
            <br></br>
          </>
        );
      })}
    </main>
  );
}

export default Home