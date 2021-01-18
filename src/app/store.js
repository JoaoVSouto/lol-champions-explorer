import { configureStore } from '@reduxjs/toolkit';

import championsSlice from '../ducks/championsSlice';
import filteringSlice from '../ducks/filteringSlice';

const store = configureStore({
  reducer: {
    champions: championsSlice,
    filtering: filteringSlice,
  },
});

if (process.env.NODE_ENV === 'development') {
  window.store = store;
}

export default store;
