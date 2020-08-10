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
      const response = await axios.get(`${apiUrl}/countries?allowNull=false`);
      dispatch(fetchCountriesSuccess(response.data));
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
const fetchDataSuccess = (data) => ({
  type: FETCH_DATA_SUCCESS,
  payload: data,
});

export const fetchData = (url) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(url);
      dispatch(fetchDataSuccess(response.data));
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const FETCH_HISTORICAL_DATA_SUCCESS = "FETCH_HISTORICAL_DATA_SUCCESS";
const fetchHistoricalDataSuccess = (data) => ({
  type: FETCH_HISTORICAL_DATA_SUCCESS,
  payload: data,
});

export const fetchHistoricalData = (url) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(url);
      dispatch(fetchHistoricalDataSuccess(response.data));
    } catch (error) {
      console.log("error", error);
    }
  };
};
