import axiosInstance from "@/api/axios";
import EloModule from "@/api/server/elo.js"
import MapModule from "@/api/server/map.js";
import LeagueModule from "@/api/server/league.js";
import PlayerModule from "@/api/server/player";
import RankModule from "@/api/server/rank.js";

const server = {
  ...EloModule,
  ...LeagueModule,
  ...MapModule,
  ...PlayerModule,
  ...RankModule,
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

server.requestHostCheck = () => {
  return axiosInstance.request({
    method: "GET",
    url: `api/`
  });
}

server.createMatch = (match) => {
  return axiosInstance.request({
    method: "POST",
    url: `api/matches/`,
    data: match
  })
}

export default server