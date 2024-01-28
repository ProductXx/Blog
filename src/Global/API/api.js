import axios from "axios";
import Cookies from "js-cookie";
const API = import.meta.env.VITE_API;
const token = Cookies.get("token");

const client = axios.create({ baseURL: API });
export const request = ({ ...options }) => {
  client.defaults.headers.common.Authorization = `Bearer ${token}`;
  const onSuccess = (res) => res;
  const onError = (err) => {
    return err;
  };

  return client(options).then(onSuccess).catch(onError);
};
