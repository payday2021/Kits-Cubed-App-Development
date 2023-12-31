import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import { Axios, AxiosError } from 'axios';

const initState = {
  id: null,
  name: '',
  email: '',
  token: '',
  status: '',
  error: ''
};

export const signIn = createAsyncThunk(
  'userSignIn',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post('/users/auth/login', {
        email: email,
        password: password
      });

      return res.data;
    } catch (error) {
      if (!error.response) throw error;
      return rejectWithValue(error.response?.data);
    }
  }
);

export const signUp = createAsyncThunk(
  'userSignUp',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post('/users/auth/register', {
        name: name,
        email: email,
        password: password
      });

      return res.data;
    } catch (error) {
      if (!error.response) throw error;
      return rejectWithValue(error.response?.data);
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
        state.error = '';
        state.id = action.payload.user.id;
        state.name = action.payload.user.name;
        state.email = action.payload.user.email;
        state.token = action.payload.token;
      })
      .addCase(signIn.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = 'rejected';
        if (action.payload) {
          state.error = action.payload;
        } else state.error = 'Server Error';
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.error = '';
        state.id = action.payload.user.id;
        state.name = action.payload.user.name;
        state.email = action.payload.user.email;
        state.token = action.payload.token;
      })
      .addCase(signUp.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = 'rejected';
        if (action.payload) {
          state.error = action.payload;
        } else state.error = 'Server Error';
      });
  }
});

export default authSlice.reducer;
