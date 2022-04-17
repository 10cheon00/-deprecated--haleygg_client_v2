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

const fetchPlayerMatches = (playerName, leagueName = null, mapName = null) => {
  return axiosInstance.request({
    method: "GET",
    url: `api/matches/`,
    params: {
      "players": playerName,
      "league": leagueName,
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

const fetchPlayerStatistics = (playerName, leagueName = null, mapName = null) => {
  return axiosInstance.request({
    method: "GET",
    url: `api/matches-summary/`,
    params: {
      "player": playerName,
      "league": leagueName,
      "map": mapName
    }
  });
}

const fetchPlayerEloHistory = (playerName, leagueName) => {
  return axiosInstance.request({
    method: "GET",
    url: `api/elo/history/`,
    params: {
      "league": leagueName,
      "player": playerName
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