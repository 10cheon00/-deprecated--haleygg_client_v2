import axios from "axios";

import vuexStore from "@/store/store.js";
import router from "@/router/index.js";

const serverUrl = "/server";

const axiosInstance = axios.create({
  baseURL: serverUrl,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
})

axiosInstance.interceptors.request.use(
  config => {
    if (config.url == 'api/auth/token/refresh/') {
      config.data = {
        refresh: vuexStore.getters["tokenStore/getRefreshToken"]
      }
    }
    else if (config.url == 'api/auth/token/verify/') {
      config.data = {
        token: vuexStore.getters["tokenStore/getAccessToken"]
      }
    }
    else if (vuexStore.getters["tokenStore/isTokenExists"]) {
      config.headers = {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": `Bearer ${vuexStore.getters["tokenStore/getAccessToken"]}`
      };
    }

    return config;
  }, error => {
    return Promise.reject(error);
  }
)

axiosInstance.interceptors.response.use(response => {
  if (response.config.url == "api/auth/token/refresh/") {
    // get username from payload.
    vuexStore.commit("tokenStore/setUserNameFromResponse", response);
  }
  return response;
}, async error => {
  if (error.response.status == 404) {
    router.push({
      name: "404RedirectView"
    });
    return Promise.reject(error)
  }
  else if (error.response.status == 401) {
    // exception on login request.
    if (error.config.url == "api/auth/token/") {
      return Promise.reject(error);
    }
    else if (vuexStore.getters["tokenStore/isTokenExists"] == false) {
      // Wrong access
      router.push({
        name: "401UnauthorizedAccessView"
      });
      return Promise.reject(error)
    }
    else {
      if (error.config.isRetried === undefined) {
        // Request to refresh token.
        const response = await axiosInstance.request({
          method: "POST",
          url: `api/auth/token/refresh/`,
          isRetried: true
        });
        // retry with new token.
        vuexStore.commit("tokenStore/setAccessToken", response.data.access);
        return axiosInstance.request(error.config);
      }
      else {
        // failed to refresh token.
        vuexStore.commit("tokenStore/flushToken");
        router.push({
          name: "401UnauthorizedAccessView"
        });
      }
    }
    return Promise.reject(error);
  }
})

export default axiosInstance