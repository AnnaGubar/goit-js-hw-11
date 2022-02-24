import axios from "axios";
import { settings } from "./settings";

const { BASE_URL, apiKey, parameters } = settings;

export const getPictures = async (inputValue, page) => {
  try {
    const response = await axios.get(
      `${BASE_URL}?key=${apiKey}&q=${inputValue}&${parameters}&page=${page}`,
    );
    return await response.data;
  } catch (error) {
    console.log(error);
  }
};