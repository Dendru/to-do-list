import axios from "axios";

const api = axios.create({
  baseURL: "https://todo-vue-893c6-default-rtdb.firebaseio.com/",
  timeout: 3000,
});

export default api;
