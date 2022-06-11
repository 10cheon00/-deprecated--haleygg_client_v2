import axiosInstance from "@/api/axios.js"

const api = {};

api.fetchMapList = () => {
  return axiosInstance.request({
    method: "GET",
    url: `api/maps/`
  });
}

api.fetchMeleeMapList = () => {
  return axiosInstance.request({
    method: "GET",
    url: `api/maps/`,
    params: {
      type: "melee"
    }
  });
}

api.fetchMapDetail = (mapName) => {
  return axiosInstance.request({
    method: "GET",
    url: `api/maps/${mapName}`
  });
}

api.fetchMapStatistics = (mapName) => {
  return axiosInstance.request({
    method: "GET",
    url: `api/matches-summary/`,
    params: {
      "map": mapName
    }
  });
}

export default api;
