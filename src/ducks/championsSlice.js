import { createSlice, createSelector } from '@reduxjs/toolkit';

import { ROOT_LOL_API } from '../constants';

import championsConfig from '../services/championsConfig';

export const championsSlice = createSlice({
  name: 'champions',
  initialState: {
    isLoading: false,
    isError: false,
    items: [],
    isIncreasingOrder: true,
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
    setIncreasingOrder: (state, action) => {
      state.isIncreasingOrder = action.payload;
    },
  },
});

const selectChampions = state => state.items;
const selectIsIncreasingOrder = state => state.isIncreasingOrder;

export const orderedChampions = createSelector(
  [selectChampions, selectIsIncreasingOrder],
  (champions, isIncreasingOrder) => {
    const championsArr = [...champions];

    if (!isIncreasingOrder) {
      championsArr.reverse();
    }

    return championsArr;
  }
);

const {
  setChampionsSuccess,
  setChampionsError,
  setChampionsLoading,
} = championsSlice.actions;

const { setIncreasingOrder } = championsSlice.actions;

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

export const setChampionsOrder = isIncreasingOrder => dispatch => {
  const storedConfig = championsConfig.getAll();
  storedConfig.isIncreasingOrder = isIncreasingOrder;
  championsConfig.set(storedConfig);

  dispatch(setIncreasingOrder(isIncreasingOrder));
};

export const fetchChampionsConfig = () => dispatch => {
  const rawIsIncreasingOrder = championsConfig.get('isIncreasingOrder');
  const isIncreasingOrder =
    rawIsIncreasingOrder || rawIsIncreasingOrder === undefined;

  dispatch(setIncreasingOrder(isIncreasingOrder));
};

export default championsSlice.reducer;
