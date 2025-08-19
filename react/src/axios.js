import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8000/api",
  // don't set a global Content-Type here; it breaks FormData uploads
});

axiosClient.interceptors.request.use((config) => {
  config.headers = config.headers || {};

  const token = localStorage.getItem("ACCESS_TOKEN");
  if (token) config.headers.Authorization = `Bearer ${token}`;

  // Always accept JSON
  config.headers.Accept = "application/json";

  // Let the browser set the multipart boundary for FormData
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  } else {
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});

axiosClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      localStorage.removeItem("ACCESS_TOKEN");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default axiosClient;
