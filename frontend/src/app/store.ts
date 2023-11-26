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

export const { setName } = appSlice.actions;

export const store = configureStore({
    reducer: {
        name: appSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
