import axiosInstance from "@/api/axios.js";


const fetchEloRanking = (leagueId) => {
  return axiosInstance.request({
    method: "GET",
    url: `api/elo/ranking/`,
    params: {
      "league": leagueId
    }
  });
}

export {
  fetchEloRanking
}