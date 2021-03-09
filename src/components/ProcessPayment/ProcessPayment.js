import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SimpleCardForm from './SimplecardForm';
// import SplitCardForm from './SplitCardForm';

const stripePromise = loadStripe('pk_test_51HZfXDH4MgEHA1BXO4aBVxQbK3UipPYdu6LJAplOnUWpOmu5pKqDdnREnR1MImaKbDcFEtd3w7EkjNLQYnWmnXJz00puKhEJ0h');

const ProcessPayment = ({handlePayment}) => {
    return (
        <Elements stripe={stripePromise}>
            <SimpleCardForm handlePayment={handlePayment} ></SimpleCardForm>
        </Elements>
    );
};

export default ProcessPayment;