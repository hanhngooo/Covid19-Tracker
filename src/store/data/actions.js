import axios from "axios";
import { apiUrl } from "../../config/constants";

export const FETCH_ALL_COUNTRIES_DATA = "FETCH_ALL_COUNTRIES_DATA";
const fetchCountriesSuccess = (countries) => ({
  type: FETCH_ALL_COUNTRIES_DATA,
  payload: countries,
});

export const fetchAllCountries = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(
        `${apiUrl}/v3/covid-19/countries?allowNull=false`
      );
      dispatch(fetchCountriesSuccess(response.data));
    } catch (error) {
      console.log("error", error);
    }
  };
};
