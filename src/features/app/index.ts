import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import { InitialStateProps} from "./types"


const initialState: InitialStateProps = {
    appName: "test"
}

const appSlice = createSlice({
        name: "app",
        initialState,
        reducers: {

        }
    })
;

// export const {
// } = appSlice.actions;

export default appSlice.reducer;