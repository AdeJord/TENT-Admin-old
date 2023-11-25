import React, { ReactNode } from 'react'
import Input from '../components/Input'
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_EMAIL,
    VALIDATOR_MIN,
    VALIDATOR_MAX
} from '../utils/validators'
import { Root, ColumnContainer, ContainerRow, ButtonContainer, Button } from '../styles'

const inputHandler = (id: string, value: string, isValid: boolean) => {
    console.log('inputHandler')
}

const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('submitHandler')
}

const CreateBooking = () => {
    return (
        <Root>
            <h1>
                Booking Form
            </h1>
            <ColumnContainer>
                <form>
                    {/* <ContainerRow> */}
                    <Input
                        style={{
                            width: '25vw',
                            height: '1.5vh',
                        }}
                        id='firstName'
                        element='input'
                        type='text'
                        label="First Name"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter your first name"
                        onInput={inputHandler}
                        placeholder='Your first name'
                    />
                    <Input
                        style={{
                            width: '25vw',
                            height: '1.5vh',
                        }}
                        id='surname'
                        element='input'
                        type='text'
                        label="Surname"
                        validators={[VALIDATOR_REQUIRE(),]}
                        errorText="Please enter your surname"
                        onInput={inputHandler}
                        placeholder='Your surname'
                    />
                    {/* </ContainerRow>
                    <ContainerRow> */}
                    <Input
                        style={{
                            width: '25vw',
                            height: '1.5vh',
                        }}
                        id='contactNumber'
                        element='input'
                        type='text'
                        label="Contact Number"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter your contact number"
                        onInput={inputHandler}
                        placeholder='Your contact number'
                    />
                    <Input
                        style={{
                            width: '25vw',
                            height: '1.5vh',
                        }}
                        id='emailAddress'
                        element='input'
                        type='email'
                        label="Email Address"
                        validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                        errorText="Please enter a valid email address"
                        onInput={inputHandler}
                        placeholder='Your email address'
                    />
                    {/* </ContainerRow>
                    <ContainerRow> */}
                    <Input
                        style={{
                            width: '20vw',
                            height: '1.5vh',
                        }}
                        id='bookingDate'
                        element='input'
                        type='date'
                        label="Booking Date"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter the date you would like to book for"
                        onInput={inputHandler}
                    />
                    <Input
                        style={{
                            width: '15vw',
                            height: '1.5vh',
                        }}
                        id='wheelchairUsers'
                        element='input'
                        type='number'
                        //NEED MAX MIN
                        // min="0"
                        // max="2"
                        label="How many wheelchair users?"
                        validators={[
                            VALIDATOR_REQUIRE(),
                            VALIDATOR_MIN(0),
                            VALIDATOR_MAX(2)
                        ]}
                        errorText="Please enter number of wheelchair users. Min 0 - Max 2"
                        onInput={inputHandler}
                        placeholder='Wheelchairs?'
                    />
                    <Input
                        style={{
                            width: '18vw',
                            height: '1.5vh',
                        }}
                        id='smoking'
                        element='input'
                        type='text'
                        label="Smoking?"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter whether smoking will be allowed on the trip"
                        onInput={inputHandler}
                        placeholder='Smoking / No Smoking'
                    />
                    {/* </ContainerRow> */}
                    {/* <ContainerRow> */}
                    <Input
                        style={{
                            width: '20vw',
                            height: '1.5vh',
                        }}
                        id='destination'
                        element='input'
                        type='text'
                        label="Destination"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter where you would like to go (Coven or Autherley)"
                        onInput={inputHandler}
                        placeholder='Coven or Autherley'
                    />
                    <Input
                        style={{
                            width: '20vw',
                            height: '1.5vh',
                        }}
                        id='lunchArrangements'
                        element='input'
                        type='text'
                        label="Lunch Arrangements"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter your lunch arrangements"
                        onInput={inputHandler}
                        placeholder='What about lunch?'
                    />

                    {/* </ContainerRow>
                    <ContainerRow */}
                    {/* style={{
                            display: 'flex',
                            alignContent: 'center',
                            paddingTop: '3rem',
                        }}> */}
                    <Input
                        style={{
                            width: '25vw',
                            height: '15vh',
                            resize: 'none',
                        }}
                        id='otherRequirements'
                        element='textarea'
                        type='text'
                        label="Any other requirements or notes"
                        onInput={inputHandler}
                        placeholder='Is there anything else you would like us to know about?'
                    />
                    {/* </ContainerRow> */}

                    <Input
                        style={{
                            width: 'auto',
                            height: 'auto',
                            resize: 'none',
                        }}
                        type='checkbox'
                        id='termsAndConditions'
                        element='input'
                        label="I have read and agree to the terms and conditions"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please agree to the terms and conditions"
                        onInput={inputHandler}
                    ></Input>
                    <Input
                        style={{
                            width: 'auto',
                            height: 'auto',
                            resize: 'none',
                        }}
                        type='checkbox'
                        id='groupLeaderResponsibilities'
                        element='input'
                        label="I have read and agree to the group leader responsibilities"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please agree to the group leader responsibilities"
                        onInput={inputHandler}
                    ></Input>
                </form>
                <Button type='submit'>SUBMIT</Button>
            </ColumnContainer>
        </Root>
    )
}

export default CreateBooking