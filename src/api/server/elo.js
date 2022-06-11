import axiosInstance from "@/api/axios.js";


const api = {};

api.fetchEloRanking = (leagueType) => {
  return axiosInstance.request({
    method: "GET",
    url: `api/elo/ranking/`,
    params: {
      "league__type": leagueType
    }
  });
}

export default api;
