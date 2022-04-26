import axiosInstance from "@/api/axios.js";


const fetchEloRanking = (leagueType) => {
  return axiosInstance.request({
    method: "GET",
    url: `api/elo/ranking/`,
    params: {
      "league__type": leagueType
    }
  });
}

export {
  fetchEloRanking
}