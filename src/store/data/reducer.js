import { FETCH_ALL_COUNTRIES_DATA } from "./actions";
const initialState = {
  countries: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_COUNTRIES_DATA:
      return { ...state, countries: action.payload };
    default:
      return state;
  }
};
