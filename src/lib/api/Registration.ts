import { appClient } from "../utils/app-client";

type RegisterParams = {
  avatar?: string;
  email: string;
  password: string;
  password_confirmation: string;
  username: string;
};

const REGISTRAION_URL = "/register";

export const fetchRegister = async (params: RegisterParams) => {
  const response = await appClient.post(REGISTRAION_URL, params);
  return response.data;
};
