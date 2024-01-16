import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchGreeting = createAsyncThunk('greetings/fetchGreetings', async () => {
  try {
    const response = await fetch('http://127.0.0.1:3000/random_greeting');
    const greetings = await response.json();
    return greetings;
  } catch (error) {
    return error.message;
  }
});

export const greetingSlice = createSlice({
  name: 'greeting',
  initialState: {
    loading: false,
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGreeting.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGreeting.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.loading = false;
      })
      .addCase(fetchGreeting.rejected, (state, action) => {
        state.error = action.payload.message;
        state.loading = false;
      });
  },
});

export default greetingSlice.reducer;
