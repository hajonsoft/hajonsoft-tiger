import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/SignIn/redux/authSlice';
import caravanReducer from '../features/Dashboard/redux/caravanSlice';
import visaSystemReducer from '../features/Dashboard/redux/visaSystemSlice';
import passengerReducer from '../features/customer/redux/passengerSlice'
import adReducer from '../features/onlinePackage/redux/adSlice'
import profileReducer from '../features/profile/redux/profileSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        caravan: caravanReducer,
        visaSystem: visaSystemReducer,
        passenger: passengerReducer,
        ad: adReducer,
        profile: profileReducer,
    },
})
