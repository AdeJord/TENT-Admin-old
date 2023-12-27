import React from "react";
import { useNavigate } from 'react-router-dom';
import { ModalRoot, Root, FormRoot, FormContainer } from "../styles";
import axios from "axios";
import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Modal from "../components/modal/Modal";


interface FormData {
  first_name: string;
  surname: string;
  contact_number: string;
  email_address: string;
  house_number: string;
  street_name: string;
  city: string;
  postcode: string;
  booking_date: string;
  wheelchair_users: number;
  smoking: boolean;
  destination: string;
  lunch_arrangements: string;
  notes?: string | undefined;
  terms_and_conditions: boolean;
  group_leader_policy: boolean;
  // bookingMonth: string;
}

const isBookingDateAvailable = async (date: string) => {
  try {
    const currentDate = new Date();
    const selectedDate = new Date(date);

    if (selectedDate <= currentDate) {
      return false;
    }

    const response = await axios.get(`http://192.168.0.139:8000/dates?date=${date}`);
    const bookedDates = response.data;
    // console.log('Selected Date:', selectedDate);
    // console.log('Booked Dates:', bookedDates);
    const isDateBooked = bookedDates.some((bookedDate: string) => new Date(bookedDate).getTime() === selectedDate.getTime());
    // console.log('Is Date Booked:', isDateBooked);

    return !isDateBooked;
  } catch (error) {
    console.error('Error checking booking availability:', error);
    return false;
  }
};

const schema = yup.object().shape({
  first_name: yup.string().required('You must enter a first name'),
  surname: yup.string().required('You must enter a surname'),
  contact_number: yup.string().required('You must enter a contact number'),
  email_address: yup.string().required('You must enter an email address'),
  house_number: yup.string().required('You must enter a house number'),
  street_name: yup.string().required('You must enter a street name'),
  city: yup.string().required('You must enter a city'),
  postcode: yup.string().required('You must enter a postcode'),
  booking_date: yup
    .string()
    .required('You must select a date')
    .test({
      name: 'is-future-date',
      message: 'We can travel the canals but, unfortunately, not through time. Please select a date that is in the future!',
      test: function (value) {
        const currentDate = new Date();
        const selectedDate = new Date(value);

        return selectedDate > currentDate;
      },
    })
    .test({
      name: 'is-booking-date-available',
      message: 'There is already a booking on this date, please choose another',
      test: async function (value) {
        // Only perform the validation if the date is in the future
        if (value) {
          return await isBookingDateAvailable(value);
        }
        return false; // Skip validation if date is not provided
      },
    }),
  wheelchair_users: yup
    .number()
    .required()
    .oneOf([0, 1, 2], "Maximum of 2 wheelchair users per booking"),
  smoking: yup.boolean().required("Please select Yes or No for smoking"),
  destination: yup.string().required("Please select a destination"),
  lunch_arrangements: yup.string().required("Please select a lunch option"),
  notes: yup.string().notRequired(),
  terms_and_conditions: yup.boolean().oneOf([true], 'Please accept the terms and conditions'),
  group_leader_policy: yup.boolean().oneOf([true], 'Please accept the group leader policy'),
});

type MyResolverType = Resolver<FormData, typeof yupResolver>;

