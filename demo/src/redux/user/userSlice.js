import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
    },    
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload; 
        }
    }
});

// Export the `currentUser` action
export const { setCurrentUser} = authSlice.actions; // Corrected here
export default authSlice.reducer;
