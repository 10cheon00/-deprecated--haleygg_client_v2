import axios from "axios";

import router from "@/router/index.js";

const serverUrl = "/server";

const axiosInstance = axios.create({
  baseURL: serverUrl,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
})

axiosInstance.interceptors.response.use(config => {
  return config;
}, error => {
  if (error.response.status == 404) {
    router.push({
      name: "404RedirectView"
    });
  }
})

const server = new Object();

server.fetchLeagueList = () => {
  return axiosInstance.request({
    method: "GET",
    url: `api/leagues/`
  });
}

server.fetchPlayerList = () => {
  return axiosInstance.request({
    method: "GET",
    url: `api/players/`
  });
}

server.fetchPlayerDetail = (playerId) => {
  return axiosInstance.request({
    method: "GET",
    url: `api/players/${playerId}/`
  });
}

server.fetchPlayerMatches = (playerId, leagueId) => {
  return axiosInstance.request({
    method: "GET",
    url: `api/matches/`,
    params: {
      "league": (leagueId == null) ? "" : leagueId,
      "players": playerId
    }
  });
}

server.fetchPlayerStatistics = (playerId, leagueId) => {
  return axiosInstance.request({
    method: "GET",
    url: `api/matches-summary/`,
    params: {
      "league": (leagueId == null) ? "" : leagueId,
      "player": playerId
    }
  });
}

server.fetchPlayerEloHistory = (playerId, leagueId) => {
  return axiosInstance.request({
    method: "GET",
    url: `api/elo/history/`,
    params: {
      "league": leagueId,
      "player": playerId
    }
  });
}

server.fetchEloRanking = (leagueId) => {
  return axiosInstance.request({
    method: "GET",
    url: `api/elo/ranking/`,
    params: {
      "league": leagueId
    }
  });
}

server.fetchMapList = () => {
  return axiosInstance.request({
    method: "GET",
    url: `api/maps/`
  });
}

server.fetchMapDetail = (mapId) => {
  return axiosInstance.request({
    method: "GET",
    url: `api/maps/${mapId}`
  });
}

server.fetchMapStatistics = (mapId) => {
  return axiosInstance.request({
    method: "GET",
    url: `api/matches-summary/`,
    params: {
      "map": mapId
    }
  });
}

export default server