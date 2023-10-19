import { RootState } from "./store";

export const selectName =
    (state: RootState) => state.name.name
