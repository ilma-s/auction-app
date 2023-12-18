import { RootState } from './store';

export const selectName = (state: RootState) => state.name.name;

export const selectRememberMe = (state: RootState) => state.rememberMe;
