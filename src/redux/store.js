import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/SignIn/redux/authSlice';
import caravanReducer from '../features/Dashboard/redux/caravanSlice';
import visaSystemReducer from '../features/Dashboard/redux/visaSystemSlice';
import adReducer from '../features/onlinePackage/redux/adSlice'
import profileReducer from '../features/Profile/redux/profileSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        caravan: caravanReducer,
        visaSystem: visaSystemReducer,
        ad: adReducer,
        profile: profileReducer,
    },
})
