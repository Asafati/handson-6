import axios from "axios";

const AxiosInstate = axios.create({
  baseURL: "http://dummyjson.com",
});

export default AxiosInstate;
