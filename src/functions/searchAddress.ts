import { HttpMethod } from "enums/HttpMethod";
import { HttpUrl } from "enums/HttpUrl";
import axios from 'axios';

export const searchAddress = async (querySearch: string, limit: number) => {
  const config = {
    method: HttpMethod.GET,
    url: `${HttpUrl.OPEN_STREET_MAP}${querySearch}&limit=${limit}`
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

