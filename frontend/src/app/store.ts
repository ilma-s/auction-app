import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const initialNameState = {
    name: '',
};

const nameSlice = createSlice({
    name: 'nameSlice',
    initialState: initialNameState,
    reducers: {
        setName: (state, action) => {
            state.name = action.payload;
        },
    },
});

const initialNotificationState = {
    notification: '',
};

const notificationSlice = createSlice({
    name: 'notificationSlice',
    initialState: initialNotificationState,
    reducers: {
        setNotification: (state, action) => {
            state.notification = action.payload;
        },
        clearNotification: (state) => {
            state.notification = '';
        },
    },
});

const rememberMeSlice = createSlice({
    name: 'rememberMe',
    initialState: false,
    reducers: {
        setRememberMe: (state, action) => {
            return action.payload;
        },
    },
});

export const { setName } = nameSlice.actions;
export const { setNotification, clearNotification } = notificationSlice.actions;
export const { setRememberMe } = rememberMeSlice.actions;

export const store = configureStore({
    reducer: {
        name: nameSlice.reducer,
        notification: notificationSlice.reducer,
        rememberMe: rememberMeSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;