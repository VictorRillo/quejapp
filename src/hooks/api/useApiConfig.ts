// useApiConfig.js
export const useApiConfig = () => {
    const baseUrl = 'https://parseapi.back4app.com/classes/';
    const headers = {
      'X-Parse-Application-Id': 'I0G7w5ur7X4XnWIJ0JWyNYfBN0Cwg4ZSXTvkkGa7',
      'X-Parse-REST-API-Key': 'Wymg0u9j8ccuEHs78niAOw4j94W7IkHWvwRDoV0n',
    };
  
    return { baseUrl, headers };
  };
  