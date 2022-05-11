import axiosInstance from "@/api/axios.js"


const fetchPlayerList = () => {
  return axiosInstance.request({
    method: "GET",
    url: `api/players/`
  });
}

const fetchPlayerDetail = (playerName) => {
  return axiosInstance.request({
    method: "GET",
    url: `api/players/${playerName}/`
  });
}

const fetchPlayerMatches = (playerName, leagueName = null, leagueType = null, mapName = null) => {
  return axiosInstance.request({
    method: "GET",
    url: `api/matches/`,
    params: {
      "players": playerName,
      "league": leagueName,
      "league__type": leagueType,
      "map": mapName
    }
  });
}

const fetchPlayerNextMatches = (url) => {
  return axiosInstance.request({
    method: "GET",
    url: url
  });
}

const fetchPlayerStatistics = (playerName, leagueName = null, leagueType = null, mapName = null) => {
  return axiosInstance.request({
    method: "GET",
    url: `api/matches-summary/`,
    params: {
      "player": playerName,
      "league": leagueName,
      "league__type": leagueType,
      "map": mapName
    }
  });
}

const fetchPlayerEloHistory = (playerName, leagueType) => {
  return axiosInstance.request({
    method: "GET",
    url: `api/elo/`,
    params: {
      "players": playerName,
      "league__type": leagueType
    }
  });
}

const fetchPlayerTier = (playerName) => {
  return axiosInstance.request({
    method: "GET",
    url: `api/tiers/`,
    isNotEssential: true,
    params: {
      "player": playerName
    }
  });
}

export default {
  fetchPlayerDetail,
  fetchPlayerEloHistory,
  fetchPlayerList,
  fetchPlayerMatches,
  fetchPlayerNextMatches,
  fetchPlayerStatistics,
  fetchPlayerTier
}