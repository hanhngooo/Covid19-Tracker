import {
  FETCH_ALL_COUNTRIES_DATA,
  FETCH_DATA_SUCCESS,
  FETCH_HISTORICAL_DATA_SUCCESS,
} from "./actions";
const initialState = {
  countries: [],
  chosenLocation: {},
  historicalData: {},
};
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_COUNTRIES_DATA:
      return { ...state, countries: action.payload };

    case FETCH_DATA_SUCCESS:
      return { ...state, chosenLocation: action.payload };

    case FETCH_HISTORICAL_DATA_SUCCESS:
      return { ...state, historicalData: action.payload };

    default:
      return state;
  }
};
