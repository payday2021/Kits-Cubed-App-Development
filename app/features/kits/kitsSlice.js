import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../api/axios';

export const getKits = createAsyncThunk('fetchKits', async () => {
  try {
    const res = await axios.get('/kits/all');
    return res.data;
  } catch (error) {
    console.log(error.json());
  }
});

const initState = {
  list: [],
  status: ''
};

const kitsSlice = createSlice({
  name: 'kits',
  initialState: initState,
  reducers: {
    setKits(state, action) {
      state.list = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getKits.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.list = action.payload.kits;
      })
      .addCase(getKits.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(getKits.rejected, (state, action) => {
        state.status = 'rejected';
      });
  }
});

export const { setKits } = kitsSlice.actions;

export default kitsSlice.reducer;
