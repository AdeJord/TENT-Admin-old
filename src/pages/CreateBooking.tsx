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

const CreateBooking = () => {
    return (
        <Root>
            <h1>
                Create a booking
            </h1>
            <ColumnContainer>
                <form>
                    <ContainerRow>
                        <Input
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
                            id='surname'
                            element='input'
                            type='text'
                            label="Surname"
                            validators={[VALIDATOR_REQUIRE(),]}
                            errorText="Please enter your surname"
                            onInput={inputHandler}
                            placeholder='Your surname'
                        />
                    </ContainerRow>
                    <ContainerRow>
                        <Input
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
                            id='emailAddress'
                            element='input'
                            type='email'
                            label="Email Address"
                            validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                            errorText="Please enter a valid email address"
                            onInput={inputHandler}
                            placeholder='Your email address'
                        />
                    </ContainerRow>
                    <ContainerRow>
                        <Input
                            style={{ width: '120px' }}
                            id='bookingDate'
                            element='input'
                            type='date'
                            label="Booking Date"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please enter the date you would like to book for"
                            onInput={inputHandler}
                        />
                        <Input
                            style={{ width: '120px' }}
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
                            errorText="Please enter if there are any wheelchair users. Min 0 - Max 2"
                            onInput={inputHandler}
                            placeholder='Wheelchairs?'
                        />
                        <Input
                            style={{ width: '100px' }}
                            id='smoking'
                            element='input'
                            type='text'
                            label="Smoking?"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please enter whether smoking will be allowed on the trip"
                            onInput={inputHandler}
                            placeholder='Smoking / No Smoking'
                        />
                    </ContainerRow>
                    <ContainerRow>
                        <Input
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
                            id='lunchArrangements'
                            element='input'
                            type='text'
                            label="Lunch Arrangements"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please enter your lunch arrangements"
                            onInput={inputHandler}
                            placeholder='What about lunch?'
                        />

                    </ContainerRow>
                    <ContainerRow
                        style={{
                            display: 'flex',
                            alignContent: 'center',
                            paddingTop: '3rem',
                        }}>
                        <Input
                            style={{
                                width: '46.5vw',
                                height: '10vh',
                                resize: 'none',
                            }}
                            id='otherRequirements'
                            element='textarea'
                            type='text'
                            label="Any other requirements or notes"
                            onInput={inputHandler}
                            placeholder='Is there anything else you would like us to know about?'
                        />
                    </ContainerRow>
                    <p style={{ fontSize: '2vw'}}>
                        I have read and agree to the terms and conditions and group leader responsibilities etc...
                    </p>
                </form>
            </ColumnContainer>
            <Button type='submit'>SUBMIT</Button>
        </Root>
    )
}

export default CreateBooking