const routeToPlayerInformation = (router, playerName) => {
  router.push({
    name: "PlayerInformationView",
    params: {
      playerName: playerName,
    },
  });
};

const getPercentage = (winning_count, losing_count) => {
  if (losing_count + winning_count <= 0) {
    return 0.0;
  }

  return (
    Math.round((winning_count / (winning_count + losing_count)) * 1000) /
    10
  );
};

export {
  getPercentage,
  routeToPlayerInformation
}