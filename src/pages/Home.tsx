import { Root, Container, ContainerPartition, Header } from '../styles';
import AllBookings from './AllBookings'
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <Root>
            <Container>
                <ContainerPartition>
                    <Link style={{ textDecoration: 'none' }} to="./AllBookings">View All Bookings</Link>
                </ContainerPartition>
                <ContainerPartition>
                    <Link style={{ textDecoration: 'none' }} to="./AllVolunteers">View All Volunteers</Link>
                </ContainerPartition>
            </Container>
            <Container>
                <ContainerPartition>
                    <Link style={{ textDecoration: 'none' }} to="/CreateBooking">Create Booking</Link>
                </ContainerPartition>
                <ContainerPartition>
                    <Link style={{ textDecoration: 'none' }} to='/EditVolunteers'>Add/Edit Volunteers</Link>
                </ContainerPartition>
            </Container>
        </Root>
    );
}

export default Home