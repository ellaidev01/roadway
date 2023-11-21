/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-catch */
import axios from "axios";
const axiosInstance = axios.create();
export default axiosInstance;


export async function userAuthentication(
    method: string,
    url: string,
    data: any,
  ) {
    try {
      const response = await axios({
        method,
        url: `${URL}/${url}`,
        data,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }