import React, { useEffect, useState } from 'react';
import { Root, Table, Container, ContainerPartition, Header } from '../styles';
import axios from 'axios';

// Define an interface for the booking object
interface Booking {
  id: string;
  bookingDate: string;
  bookedBy: string;
  contactNumber: string;
  contactEmail: string;
  destination: string;
  lunchArrangements: string;
  wheelchairUsers: number;
  Smoking: string;
}

const AllBookings = () => {
  const [data, setData] = useState<Booking[]>([]); // Initialize data as an empty array

  useEffect(() => {
    axios.get('http://localhost:8000/bookings')
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
      <Table>
        <thead style={{background: 'gray'}}>
          <tr>
            <th>Booking Date</th>
            <th>Booked By</th>
            <th>Contact Number</th>
            <th>Contact Email</th>
            <th>Destination</th>
            <th>Lunch Arrangements</th>
            <th>Wheelchair Users</th>
            <th>Smoking</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.bookingDate}</td>
              <td>{item.bookedBy}</td>
              <td>{item.contactNumber}</td>
              <td>{item.contactEmail}</td>
              <td>{item.destination}</td>
              <td>{item.lunchArrangements}</td>
              <td>{item.wheelchairUsers}</td>
              <td>{item.Smoking}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Root>
  );
}

export default AllBookings;

