import axiosInstance from "@/api/axios.js"

const fetchMapList = () => {
  return axiosInstance.request({
    method: "GET",
    url: `api/maps/`
  });
}

const fetchMeleeMapList = () => {
  return axiosInstance.request({
    method: "GET",
    url: `api/maps/`,
    params: {
      type: "melee"
    }
  });
}

const fetchMapDetail = (mapName) => {
  return axiosInstance.request({
    method: "GET",
    url: `api/maps/${mapName}`
  });
}

const fetchMapStatistics = (mapName) => {
  return axiosInstance.request({
    method: "GET",
    url: `api/matches-summary/`,
    params: {
      "map": mapName
    }
  });
}

export {
  fetchMapDetail,
  fetchMapList,
  fetchMeleeMapList,
  fetchMapStatistics,
}