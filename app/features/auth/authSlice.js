import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initState = {
  email: '',
  name: '',
  status: '',
  error: ''
};

const signIn = createAsyncThunk('user/sign-in', async () => {
  // const res = await ...
});

const authSlice = createSlice({
  name: 'auth',
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = 'fulfilled';
      })
      .addCase(signIn.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = 'rejected';
      });
  }
});

export default authSlice.reducer;
