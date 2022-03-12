import axiosInstance from "@/api/axios.js";


const fetchLeagueList = () => {
  return axiosInstance.request({
    method: "GET",
    url: `api/leagues/`
  });
}

const fetchEloRatingActiveLeagueList = () => {
  return axiosInstance.request({
    method: "GET",
    url: `api/leagues/`,
    params: {
      'is_elo_rating_active': "True"
    }
  });
}

export {
  fetchEloRatingActiveLeagueList,
  fetchLeagueList,
}