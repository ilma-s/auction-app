import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const initialNameState = {
    name: 'ilma',
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

export const { setName } = nameSlice.actions;
export const { setNotification, clearNotification } = notificationSlice.actions;

export const store = configureStore({
    reducer: {
        name: nameSlice.reducer,
        notification: notificationSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
