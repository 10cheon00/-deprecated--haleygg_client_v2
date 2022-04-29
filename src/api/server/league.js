import axiosInstance from "@/api/axios.js";


const fetchLeagueList = () => {
  return axiosInstance.request({
    method: "GET",
    url: `api/leagues/`
  });
}


export default {
  fetchLeagueList,
}