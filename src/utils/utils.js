const getPercentage = (winning_count, losing_count) => {
  if (losing_count + winning_count <= 0) {
    return 0.0;
  }

  return (
    Math.round((winning_count / (winning_count + losing_count)) * 1000) /
    10
  );
};


const hexToRgb = (hex) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    var r = parseInt(result[1], 16);
    var g = parseInt(result[2], 16);
    var b = parseInt(result[3], 16);
    return [r, g, b];
  }
  return
}

const convertHyphenWithDateFormat = (dateString) => {
  // ex) 2020-01-01 to 2020년 1월 1일
  const date = new Date(dateString);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
}

const routeToPlayerInformation = (router, playerName) => {
  router.push({
    name: "PlayerInformationView",
    params: {
      playerName: playerName,
    },
  });
};
export {
  convertHyphenWithDateFormat,
  getPercentage,
  hexToRgb,
  routeToPlayerInformation
}