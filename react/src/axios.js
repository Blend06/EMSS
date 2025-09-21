import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true // 👈 important so the refresh_token cookie is sent
});

// Attach Authorization header before each request
axiosClient.interceptors.request.use((config) => {
  config.headers = config.headers || {};

  const token = localStorage.getItem("ACCESS_TOKEN");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

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

// Handle 401s and try to refresh
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // if access token expired and we haven't retried yet
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        // call refresh endpoint (cookie will be sent automatically)
        const res = await axiosClient.post("/refresh");
        const newToken = res.data.access_token;

        // save and set new token
        localStorage.setItem("ACCESS_TOKEN", newToken);
        axiosClient.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

        // retry the original request
        return axiosClient(originalRequest);
      } catch (refreshError) {
        // refresh also failed: force logout
        localStorage.removeItem("ACCESS_TOKEN");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
