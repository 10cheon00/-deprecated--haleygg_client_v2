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

const getWallpaperUrlByRace = (race) => {
  const wallpaper = {
    P: "https://bnetcmsus-a.akamaihd.net/cms/gallery/7EKSWN98V7M91498587613057.jpg",
    T: "https://bnetcmsus-a.akamaihd.net/cms/gallery/lt/LTHPT2MPAS8P1502725038501.jpg",
    Z: "https://bnetcmsus-a.akamaihd.net/cms/gallery/JHXVBPP04GHH1498587636883.jpg",
  };
  let url = "";
  if (Object.keys(wallpaper).find((key) => key == race)) {
    url = wallpaper[race];
  } else {
    url = "https://i.imgur.com/SK3Kyyf.jpeg";
  }
  return url;
};

export {
  convertHyphenWithDateFormat,
  getPercentage,
  getWallpaperUrlByRace,
  hexToRgb,
  routeToPlayerInformation
}