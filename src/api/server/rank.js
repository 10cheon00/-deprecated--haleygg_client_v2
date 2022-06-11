import axiosInstance from "@/api/axios.js"


const api = {};

api.requestFetchRank = (matchType = null, category = null, leagueType = null, leagueName = null, mapName = null) => {
  return axiosInstance.request({
    method: "GET",
    url: `api/ranks/`,
    params: {
      match_type: matchType,
      category: category,
      league: leagueName,
      league__type: leagueType,
      map: mapName,
    }
  });
}

api.fetchTotalMatchCountRank = (leagueType = null, leagueName = null, mapName = null) => {
  return api.requestFetchRank("", "total", leagueType, leagueName, mapName);
}

api.fetchTotalWinCountRank = (leagueType = null, leagueName = null, mapName = null) => {
  return api.requestFetchRank("", "win", leagueType, leagueName, mapName);
}

api.fetchTotalLoseCountRank = (leagueType = null, leagueName = null, mapName = null) => {
  return api.requestFetchRank("", "lose", leagueType, leagueName, mapName);
}

api.fetchMeleeMatchCountRank = (leagueType = null, leagueName = null, mapName = null) => {
  return api.requestFetchRank("melee", "total", leagueType, leagueName, mapName);
}

api.fetchMeleeWinCountRank = (leagueType = null, leagueName = null, mapName = null) => {
  return api.requestFetchRank("melee", "win", leagueType, leagueName, mapName);
}

api.fetchMeleeLoseCountRank = (leagueType = null, leagueName = null, mapName = null) => {
  return api.requestFetchRank("melee", "lose", leagueType, leagueName, mapName);
}

api.fetchTopAndBottomMatchCountRank = (leagueType = null, leagueName = null, mapName = null) => {
  return api.requestFetchRank("top_and_bottom", "total", leagueType, leagueName, mapName);
}

api.fetchTopAndBottomWinCountRank = (leagueType = null, leagueName = null, mapName = null) => {
  return api.requestFetchRank("top_and_bottom", "win", leagueType, leagueName, mapName);
}

api.fetchTopAndBottomLoseCountRank = (leagueType = null, leagueName = null, mapName = null) => {
  return api.requestFetchRank("top_and_bottom", "lose", leagueType, leagueName, mapName);
}



export default api;
