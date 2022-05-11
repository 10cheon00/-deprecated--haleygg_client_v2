import axiosInstance from "@/api/axios.js"


const requestFetchRank = (matchType = null, category = null, leagueType = null, leagueName = null, mapName = null) => {
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

const fetchTotalMatchCountRank = (leagueType = null, leagueName = null, mapName = null) => {
  return requestFetchRank("", "total", leagueType, leagueName, mapName);
}

const fetchTotalWinCountRank = (leagueType = null, leagueName = null, mapName = null) => {
  return requestFetchRank("", "win", leagueType, leagueName, mapName);
}

const fetchTotalLoseCountRank = (leagueType = null, leagueName = null, mapName = null) => {
  return requestFetchRank("", "lose", leagueType, leagueName, mapName);
}

const fetchMeleeMatchCountRank = (leagueType = null, leagueName = null, mapName = null) => {
  return requestFetchRank("melee", "total", leagueType, leagueName, mapName);
}

const fetchMeleeWinCountRank = (leagueType = null, leagueName = null, mapName = null) => {
  return requestFetchRank("melee", "win", leagueType, leagueName, mapName);
}

const fetchMeleeLoseCountRank = (leagueType = null, leagueName = null, mapName = null) => {
  return requestFetchRank("melee", "lose", leagueType, leagueName, mapName);
}

const fetchTopAndBottomMatchCountRank = (leagueType = null, leagueName = null, mapName = null) => {
  return requestFetchRank("top_and_bottom", "total", leagueType, leagueName, mapName);
}

const fetchTopAndBottomWinCountRank = (leagueType = null, leagueName = null, mapName = null) => {
  return requestFetchRank("top_and_bottom", "win", leagueType, leagueName, mapName);
}

const fetchTopAndBottomLoseCountRank = (leagueType = null, leagueName = null, mapName = null) => {
  return requestFetchRank("top_and_bottom", "lose", leagueType, leagueName, mapName);
}



export default {
  fetchTotalMatchCountRank,
  fetchTotalWinCountRank,
  fetchTotalLoseCountRank,
  fetchMeleeMatchCountRank,
  fetchMeleeWinCountRank,
  fetchMeleeLoseCountRank,
  fetchTopAndBottomMatchCountRank,
  fetchTopAndBottomWinCountRank,
  fetchTopAndBottomLoseCountRank,
}