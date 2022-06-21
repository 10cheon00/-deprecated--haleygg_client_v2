import axiosInstance from "@/api/axios.js"


const api = {};

api.fetchPlayerList = () => {
  return axiosInstance.request({
    method: "GET",
    url: `api/players/`
  });
}

api.fetchPlayerDetail = (playerName) => {
  return axiosInstance.request({
    method: "GET",
    url: `api/players/${playerName}/`
  });
}

api.fetchPlayerMatches = (playerNameList = [], leagueName = null, leagueType = null, mapName = null, matchType = null) => {

  return axiosInstance.request({
    method: "GET",
    url: `api/matches/`,
    params: {
      "players": playerNameList,
      "league": leagueName,
      "league__type": leagueType,
      "map": mapName,
      "match_type": matchType
    },
  });
}

api.fetchPlayerNextMatches = (url) => {
  return axiosInstance.request({
    method: "GET",
    url: url
  });
}

api.fetchPlayerStatistics = (playerName, leagueName = null, leagueType = null, mapName = null) => {
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

api.fetchPlayerEloHistory = (playerName, leagueType) => {
  return axiosInstance.request({
    method: "GET",
    url: `api/elo/`,
    params: {
      "players": playerName,
      "league__type": leagueType
    }
  });
}

api.fetchPlayerTier = (playerName) => {
  return axiosInstance.request({
    method: "GET",
    url: `api/tiers/`,
    isNotEssential: true,
    params: {
      "player": playerName
    }
  });
}

api.fetchPlayerStatisticsAgainstOpponent = (playerName, opponentName) => {
  return axiosInstance.request({
    method: "GET",
    url: `api/compare/?player=${playerName}&opponent=${opponentName}`
  });
}

export default api;