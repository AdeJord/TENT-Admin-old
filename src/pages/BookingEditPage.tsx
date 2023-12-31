import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import Modal from '../components/modal/Modal';
import DangerModal from '../components/modal/DangerModal';
import Backdrop from '../components/modal/ModalBackdrop';
import { Root, FormRoot, FormContainer, Button, ButtonContainer } from '../styles';

const BASE_URL = 'http://192.168.0.139:8000'; // Replace with your API base URL

// Define the fetchBookingData function
const fetchBookingData = async (bookingId: any) => {
    try {
        const response = await axios.get(`${BASE_URL}/bookings/${bookingId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function to update booking data by bookingId
export const updateBookingData = async (bookingId: any, formData: any) => {
    try {
        const response = await axios.patch(`${BASE_URL}/updateBooking/${bookingId}`, formData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const BookingEditPage = () => {
    const { bookingId } = useParams();
    const navigate = useNavigate();
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showDangerModal, setShowDangerModal] = useState(false);

    const [formData, setFormData] = useState({
        first_name: '',
        surname: '',
        contact_number: '',
        email_address: '',
        house_number: '',
        street_name: '',
        city: '',
        postcode: '',
        booking_date: '',
        wheelchair_users: '',
        smoking: '',
        destination: '',
        lunch_arrangements: '',
        notes: '',
        terms_and_conditions: '',
        group_leader_policy: '',
        bookingMonth: '',

        // Add other fields here
    });

    // Fetch booking data based on bookingId (useEffect to fetch data when the component mounts)
    useEffect(() => {
        if (!bookingId) {
            console.error('No bookingId provided');
            return;
        }

        fetchBookingData(bookingId)
            .then((fetchedData) => {
                setFormData(fetchedData);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [bookingId]);

    // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission (you can customize this part based on your API)
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        updateBookingData(bookingId, formData)
            .then(() => {
                setShowSuccessModal(true); // Show the success modal on successful update
            })
            .catch((error) => {
                console.error(error);
                setShowDangerModal(true); // Show the danger modal on error
            });
    };

    const handleDangerModalOpen = () => {
        setShowSuccessModal(false); // Ensure success modal is closed
        setShowDangerModal(true);
    };

    const handleSuccessModalClick = () => {
        setShowSuccessModal(false); // Close the modal
        navigate(`/`); // Navigate to the desired page
    };

    const handleDangerModalClick = () => {
        setShowDangerModal(false); // Close the modal
        alert('Booking has been deleted');
    }

    return (
        <Root>
            <FormRoot>
                {showSuccessModal && (
                    <Backdrop>
                        <Modal
                            header="Update Submitted"
                            content="Booking has been updated"
                            footer="Thank you for booking with us"
                            // Assuming your Modal component can accept an onClick prop
                            onClick={handleSuccessModalClick}
                        />
                    </Backdrop>
                )}
                {showDangerModal && (
                    <Backdrop>
                        <DangerModal
                            header="WARNING"
                            content="You are about to delete this booking. Are you sure?"
                            footer="Click 'DELETE' to delete this booking or 'CANCEL' to return to the booking page"
                            // Assuming your Modal component can accept an onClick prop
                            onClick={handleDangerModalClick}
                        />
                    </Backdrop>
                )}

                <h1>Edit Booking</h1>
                <FormContainer>
                    <form
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            paddingTop: "2vh",
                            height: "auto",
                            width: "30vw",
                        }}
                        onSubmit={handleSubmit}>

                        <label>First Name:</label>
                        <input
                            style={{ width: "20vw" }}
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleInputChange}
                        />
                        <label>Surname:</label>
                        <input
                            style={{ width: "20vw" }}
                            type="text"
                            name="surname"
                            value={formData.surname}
                            onChange={handleInputChange}
                        />
                        <label>Contact Number:</label>
                        <input
                            style={{ width: "20vw" }}
                            type="text"
                            name="contact_number"
                            value={formData.contact_number}
                            onChange={handleInputChange}
                        />
                        <label>Email Address:</label>
                        <input
                            style={{ width: "20vw" }}
                            type="text"
                            name="email_address"
                            value={formData.email_address}
                            onChange={handleInputChange}
                        />
                        <label>House Number:</label>
                        <input
                            style={{ width: "20vw" }}
                            type="text"
                            name="house_number"
                            value={formData.house_number}
                            onChange={handleInputChange}
                        />
                        <label>Street Name:</label>
                        <input
                            style={{ width: "20vw" }}
                            type="text"
                            name="street_name"
                            value={formData.street_name}
                            onChange={handleInputChange}
                        />
                        <label>City:</label>
                        <input
                            style={{ width: "20vw" }}
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                        />
                        <label>Postcode:</label>
                        <input
                            style={{ width: "20vw" }}
                            type="text"
                            name="postcode"
                            value={formData.postcode}
                            onChange={handleInputChange}
                        />
                        <label>Booking Date:</label>
                        <input
                            style={{ width: "20vw" }}
                            type="text"
                            name="booking_date"
                            value={new Date(formData.booking_date).toLocaleDateString('en-GB')}
                            onChange={handleInputChange}
                        />
                        <label>Wheelchair Users:</label>
                        <input
                            style={{ width: "20vw" }}
                            type="text"
                            name="wheelchair_users"
                            value={formData.wheelchair_users}
                            onChange={handleInputChange}
                        />
                        <label>Smoking:</label>
                        <input
                            style={{ width: "20vw" }}
                            type="text"
                            name="smoking"
                            value={formData.smoking ? "Yes" : "No"}
                            onChange={handleInputChange}
                        />
                        <label>Destination:</label>
                        <input
                            style={{ width: "20vw" }}
                            type="text"
                            name="destination"
                            value={formData.destination}
                            onChange={handleInputChange}
                        />
                        <label>Lunch Arrangements:</label>
                        <input
                            style={{ width: "10vw" }}
                            type="text"
                            name="lunch_arrangements"
                            value={formData.lunch_arrangements}
                            onChange={handleInputChange}
                        />
                        <label>Notes:</label>
                        <input
                            style={{ width: "20vw" }}
                            type="text"
                            name="notes"
                            value={formData.notes}
                            onChange={handleInputChange}
                        />
                        <label>Terms and Conditions:</label>
                        <input
                            style={{ width: "10vw" }}
                            type="text"
                            name="terms_and_conditions"
                            value={formData.terms_and_conditions ? "Agreed" : "Not Agreed"}
                            onChange={handleInputChange}
                        />
                        <label>Group Leader Policy:</label>
                        <input
                            style={{ width: "10vw" }}
                            type="text"
                            name="group_leader_policy"
                            value={formData.group_leader_policy ? "Agreed" : "Not Agreed"}
                            onChange={handleInputChange}
                        />
                        <br />
                        <br />
                        <div
                            style={{
                                backgroundColor: '#eaf3e7',
                                color: 'white',
                                width: '28vw',
                                height: '5vh',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '0.5rem',
                            }}>
                            <div
                                style={{
                                    backgroundColor: 'green',
                                    color: 'white',
                                    width: '10vw',
                                    height: '5vh',
                                    borderRadius: '5px',
                                    border: '1px solid black',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    padding: '0.5rem',
                                }}>

                                <Button
                                    style={{
                                        backgroundColor: 'green',
                                        color: 'white',
                                        border: 'none'
                                    }}
                                    type="submit">SAVE CHANGES</Button>
                            </div>
                            <br />
                            <div
                                style={{
                                    backgroundColor: 'red',
                                    color: 'white',
                                    width: '10vw',
                                    height: '5vh',
                                    borderRadius: '5px',
                                    border: '1px solid black',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    padding: '0.5rem',
                                }}>
                                <Button
                                    onClick={() => handleDangerModalOpen()}
                                    style={{
                                        backgroundColor: 'red',
                                        color: 'white',
                                        border: 'none'
                                    }}
                                    type='button'
                                    >DELETE </Button>
                            </div>
                        </div>
                        <br />
                    </form>
                </FormContainer>
            </FormRoot>
        </Root>
    );
};

export default BookingEditPage;
