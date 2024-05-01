import axios from "axios";
import { useApiConfig } from "./useApiConfig";
import { HttpEndpoints } from "enums/HttpEndpoints";
import { useMutation } from "@tanstack/react-query";
import { LogInType } from "types/userType";

const useRegister = () => {
  const { url, headers } = useApiConfig();

  const register = async (user: LogInType) => {
    const apiUrl = `${url}${HttpEndpoints.SIGN_UP}`;

    const config = {
      method: "POST",
      url: apiUrl,
      headers,
      data: user,
    };

    const response = await axios(config);
    return response.data;
  };

  return useMutation({
    mutationFn: register,
    onSuccess: (response) => {
      sessionStorage.setItem("isLoggedIn", "true")
      sessionStorage.setItem("cookie", response.sessionToken)
      sessionStorage.setItem("user", response.objectId)
    }
  });
};

export default useRegister;
