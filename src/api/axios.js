import axios from "axios";

import vuexStore from "@/store/store.js";
import router from "@/router/index.js";

// const developServerUrl = "http://127.0.0.1:8000";
const deployServerUrl = "https://api.haleygg.kr/";

const axiosInstance = axios.create({
  baseURL: deployServerUrl,
  timeout: 1000,
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
  if (error.response.status >= 500) {
    router.replace({
      name: "500View"
    })
  }
  if (error.response.status == 400) {
    if (error.config.url == 'api/auth/token/verify/') {
      router.replace({
        name: "401View"
      });
      return Promise.reject(error);
    }
  }
  if (error.response.status == 404) {
    router.replace({
      name: "404View"
    });
    return Promise.reject(error)
  }
  if (error.response.status == 401) {
    // exception on login request.
    if (error.config.url == "api/auth/token/") {
      return Promise.reject(error);
    }
    else if (vuexStore.getters["tokenStore/isTokenExists"] == false) {
      // Wrong access
      router.replace({
        name: "401View"
      });
      return Promise.reject(error);
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
        router.replace({
          name: "HomeView"
        });
      }
      return Promise.reject(error);
    }
  }
  return Promise.reject(error);
})

export default axiosInstance