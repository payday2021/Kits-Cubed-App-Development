import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../api/axios';

export const getAllEvents = createAsyncThunk('fetchAllEvents', async () => {
  try {
    const res = await axios.get('/events/all');
    return res.data;
  } catch (error) {
    console.log(error.json());
  }
});

export const getUserEvents = createAsyncThunk(
  'fetchAllUserEvents',
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/events/user/${id}`);
      return res.data;
    } catch (error) {
      if (!error.response) throw error;
      return rejectWithValue(error.response?.data);
    }
  }
);

export const addUserToEvent = createAsyncThunk(
  'addUserToEvent',
  async ({ id, eventId }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`/events/event/${eventId}/user/${id}`);
      return res.data;
    } catch (error) {
      if (!error.response) throw error;
      return rejectWithValue(error.response?.data);
    }
  }
);

const initState = {
  list: [],
  status: ''
};

const eventsSlice = createSlice({
  name: 'events',
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllEvents.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.list = action.payload.events;
      })
      .addCase(getAllEvents.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(getAllEvents.rejected, (state, action) => {
        state.status = 'rejected';
      })
      .addCase(getUserEvents.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.list = action.payload.events;
      })
      .addCase(getUserEvents.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(getUserEvents.rejected, (state, action) => {
        state.status = 'rejected';
      })
      .addCase(addUserToEvent.fulfilled, (state, action) => {
        state.status = 'fulfilled';
      })
      .addCase(addUserToEvent.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(addUserToEvent.rejected, (state, action) => {
        state.status = 'rejected';
      });
  }
});

// export const { } = eventsSlice.actions;

export default eventsSlice.reducer;
