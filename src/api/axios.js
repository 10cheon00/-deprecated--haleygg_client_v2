import axios from "axios";

import VuexStore from "@/store/store.js";
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
        refresh: VuexStore.getters["tokenStore/getRefreshToken"]
      }
    }
    else if (config.url == 'api/auth/token/verify/') {
      config.data = {
        token: VuexStore.getters["tokenStore/getAccessToken"]
      }
    }
    else if (VuexStore.getters["tokenStore/isTokenExists"]) {
      config.headers = {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": `Bearer ${VuexStore.getters["tokenStore/getAccessToken"]}`
      };
    }

    return config;
  }, error => {
    return Promise.reject(error);
  }
)

axiosInstance.interceptors.response.use(config => {
  return config;
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
    else if (VuexStore.getters["tokenStore/isTokenExists"] == false) {
      // Wrong access
      router.push({
        name: "401UnauthorizedAccessView"
      });
      return Promise.reject(error)
    }
    else if (error.config.isRetried === undefined) {
      // Request to refresh token
      error.config.isRetried = true;
      const response = await axiosInstance.request({
        method: "POST",
        url: `api/auth/token/refresh/`
      })

      if (response.error) {
        // refresh token expired.
        VuexStore.commit("tokenStore/flushToken");
        router.push({
          name: "401UnauthorizedAccessView"
        });
        return Promise.reject(response.error)
      }
      else {
        // retry with new access token.
        VuexStore.commit("tokenStore/setAccessToken", response.data.access);
        return await axiosInstance.request(error.config);
      }
    }
    else {
      return Promise.reject(error)
    }
  }
})

export default axiosInstance