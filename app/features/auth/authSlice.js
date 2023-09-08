import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../api/axios';

const initState = {
  name: '',
  email: '',
  status: '',
  token: -1,
  error: ''
};

export const signIn = createAsyncThunk(
  'userSignIn',
  async ({ email, password }) => {
    try {
      const res = await axios.post('/users/auth/login', {
        email: email,
        password: password
      });

      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const signUp = createAsyncThunk(
  'userSignUp',
  async ({ name, email, password }) => {
    try {
      const res = await axios.post('/users/auth/register', {
        name: name,
        email: email,
        password: password
      });

      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.name = action.payload.user.name;
        state.email = action.payload.user.email;
        state.token = action.payload.token;
      })
      .addCase(signIn.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = 'rejected';
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.name = action.payload.user.name;
        state.email = action.payload.user.email;
        state.token = action.payload.token;
      })
      .addCase(signUp.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = 'rejected';
      });
  }
});

export default authSlice.reducer;
