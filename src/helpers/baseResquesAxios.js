import axios from "axios";

export const baseRequest = async (method, url, data, headers) => {
  return new Promise( async (resolve, reject) => {
    const requestConfig = {
      method,
      data,
      timeout: 10000,
      url,
      headers: headers || {}
    };

    try {
      const response = await axios(requestConfig);
      // Request Succeeded!
      resolve(response);
    } catch (error) {
      // Request Failed!
      reject(error.response);
    }
  });
}