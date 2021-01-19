import { createSlice } from '@reduxjs/toolkit';

import { ROOT_LOL_API } from '../constants';

export const championsSlice = createSlice({
  name: 'champions',
  initialState: {
    isLoading: false,
    isError: false,
    items: [],
  },
  reducers: {
    setChampionsLoading: state => {
      state.isError = false;
      state.isLoading = true;
    },
    setChampionsSuccess: (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.items = action.payload;
    },
    setChampionsError: state => {
      state.isError = true;
      state.isLoading = false;
    },
  },
});

const {
  setChampionsSuccess,
  setChampionsError,
  setChampionsLoading,
} = championsSlice.actions;

export const retrieveChampions = () => dispatch => {
  dispatch(setChampionsLoading());

  fetch(`${ROOT_LOL_API}/data/en_US/champion.json`)
    .then(response => response.json())
    .then(payload => {
      const retrievedChampions = Object.values(payload.data);
      dispatch(setChampionsSuccess(retrievedChampions));
    })
    .catch(() => dispatch(setChampionsError()));
};

export default championsSlice.reducer;
