import { appClient } from "../utils/app-client";

type LoginParams = {
  email: string;
  password: string;
};

const LOGIN_URL = "/login";

export const fetchLogin = async (params: LoginParams) => {
  const response = await appClient.post(LOGIN_URL, params);
  return response.data;
};
