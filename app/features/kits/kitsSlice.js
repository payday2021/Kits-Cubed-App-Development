import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../api/axios';

export const getAllKits = createAsyncThunk('fetchAllKits', async () => {
  try {
    const res = await axios.get('/kits/all');
    return res.data;
  } catch (error) {
    console.log(error.json());
  }
});

export const getAllKitTypes = createAsyncThunk('fetchAllKitTypes', async () => {
  try {
    const res = await axios.get('/kits/types/all');
    return res.data;
  } catch (error) {
    console.log(error.json());
  }
});

const initState = {
  types: [],
  list: [],
  status: '',
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
      .addCase(getAllKits.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.list = action.payload.kits;
      })
      .addCase(getAllKits.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(getAllKits.rejected, (state, action) => {
        state.status = 'rejected';
      })
      .addCase(getAllKitTypes.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.types = action.payload.types;
      })
      .addCase(getAllKitTypes.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(getAllKitTypes.rejected, (state, action) => {
        state.status = 'rejected';
      });
  }
});

export const { setKits } = kitsSlice.actions;

export default kitsSlice.reducer;
