import axios from "axios";

const API_URL = "https://bincomassessment-production.up.railway.app/api";
export const getPollingUnits = async () => {
  const response = await axios.get(
    `${API_URL}/polling-units`
  );

  return response.data;
};

export const getPollingUnitResults = async (id) => {
  const response = await axios.get(
    `${API_URL}/polling-units/${id}/results`
  );

  return response.data;
};

export const getLgas = async () => {
  const response = await axios.get(
    `${API_URL}/lgas`
  );

  return response.data;
};

export const getLgaResults = async (id) => {
  const response = await axios.get(
    `${API_URL}/lgas/${id}/results`
  );

  return response.data;
};

export const addPollingUnitResult = async (
  resultData
) => {
  const response = await axios.post(
    `${API_URL}/polling-units/results`,
    resultData
  );

  return response.data;
};

export const createPollingUnit = async (
  data
) => {
  const response = await axios.post(
    `${API_URL}/polling-units/create-full`,
    data
  );

  return response.data;
};

export const getWardsByLga = async (
  lgaId
) => {
  const response = await axios.get(
    `${API_URL}/polling-units/lga/${lgaId}/wards`
  );

  return response.data;
};