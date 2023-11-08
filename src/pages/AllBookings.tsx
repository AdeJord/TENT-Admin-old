import React, { useEffect, useState } from "react";
import {
  Root,
  Table,
  CalendarContainer,
  Button,
  ButtonContainer,
  TableContainer
} from "../styles";
import axios from "axios";

// Define an interface for the booking object
interface Booking {
  id: string;
  bookingDate: string;
  bookingMonth: string;
  bookedBy: string;
  contactNumber: string;
  contactEmail: string;
  destination: string;
  lunchArrangements: string;
  wheelchairUsers: number;
  smoking: string;
}

const AllBookings = () => {
  const [data, setData] = useState<Booking[]>([]); // Initialize data as an empty array
  // const [targetMonth, setTargetMonth] = useState<string>(
  //   new Date().toLocaleString("en-UK", { month: "long" })
  // );
  const targetMonth = 'November'

  // Function to filter bookings by month
  const getBookingsForMonth = (month: string) => {
    return data.filter((booking) => booking.bookingMonth === month);
  };

  useEffect(() => {
    // Fetch all bookings from the API
    axios
      .get("http://192.168.0.139:8000/bookings")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handlePrevMonth = () => {
    // Implement logic to switch to the previous month here
    // You may need to update the 'targetMonth' state and re-fetch data for the new month.
  };

  const handleNextMonth = () => {
    // Implement logic to switch to the next month here
    // You may need to update the 'targetMonth' state and re-fetch data for the new month.
  };


  return (
    <Root>
      <h1>{targetMonth} 2023 Bookings</h1>
      <CalendarContainer>
        <ButtonContainer>
          <Button onClick={handlePrevMonth}>Prev Month</Button>
        </ButtonContainer>
<TableContainer>
        <Table>
          <thead style={{ background: "gray" }}>
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
            {getBookingsForMonth(targetMonth).map((item, index) => (
              <tr key={index}>
                <td>{item.bookingDate}</td>
                <td>{item.bookedBy}</td>
                <td>{item.contactNumber}</td>
                <td>{item.contactEmail}</td>
                <td>{item.destination}</td>
                <td>{item.lunchArrangements}</td>
                <td>{item.wheelchairUsers}</td>
                <td>{item.smoking}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        </TableContainer>
        <ButtonContainer>
          <Button onClick={handleNextMonth}>Next Month</Button>
        </ButtonContainer>
      </CalendarContainer>
    </Root>
  );
};

export default AllBookings;
