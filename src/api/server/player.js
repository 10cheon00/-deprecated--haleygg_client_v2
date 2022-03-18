import axiosInstance from "@/api/axios.js"


const fetchPlayerList = () => {
  return axiosInstance.request({
    method: "GET",
    url: `api/players/`
  });
}

const fetchPlayerDetail = (playerId) => {
  return axiosInstance.request({
    method: "GET",
    url: `api/players/${playerId}/`
  });
}

const fetchPlayerMatches = (playerId, leagueId, mapId) => {
  return axiosInstance.request({
    method: "GET",
    url: `api/matches/`,
    params: {
      "league": (leagueId == null) ? "" : leagueId,
      "map": (mapId == null) ? "" : mapId,
      "players": playerId
    }
  });
}

const fetchPlayerNextMatches = (url) => {
  return axiosInstance.request({
    method: "GET",
    url: url
  });
}

const fetchPlayerStatistics = (playerId, leagueId, mapId) => {
  return axiosInstance.request({
    method: "GET",
    url: `api/matches-summary/`,
    params: {
      "league": (leagueId == null) ? "" : leagueId,
      "map": (mapId == null) ? "" : mapId,
      "player": playerId
    }
  });
}

const fetchPlayerEloHistory = (playerId, leagueId) => {
  return axiosInstance.request({
    method: "GET",
    url: `api/elo/history/`,
    params: {
      "league": leagueId,
      "player": playerId
    }
  });
}

export {
  fetchPlayerDetail,
  fetchPlayerEloHistory,
  fetchPlayerList,
  fetchPlayerMatches,
  fetchPlayerNextMatches,
  fetchPlayerStatistics
}