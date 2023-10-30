import React, { useEffect, useState } from 'react';
import { Root, Container, ContainerPartition, Header } from '../styles';
import axios from 'axios'; // Import Axios

const AllBookings = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <Root>
      <h1>All Bookings</h1>
      {data && <p>{data}</p>}
    </Root>
  )
}

export default AllBookings;
