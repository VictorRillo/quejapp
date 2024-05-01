// useApiConfig.js
export const useApiConfig = () => {
  const url = "https://parseapi.back4app.com/";
  const baseUrl = `${url}classes/`;

  let headers: {
    "X-Parse-Application-Id": string;
    "X-Parse-REST-API-Key": string;
    "X-Parse-Session-Token"?: string;
  } = {
    "X-Parse-Application-Id": "I0G7w5ur7X4XnWIJ0JWyNYfBN0Cwg4ZSXTvkkGa7",
    "X-Parse-REST-API-Key": "Wymg0u9j8ccuEHs78niAOw4j94W7IkHWvwRDoV0n",
  };

  const sessionToken = sessionStorage.getItem("cookie");

  if (sessionToken) {
    headers = {
      ...headers,
      "X-Parse-Session-Token": sessionToken,
    };
  }

  return { url, baseUrl, headers };
};
