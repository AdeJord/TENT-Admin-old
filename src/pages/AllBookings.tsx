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

  //initialise the year as current year
  const [year, setYear] = useState<number>(new Date().getFullYear());

  //set the current month
  const [currentMonth, setCurrentMonth] = useState<string>(
    new Date().toLocaleString("en-UK", { month: "long" })
  );
  //set the target month (this is the one that will be displayed)
  const [targetMonth, setTargetMonth] = useState<string>(currentMonth); // Initialize targetMonth as the current month

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
  }, [targetMonth]);

  const handlePrevMonth = () => {
    let newTargetMonth;
    let newYear = year;
  
    // Implement logic to switch to the previous month and update the year if needed
    switch (targetMonth) {
      case "January":
        newTargetMonth = "December";
        newYear -= 1; // Decrement the year when transitioning from January to December
        break;
      case "February":
        newTargetMonth = "January";
        break;
      case "March":
        newTargetMonth = "February";
        break;
      case "April":
        newTargetMonth = "March";
        break;
      case "May":
        newTargetMonth = "April";
        break;
      case "June":
        newTargetMonth = "May";
        break;
      case "July":
        newTargetMonth = "June";
        break;
      case "August":
        newTargetMonth = "July";
        break;
      case "September":
        newTargetMonth = "August";
        break;
      case "October":
        newTargetMonth = "September";
        break;
      case "November":
        newTargetMonth = "October";
        break;
      case "December":
        newTargetMonth = "November";
        break;
      default:
        newTargetMonth = "Invalid Date";
    }
  
    // Update the state with the new month and year
    setTargetMonth(newTargetMonth);
    setYear(newYear);
  };
    

  const handleNextMonth = () => {
    let newTargetMonth;
    let newYear = year;
  
    // Implement logic to switch to the next month and update the year if needed
    switch (targetMonth) {
      case "January":
        newTargetMonth = "February";
        break;
      case "February":
        newTargetMonth = "March";
        break;
      case "March":
        newTargetMonth = "April";
        break;
      case "April":
        newTargetMonth = "May";
        break;
      case "May":
        newTargetMonth = "June";
        break;
      case "June":
        newTargetMonth = "July";
        break;
      case "July":
        newTargetMonth = "August";
        break;
      case "August":
        newTargetMonth = "September";
        break;
      case "September":
        newTargetMonth = "October";
        break;
      case "October":
        newTargetMonth = "November";
        break;
      case "November":
        newTargetMonth = "December";
        break;
      case "December":
        newTargetMonth = "January";
        newYear += 1; // Increment the year when transitioning from December to January
        break;
      default:
        newTargetMonth = "Invalid Date";
    }
  
    // Update the state with the new month and year
    setTargetMonth(newTargetMonth);
    setYear(newYear);
  };
  
  

  return (
    <Root>
      <h1>{targetMonth} {year} Bookings</h1>
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
