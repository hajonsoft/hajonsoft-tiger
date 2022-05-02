import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/SignIn/redux/authSlice';
import caravanReducer from '../features/Caravans/redux/caravanSlice';
import pastCaravanReducer from '../features/Caravans/redux/pastCaravanSlice';
import visaSystemReducer from '../features/Caravans/redux/visaSystemSlice';
import onlineCaravanReducer from '../features/onlineCaravan/redux/onlineCaravanSlice'
import reportReducer from "../features/Caravans/redux/reportSlice"
import profileReducer from '../features/Profile/redux/profileSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        caravan: caravanReducer,
        past: pastCaravanReducer,
        visaSystem: visaSystemReducer,
        online: onlineCaravanReducer,
        report: reportReducer,
        profile: profileReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
})
