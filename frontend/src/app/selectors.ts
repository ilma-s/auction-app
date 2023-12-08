import { RootState } from './store';

export const selectName = (state: RootState) => state.name.name;
export const selectNotification = (state: RootState) =>
    state.notification.notification;
