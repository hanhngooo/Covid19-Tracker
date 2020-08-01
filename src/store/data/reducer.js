import { FETCH_ALL_COUNTRIES_DATA, FETCH_DATA_SUCCESS } from "./actions";
const initialState = {
  countries: [],
  chosenLocation: {},
};
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_COUNTRIES_DATA:
      return { ...state, countries: action.payload };

    case FETCH_DATA_SUCCESS:
      return { ...state, chosenLocation: action.payload };

    default:
      return state;
  }
};
