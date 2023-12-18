import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
};

const appSlice = createSlice({
    name: 'appSlice',
    initialState,
    reducers: {
        setName: (state, action) => {
            state.name = action.payload;
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

export const { setName } = appSlice.actions;
export const { setRememberMe } = rememberMeSlice.actions;

export const rootReducer = {
    name: appSlice.reducer,
    rememberMe: rememberMeSlice.reducer,
};

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;