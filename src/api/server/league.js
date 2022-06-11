import axiosInstance from "@/api/axios.js";


const api = {};

api.fetchLeagueList = () => {
  return axiosInstance.request({
    method: "GET",
    url: `api/leagues/`
  });
}


export default api;
