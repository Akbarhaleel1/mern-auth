import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  searchQuery: '',
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setUsers, setSearchQuery } = usersSlice.actions;

export const selectUsers = state => state.users.users;
export const selectSearchQuery = state => state.users.searchQuery;

export default usersSlice.reducer;