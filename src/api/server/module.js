import axiosInstance from "@/api/axios";
import { fetchMapDetail, fetchMapList, fetchMapStatistics } from "@/api/server/map.js";
import { fetchLeagueList } from "@/api/server/league.js";
import {
  fetchPlayerDetail,
  fetchPlayerEloHistory,
  fetchPlayerList,
  fetchPlayerMatches,
  fetchPlayerNextMatches,
  fetchPlayerStatistics
} from "@/api/server/player.js";
import { fetchEloRanking } from "@/api/server/elo.js"

const server = {
  fetchMapDetail,
  fetchMapList,
  fetchMapStatistics,

  fetchLeagueList,

  fetchPlayerDetail,
  fetchPlayerEloHistory,
  fetchPlayerList,
  fetchPlayerMatches,
  fetchPlayerNextMatches,
  fetchPlayerStatistics,

  fetchEloRanking,
};


server.requestLogin = (id, password) => {
  return axiosInstance.request({
    method: "POST",
    url: `api/auth/token/`,
    data: {
      username: id,
      password: password
    }
  })
}

server.requestVerifyToken = () => {
  return axiosInstance.request({
    method: "POST",
    url: `api/auth/token/verify/`
  })
}

server.createMatch = (match) => {
  return axiosInstance.request({
    method: "POST",
    url: `api/matches/`,
    data: match
  })
}

export default server