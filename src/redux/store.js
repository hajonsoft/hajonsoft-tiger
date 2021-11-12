import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/SignIn/redux/authSlice';
import caravanReducer from '../features/Dashboard/redux/caravanSlice';
import pastCaravanReducer from '../features/Dashboard/redux/pastCaravanSlice';
import visaSystemReducer from '../features/Dashboard/redux/visaSystemSlice';
import onlineCaravanReducer from '../features/onlineCaravan/redux/onlineCaravanSlice'
import profileReducer from '../features/Profile/redux/profileSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        caravan: caravanReducer,
        past: pastCaravanReducer,
        visaSystem: visaSystemReducer,
        online: onlineCaravanReducer,
        profile: profileReducer,
    },
})
