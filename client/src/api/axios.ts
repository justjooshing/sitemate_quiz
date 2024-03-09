import axios from "axios";

const baseURL = `http://localhost:8080`;

export const client = axios.create({
  baseURL,
});