const CreateBooking: React.FC = () => {
  const [showModal, setShowModal] = React.useState<boolean>(false);

  const navigate = useNavigate();

  const ModalClickHandler = () => {
    setShowModal(false);
    navigate('/');
    //SEND EMAIL
  };


  // Function to send data to the createBooking endpoint
  const submitBooking: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await axios.post("http://192.168.0.139:8000/createBooking", data);

      console.log("Booking created successfully:", response.data);
      // You can perform additional actions after a successful booking creation here
      setShowModal(true);

      await axios.post("http://192.168.0.139:8000/sendEmail", data);

    } catch (error) {
      console.error("Error creating booking:", error);
      // Handle error scenarios here
    }
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema) as MyResolverType, // yup, joi and even your own.
    defaultValues: { wheelchair_users: 0 }, // Set default value for wheelchairUsers
  });

  return (
    <FormRoot>
      {showModal && (
        <Modal
          onClick={ModalClickHandler}
          header="Booking Submitted"
          content="Booking has been submitted successfully. You will receive an email confirmation shortly."
          footer="Thank you for booking with us"
        />
      )}
      <h1>Booking Form</h1>
      <FormContainer>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            paddingTop: "2vh",
            height: "auto",
            width: "30vw",
          }}
          onSubmit={handleSubmit((data: FormData) => {
            submitBooking(data);
            // console.log(data); 
          })}
        >
          <label>First Name</label>
          <input
            style={{ width: "20vw" }}
            {...register("first_name")}
            autoComplete="given-name" />
          {errors.first_name && (
            <p style={{ color: "red" }}>{errors.first_name.message}</p>
          )}

          <label>Surname</label>
          <input
            style={{ width: "20vw" }}
            {...register("surname")}
            autoComplete="family-name" />
          {errors.surname && (
            <p style={{ color: "red" }}>{errors.surname.message}</p>
          )}

          <label>Contact Number</label>
          <input
            style={{ width: "20vw" }}
            type="string" {...register("contact_number")}
            autoComplete="tel" />
          {errors.contact_number && (
            <p style={{ color: "red" }}>{errors.contact_number.message}</p>
          )}

          <label>Email</label>
          <input
            style={{ width: "20vw" }}
            type="string" {...register("email_address")}
            autoComplete="email" />
          {errors.email_address && (
            <p style={{ color: "red" }}>{errors.email_address.message}</p>
          )}

          <label>House Number</label>
          <input
            style={{ width: "20vw" }}
            type="string" {...register("house_number")}
            autoComplete="address-line1" />
          {errors.house_number && (
            <p style={{ color: "red" }}>{errors.house_number.message}</p>
          )}

          <label>Steet Name</label>
          <input
            style={{ width: "20vw" }}
            type="string" {...register("street_name")}
            autoComplete="address-line2" />
          {errors.street_name && (
            <p style={{ color: "red" }}>{errors.street_name.message}</p>
          )}

          <label>City</label>
          <input
            style={{ width: "20vw" }}
            type="string" {...register("city")}
            autoComplete="address-level2" />
          {errors.city && (
            <p style={{ color: "red" }}>{errors.city.message}</p>
          )}

          <label>Postcode</label>
          <input
            style={{ width: "10vw" }}
            type="string" {...register("postcode")}
            autoComplete="postal-code" />
          {errors.postcode && (
            <p style={{ color: "red" }}>{errors.postcode.message}</p>
          )}
          <br />
          <label>Booking Date</label>
          <input
            style={{ width: "10vw" }}
            type="date" {...register("booking_date")} />
          {errors.booking_date && (
            <p style={{ color: "red" }}>{errors.booking_date.message}</p>
          )}
          <br />
          <label>Wheelchair Users</label>
          <input
            style={{
              width: "5vw",
            }} type="number" min={0} max={2} {...register("wheelchair_users")} />
          {errors.wheelchair_users && (
            <p style={{ color: "red" }}>{errors.wheelchair_users.message}</p>
          )}
          <br />
          <div>
            <label>Smoking</label>
            <label>
              <input type="radio"
                value="true"
                {...register("smoking")} />
              Yes
            </label>
            <label>
              <input type="radio"
                value="false"
                {...register("smoking")} />
              No
              {errors.smoking && (
                <p style={{ color: "red" }}>{errors.smoking.message}</p>
              )}
            </label>
          </div>
          <br />
          <div>
            <label>Destination</label>
            <br />
            <label>
              <input
                type="radio"
                value="Autherley"
                {...register("destination")}
              />
              Autherley (£130)
            </label>
            <br />
            <label>
              <input type="radio" value="Coven" {...register("destination")} />
              Coven( £100)
              {errors.destination && (
                <p style={{ color: "red" }}>{errors.destination.message}</p>
              )}
            </label>
          </div>
          <br />
          <label>Lunch Arrangements</label>
          <label>
            <input
              type="radio"
              value="Packed Lunch"
              {...register("lunch_arrangements")}
            />
            Packed Lunch
          </label>
          <label>
            <input
              type="radio"
              value="Fish and Chips"
              {...register("lunch_arrangements")} />
            Fish & Chips
          </label>
          <label>
            <input
              type="radio"
              value="Pub Meal"
              {...register("lunch_arrangements")} />
            Pub Meal
            {errors.lunch_arrangements && (
              <p style={{ color: "red" }}>{errors.lunch_arrangements.message}</p>
            )}
          </label>
          <br />
          <label>Other Requirements</label>
          <input
            style={{ height: "7vh" }}
            type="string" {...register("notes")} />
          <br />
          <label>
            I have read and agree to the terms and conditions
            <input
              type="checkbox"
              {...register("terms_and_conditions")}
            />
            {errors.terms_and_conditions && (
              <p style={{ color: "red" }}>{errors.terms_and_conditions.message}</p>
            )}
          </label>

          <label>
            I have read and agree to the group leader policy
            <input
              type="checkbox"
              {...register("group_leader_policy")}
            />
            {errors.group_leader_policy && (
              <p style={{ color: "red" }}>{errors.group_leader_policy.message}</p>
            )}
          </label>

          <input type="submit" />
          <br />
        </form>
      </FormContainer>
    </FormRoot>
  );
};

export default CreateBooking;